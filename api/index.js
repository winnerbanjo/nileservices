/**
 * Nile Services Agency - Fullstack Express Server (Vercel Serverless Function)
 * MongoDB Atlas & Cloudinary File Upload Integration
 */

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { MongoClient, ObjectId } = require('mongodb');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const stream = require('stream');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve Static Frontend Files (pointing to parent directory for Vercel functions compatibility)
app.use(express.static(path.join(__dirname, '..')));

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer for In-Memory File Buffering
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB file size limit
});

// MongoDB Atlas Connection Setup
const uri = process.env.MONGODB_URI;
let dbClient = null;
let briefsCollection = null;

async function connectDatabase() {
  if (briefsCollection) {
    return briefsCollection;
  }
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }
  if (!dbClient) {
    dbClient = new MongoClient(uri);
    await dbClient.connect();
    console.log("🟢 Connected to MongoDB Atlas Database");
  }
  const db = dbClient.db();
  briefsCollection = db.collection('briefs');
  return briefsCollection;
}

// --- 1. File Upload to Cloudinary Endpoint ---
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return res.status(500).json({ error: 'Cloudinary credentials are not configured in Vercel environment variables' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Helper function to upload in-memory buffer to Cloudinary via stream
    const uploadFromBuffer = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        let uploadStream = cloudinary.uploader.upload_stream(
          { 
            folder: 'nile_briefs_references',
            resource_type: 'auto' // Autodetect file type (image, pdf, zip, etc.)
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        let bufferStream = new stream.PassThrough();
        bufferStream.end(fileBuffer);
        bufferStream.pipe(uploadStream);
      });
    };

    const cloudinaryResult = await uploadFromBuffer(req.file.buffer);
    
    return res.status(200).json({ 
      url: cloudinaryResult.secure_url,
      fileName: req.file.originalname,
      size: req.file.size
    });
  } catch (err) {
    console.error("🔴 Cloudinary Stream Upload Error:", err);
    return res.status(500).json({ error: 'Failed to upload file to Cloudinary: ' + (err.message || err) });
  }
});

// --- 2. Save Client Brief Endpoint ---
app.post('/api/briefs', async (req, res) => {
  try {
    const collection = await connectDatabase();

    const newBrief = {
      ...req.body,
      createdAt: new Date()
    };

    const dbResult = await collection.insertOne(newBrief);
    
    return res.status(201).json({ 
      success: true, 
      id: dbResult.insertedId,
      brief: newBrief
    });
  } catch (err) {
    console.error("🔴 MongoDB Brief Insert Error:", err);
    return res.status(500).json({ error: err.message || 'Failed to save project brief to database' });
  }
});

// --- 3. Fetch All Briefs Endpoint ---
app.get('/api/briefs', async (req, res) => {
  try {
    const collection = await connectDatabase();

    // Query briefs sorted newest first
    const list = await collection.find({}).sort({ _id: -1 }).toArray();
    return res.status(200).json(list);
  } catch (err) {
    console.error("🔴 MongoDB Fetch Error:", err);
    return res.status(500).json({ error: err.message || 'Failed to fetch briefs list' });
  }
});

// --- 4. Delete Brief Endpoint ---
app.delete('/api/briefs/:id', async (req, res) => {
  try {
    const collection = await connectDatabase();

    const briefId = req.params.id;
    let mongoQuery;
    
    // Check if ID is a valid hex MongoDB ObjectId
    if (ObjectId.isValid(briefId)) {
      mongoQuery = { _id: new ObjectId(briefId) };
    } else {
      // Fallback query for local-based legacy IDs
      mongoQuery = { id: briefId };
    }

    const dbResult = await collection.deleteOne(mongoQuery);
    
    if (dbResult.deletedCount === 0) {
      return res.status(404).json({ error: 'Brief record not found' });
    }

    return res.status(200).json({ success: true, message: 'Brief deleted successfully' });
  } catch (err) {
    console.error("🔴 MongoDB Delete Error:", err);
    return res.status(500).json({ error: err.message || 'Failed to delete brief record' });
  }
});

// Serve frontend assets for any undefined routes (supports clean routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Export app for serverless deployment (Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Nile Services Node Server active on http://localhost:${PORT}`);
  });
}
module.exports = app;
