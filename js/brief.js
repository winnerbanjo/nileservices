/**
 * Nile Services - Upgraded Project Onboarding Brief Engine
 * Features: MongoDB Atlas Sync & Cloudinary Asynchronous File Uploads
 */

const WHATSAPP_NUMBER = "2348123456789";

// Expanded, highly detailed onboarding tracks query schemas
const tracks = {
  logo: [
    {
      id: "clientName",
      badge: "About You",
      question: "What is your name? 👋",
      subheading: "Let's start with who we are building for.",
      type: "text",
      placeholder: "e.g. Winner Oyekunle",
      required: true
    },
    {
      id: "businessName",
      badge: "Brand Identity",
      question: "What is your business name? 💼",
      subheading: "Leave blank if it's a personal branding project.",
      type: "text",
      placeholder: "e.g. Nile Africa Technologies Ltd"
    },
    {
      id: "tagline",
      badge: "Brand Identity",
      question: "Do you have a slogan or tagline? 🏷️",
      subheading: "Any key message you want incorporated in the logo.",
      type: "text",
      placeholder: "e.g. Look Better, Sell Smarter"
    },
    {
      id: "vibe",
      badge: "Creative Vibe",
      question: "What style / vibe describes your brand? 🎨",
      subheading: "Select all categories that apply to your brand personality.",
      type: "checkbox-grid",
      options: ["Minimalist & Clean", "Bold & Energetic", "Luxury & Elegant", "Tech & Futuristic", "Playful & Friendly", "Organic & Eco"],
      required: true
    },
    {
      id: "logoType",
      badge: "Logo Shape",
      question: "What logo type do you prefer? 📐",
      subheading: "Choose the style that aligns with your vision.",
      type: "select",
      options: ["Wordmark (Text only, e.g. Google)", "Icon/Symbol Only (e.g. Apple)", "Combination Mark (Text + Icon, e.g. Adidas)", "Lettermark/Monogram (Initials, e.g. HBO)"],
      required: true
    },
    {
      id: "colors",
      badge: "Color Direction",
      question: "What are your preferred colors? 🎨",
      subheading: "Leave blank if you'd like our design team to choose.",
      type: "text",
      placeholder: "e.g. Emerald Green, Matte Obsidian, Rich Gold"
    },
    {
      id: "references",
      badge: "Inspiration Links",
      question: "Share links to designs or logos you like 🔗",
      subheading: "Add direct URLs to Pinterest boards, Dribbble shots, or live sites.",
      type: "textarea",
      placeholder: "e.g. pinterest.com/pin/... or competitor-site.com"
    },
    {
      id: "referenceFile",
      badge: "Visual References",
      question: "Upload design references or sketches 📁",
      subheading: "Upload any PNG, JPG, PDF, or document assets (Max 15MB).",
      type: "file"
    },
    {
      id: "contact",
      badge: "Contact Info",
      question: "How can we reach you? 📱",
      subheading: "Double-check your email and phone number for delivery updates.",
      type: "contact-group",
      required: true
    }
  ],
  social: [
    {
      id: "clientName",
      badge: "About You",
      question: "What is your name? 👋",
      subheading: "Who will we be working with?",
      type: "text",
      placeholder: "e.g. Winner Oyekunle",
      required: true
    },
    {
      id: "socialHandle",
      badge: "Social Profile",
      question: "What is your social handle or account link? 📱",
      subheading: "Provide links to your current Instagram, Twitter, or TikTok accounts.",
      type: "text",
      placeholder: "e.g. instagram.com/nileafrica",
      required: true
    },
    {
      id: "socialPlatforms",
      badge: "Target Platforms",
      question: "Which platforms should we build content for? 📱",
      subheading: "Choose the channels where you want to focus.",
      type: "checkbox-grid",
      options: ["Instagram", "TikTok", "X / Twitter", "LinkedIn", "Facebook", "YouTube Shorts"],
      required: true
    },
    {
      id: "socialGoals",
      badge: "Campaign Goals",
      question: "What is the primary goal of your content? 📈",
      subheading: "Select the main outcome you want from your social pages.",
      type: "select",
      options: ["Brand Awareness & Reach", "Direct Sales & Conversions", "Lead Generation & Queries", "Consistent Posting Consistency"],
      required: true
    },
    {
      id: "postingFrequency",
      badge: "Posting Cadence",
      question: "What posting frequency do you prefer? 📅",
      subheading: "How often do you want new graphics/videos published?",
      type: "select",
      options: ["Daily Posting (30 posts/month)", "3 Times a Week (12 posts/month)", "Weekly Posting (4 posts/month)"],
      required: true
    },
    {
      id: "competitors",
      badge: "Inspiration",
      question: "List 2-3 competitor profiles you admire 🔍",
      subheading: "Add handles or links so we can analyze their content styles.",
      type: "textarea",
      placeholder: "e.g. @stripe, @google, @apple"
    },
    {
      id: "referenceFile",
      badge: "Brand Assets",
      question: "Upload existing branding files or style kits 📁",
      subheading: "Upload logos, color kits, or typography references (Max 15MB).",
      type: "file"
    },
    {
      id: "contact",
      badge: "Contact Info",
      question: "How can we reach you? 📱",
      subheading: "Double-check your details for project updates.",
      type: "contact-group",
      required: true
    }
  ],
  ads: [
    {
      id: "clientName",
      badge: "About You",
      question: "What is your name? 👋",
      subheading: "Who will manage this campaign with us?",
      type: "text",
      placeholder: "e.g. Winner Oyekunle",
      required: true
    },
    {
      id: "adsGoal",
      badge: "Campaign Focus",
      question: "What product / service are we promoting? 🚀",
      subheading: "A brief sentence describing what you want to sell.",
      type: "text",
      placeholder: "e.g. Promoting our new mobile banking app",
      required: true
    },
    {
      id: "adsObjective",
      badge: "Ad Objective",
      question: "What is the primary campaign objective? 🎯",
      subheading: "How should the platform optimize your budget?",
      type: "select",
      options: ["Lead Generation (Forms/Queries)", "Website Sales & Conversions", "Web Traffic & Visits", "App Installs"],
      required: true
    },
    {
      id: "adsBudget",
      badge: "Spend Budget",
      question: "What is your estimated daily budget? 💰",
      subheading: "This is paid directly to Facebook/Google, excluding setup fees.",
      type: "select",
      options: ["₦2,000 - ₦5,000 / day", "₦5,000 - ₦10,000 / day", "₦10,000 - ₦25,000 / day", "Above ₦25,000 / day"],
      required: true
    },
    {
      id: "adsLocation",
      badge: "Target Location",
      question: "Where is your target audience? 📍",
      subheading: "e.g. Lagos & Abuja, Nigeria or Global",
      type: "text",
      placeholder: "e.g. Lagos, Nigeria",
      required: true
    },
    {
      id: "adsContentLinks",
      badge: "Campaign Assets",
      question: "Paste links to copy or references 🔗",
      subheading: "Links to Google Drive folders, website links, or style boards.",
      type: "text",
      placeholder: "e.g. google.com/drive/...",
      required: true
    },
    {
      id: "referenceFile",
      badge: "Ad Creatives",
      question: "Upload ad images or video materials 📁",
      subheading: "Upload the specific creative files you want us to run ads on (Max 15MB).",
      type: "file",
      required: true
    },
    {
      id: "contact",
      badge: "Contact Info",
      question: "How can we reach you? 📱",
      subheading: "We will send reports and ad approvals here.",
      type: "contact-group",
      required: true
    }
  ],
  websites: [
    {
      id: "clientName",
      badge: "About You",
      question: "What is your name? 👋",
      subheading: "Let's start with who we are building for.",
      type: "text",
      placeholder: "e.g. Winner Oyekunle",
      required: true
    },
    {
      id: "webType",
      badge: "Website Type",
      question: "What kind of website do you need? 🖥️",
      subheading: "Select the classification that fits your operations.",
      type: "select",
      options: ["Single-Page Landing Page", "Corporate / Business Website", "E-commerce Storefront", "Custom SaaS Web Application"],
      required: true
    },
    {
      id: "webFeatures",
      badge: "Core Features",
      question: "What features are required on the site? ⚡",
      subheading: "Select all custom tools we need to code.",
      type: "checkbox-grid",
      options: ["User Login / Accounts", "Online Payment Gateway", "Booking Calendar Setup", "Dynamic Admin Dashboard", "Blog / CMS System", "Multi-language Support"],
      required: true
    },
    {
      id: "webDesignVibe",
      badge: "Design Direction",
      question: "What is your preferred design aesthetic? 🎨",
      subheading: "Choose the design tone for your layout.",
      type: "select",
      options: ["Modern Dark Mode (Tech/Premium)", "Minimalist & Clean (Sleek/White)", "Vibrant & Creative (Funky/Bold)", "Classic Corporate (Professional/Blue)"],
      required: true
    },
    {
      id: "webHosting",
      badge: "Domain Setup",
      question: "Domain & Hosting status 🌐",
      subheading: "Do you have domain name rights purchased?",
      type: "select",
      options: ["Already purchased domain & hosting", "Have domain, need hosting setup", "Need Nile to purchase and configure domain & hosting"],
      required: true
    },
    {
      id: "references",
      badge: "Design References",
      question: "Share links to websites you like 🔗",
      subheading: "List 2-3 links to competitor sites or layouts you admire.",
      type: "textarea",
      placeholder: "e.g. stripe.com, vercel.com"
    },
    {
      id: "referenceFile",
      badge: "Existing Assets",
      question: "Upload brand logo or sitemap outline 📁",
      subheading: "Upload logos, copywriting files, or layouts (Max 15MB).",
      type: "file"
    },
    {
      id: "contact",
      badge: "Contact Info",
      question: "How can we reach you? 📱",
      subheading: "We will share live developer staging links here.",
      type: "contact-group",
      required: true
    }
  ],
  apps: [
    {
      id: "clientName",
      badge: "About You",
      question: "What is your name? 👋",
      subheading: "Who will manage this development sprint with us?",
      type: "text",
      placeholder: "e.g. Winner Oyekunle",
      required: true
    },
    {
      id: "appPlatforms",
      badge: "Platform Target",
      question: "What platforms are we targeting? 📱",
      subheading: "Select all build environments required.",
      type: "checkbox-grid",
      options: ["iOS Mobile App", "Android Mobile App", "Cross-Platform Mobile App", "Web App / Admin Portal", "Custom API Backend Engine"],
      required: true
    },
    {
      id: "appDescription",
      badge: "Project Scope",
      question: "Describe what the application does 💡",
      subheading: "Write a detailed explanation of the user flow and problem it solves.",
      type: "textarea",
      placeholder: "e.g. A ride-sharing app specifically for campus students, allowing user verification and split payments.",
      required: true
    },
    {
      id: "appIntegrations",
      badge: "API Integrations",
      question: "List required API integrations 🔌",
      subheading: "e.g. Stripe/Paystack, Google Maps, Twilio SMS, Firebase Push Notifications",
      type: "text",
      placeholder: "e.g. Paystack, Google Maps API, Twilio SMS"
    },
    {
      id: "referenceFile",
      badge: "Technical Specs",
      question: "Upload system architecture or wireframes 📁",
      subheading: "Upload wireframes, DB models, design mockups, or project spec PDFs (Max 15MB).",
      type: "file"
    },
    {
      id: "contact",
      badge: "Contact Info",
      question: "How can we reach you? 📱",
      subheading: "We will coordinate git repos and sprint planning here.",
      type: "contact-group",
      required: true
    }
  ]
};

// State Variables
let currentTrackKey = "";
let currentQuestions = [];
let currentSlideIndex = 0;
const responses = {};

document.addEventListener("DOMContentLoaded", () => {
  // Check URL parameters for pre-selected tracks
  const urlParams = new URLSearchParams(window.location.search);
  const trackParam = urlParams.get("service");
  
  if (trackParam) {
    const sId = trackParam.toLowerCase();
    
    // Map URL service parameter query values directly to the 5 tracks
    if (["logo-design", "logo-redesign", "full-brand-identity", "logo", "packaging-design", "pitch-decks", "branding"].includes(sId)) {
      startTrack("logo");
    } else if (["social-media", "social", "social-media-starter", "content-calendar"].includes(sId)) {
      startTrack("social");
    } else if (["ads-campaigns", "ads", "social-media-ads", "google-ads"].includes(sId)) {
      startTrack("ads");
    } else if (["websites", "custom-websites", "saas-landing-page", "ecommerce-setup", "custom-code"].includes(sId)) {
      startTrack("websites");
    } else if (["apps", "mobile-app", "admin-dashboards", "api-systems", "apps-software"].includes(sId)) {
      startTrack("apps");
    }
  }
});

// Start Onboarding questionnaire track
function startTrack(trackKey) {
  currentTrackKey = trackKey;
  currentQuestions = tracks[trackKey];
  currentSlideIndex = 0;
  
  const briefCardFrame = document.getElementById("briefCardFrame");
  briefCardFrame.innerHTML = "";
  
  document.getElementById("briefFooter").style.display = "block";
  
  currentQuestions.forEach((q, idx) => {
    const slide = document.createElement("div");
    slide.className = `brief-slide ${idx === 0 ? "active" : ""}`;
    slide.id = `slide-${idx}`;
    
    let html = `
      <span class="brief-badge">${q.badge}</span>
      <h2 class="brief-heading">${q.question}</h2>
      <p class="brief-subheading">${q.subheading}</p>
      <div class="brief-input-wrapper">
    `;
    
    // Dynamic Input Types Renders
    if (q.type === "text") {
      html += `<input type="text" id="input-${q.id}" class="brief-text-input" placeholder="${q.placeholder}" onkeydown="handleEnter(event)">`;
    } else if (q.type === "textarea") {
      html += `<textarea id="input-${q.id}" class="brief-textarea-input" placeholder="${q.placeholder}"></textarea>`;
    } else if (q.type === "select") {
      html += `<select id="input-${q.id}" class="brief-select-input">
        <option value="" disabled selected>Choose an option...</option>
        ${q.options.map(opt => `<option value="${opt}">${opt}</option>`).join("")}
      </select>`;
    } else if (q.type === "checkbox-grid") {
      html += `<div class="checkbox-grid" style="margin-top: 10px;">
        ${q.options.map((opt, oIdx) => `
          <div class="checkbox-card" style="padding: 18px 24px;">
            <input type="checkbox" name="vibe" value="${opt}" id="vibe-${oIdx}">
            <label class="checkbox-label" for="vibe-${oIdx}">${opt}</label>
          </div>
        `).join("")}
      </div>`;
    } else if (q.type === "file") {
      html += `
        <div class="file-upload-zone" id="uploadZone-${q.id}" style="width: 100%; border: 2px dashed var(--border-color); border-radius: var(--radius-sm); padding: 40px 24px; text-align: center; cursor: pointer; position: relative; transition: all 0.3s;">
          <i class="fa-solid fa-cloud-arrow-up" style="font-size: 32px; color: var(--text-light); margin-bottom: 12px;" id="uploadIcon-${q.id}"></i>
          <p id="uploadText-${q.id}" style="font-size: 14px; color: var(--text-light); margin: 0;">Drag & drop your files here or click to browse</p>
          <input type="file" id="file-${q.id}" class="file-hidden-input" onchange="uploadReferenceFile('${q.id}')" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer;">
          
          <div class="upload-loader" id="loader-${q.id}" style="display: none; margin-top: 12px; font-size: 13px; font-weight: 700;">
            <i class="fa-solid fa-circle-notch fa-spin" style="color: var(--accent-green);"></i> Uploading to Cloudinary...
          </div>
          <div class="upload-success" id="success-${q.id}" style="display: none; margin-top: 12px; font-size: 13px; font-weight: 700; color: var(--accent-green);">
            <i class="fa-solid fa-circle-check"></i> File Uploaded Successfully!
          </div>
        </div>
      `;
    } else if (q.type === "contact-group") {
      html += `
        <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
          <input type="email" id="input-clientEmail" class="brief-text-input" placeholder="Email Address *" required style="font-size: 18px; padding: 14px 20px;">
          <input type="tel" id="input-clientPhone" class="brief-text-input" placeholder="WhatsApp Phone Number *" required style="font-size: 18px; padding: 14px 20px;">
        </div>
      `;
    }
    
    html += `
      </div>
      <div class="brief-error-msg" id="error-${q.id || "contact"}" style="display: none; color: #EF4444; font-size: 13px; font-weight: 600; margin-top: 12px;">
        <i class="fa-solid fa-triangle-exclamation"></i> Please fill this field to proceed.
      </div>
    `;
    
    slide.innerHTML = html;
    briefCardFrame.appendChild(slide);
  });
  
  // Slide Summary Review Card
  const summarySlide = document.createElement("div");
  summarySlide.className = "brief-slide";
  summarySlide.id = `slide-${currentQuestions.length}`;
  summarySlide.innerHTML = `
    <span class="brief-badge">Review Details</span>
    <h2 class="brief-heading">Confirm your project details</h2>
    <p class="brief-subheading">Review your answers below before generating your project brief.</p>
    <div id="briefSummaryContent" style="background: rgba(9, 9, 11, 0.02); border-left: 2px solid var(--primary-black); padding: 24px; border-radius: var(--radius-xs); max-height: 280px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; font-size: 14px; text-align: left;">
      <!-- Populated dynamically -->
    </div>
  `;
  briefCardFrame.appendChild(summarySlide);
  
  updateSlider();
}

// Upload file directly to backend endpoint (Cloudinary API integration)
async function uploadReferenceFile(id) {
  const fileInput = document.getElementById(`file-${id}`);
  const loader = document.getElementById(`loader-${id}`);
  const success = document.getElementById(`success-${id}`);
  const uploadIcon = document.getElementById(`uploadIcon-${id}`);
  const uploadText = document.getElementById(`uploadText-${id}`);
  const nextBtn = document.getElementById("btnNext");
  
  if (!fileInput.files || fileInput.files.length === 0) return;
  
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);
  
  // Show uploading loading state, disable next button
  loader.style.display = "block";
  success.style.display = "none";
  uploadIcon.style.opacity = "0.2";
  uploadText.style.opacity = "0.2";
  if (nextBtn) nextBtn.disabled = true;
  
  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });
    
    const data = await response.json();
    
    if (response.ok && data.url) {
      // Store Cloudinary secure URL inside state responses
      responses[id] = data.url;
      
      loader.style.display = "none";
      success.style.display = "block";
      uploadText.textContent = `File: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
      uploadText.style.opacity = "1";
      uploadIcon.className = "fa-solid fa-file-circle-check";
      uploadIcon.style.color = "var(--accent-green)";
      uploadIcon.style.opacity = "1";
    } else {
      alert("Upload failed: " + (data.error || "Server error"));
      loader.style.display = "none";
      uploadIcon.style.opacity = "1";
      uploadText.style.opacity = "1";
    }
  } catch (err) {
    console.error("🔴 Upload error:", err);
    alert("Network error: Failed to reach upload service.");
    loader.style.display = "none";
    uploadIcon.style.opacity = "1";
    uploadText.style.opacity = "1";
  } finally {
    if (nextBtn) nextBtn.disabled = false;
  }
}

// Navigate Next Slide
function nextSlide() {
  const qIndex = currentSlideIndex;
  
  if (qIndex === currentQuestions.length) {
    submitBrief();
    return;
  }
  
  const q = currentQuestions[qIndex];
  let value = "";
  let isValid = true;
  
  if (q.type === "text") {
    value = document.getElementById(`input-${q.id}`).value.trim();
    if (q.required && !value) isValid = false;
  } else if (q.type === "textarea") {
    value = document.getElementById(`input-${q.id}`).value.trim();
    if (q.required && !value) isValid = false;
  } else if (q.type === "select") {
    value = document.getElementById(`input-${q.id}`).value;
    if (q.required && !value) isValid = false;
  } else if (q.type === "checkbox-grid") {
    const checked = Array.from(document.querySelectorAll('input[name="vibe"]:checked')).map(cb => cb.value);
    value = checked;
    if (q.required && checked.length === 0) isValid = false;
  } else if (q.type === "file") {
    // If required file was not uploaded
    value = responses[q.id] || "";
    if (q.required && !value) isValid = false;
  } else if (q.type === "contact-group") {
    const email = document.getElementById("input-clientEmail").value.trim();
    const phone = document.getElementById("input-clientPhone").value.trim();
    value = { email, phone };
    if (!email || !phone) isValid = false;
  }
  
  const errorEl = document.getElementById(`error-${q.id || "contact"}`);
  if (!isValid) {
    if (errorEl) errorEl.style.display = "block";
    return;
  } else {
    if (errorEl) errorEl.style.display = "none";
  }
  
  // Save Response
  if (q.type === "contact-group") {
    responses["clientEmail"] = value.email;
    responses["clientPhone"] = value.phone;
  } else {
    responses[q.id] = value;
  }
  
  currentSlideIndex++;
  updateSlider();
}

// Navigate Previous Slide
function prevSlide() {
  if (currentSlideIndex === 0) {
    window.location.reload();
    return;
  }
  currentSlideIndex--;
  updateSlider();
}

// Update Active Slide Layout & Progress Bar
function updateSlider() {
  const totalSlides = currentQuestions.length + 1; // questions + summary
  const progressPercent = (currentSlideIndex / (totalSlides - 1)) * 100;
  
  document.getElementById("progressBar").style.width = `${progressPercent}%`;
  
  const slidesDOM = document.querySelectorAll(".brief-slide");
  slidesDOM.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === currentSlideIndex);
  });
  
  const indicator = document.getElementById("slideIndicator");
  const btnNext = document.getElementById("btnNext");
  
  if (currentSlideIndex === currentQuestions.length) {
    indicator.textContent = "Review Brief";
    btnNext.innerHTML = `Submit Brief <i class="fa-solid fa-paper-plane"></i>`;
    btnNext.classList.add("btn-whatsapp");
    btnNext.style.backgroundColor = "#25D366";
    btnNext.style.borderColor = "#25D366";
    
    populateSummary();
  } else {
    indicator.textContent = `Question ${currentSlideIndex + 1} of ${currentQuestions.length}`;
    btnNext.innerHTML = `Next <i class="fa-solid fa-arrow-right"></i>`;
    btnNext.classList.remove("btn-whatsapp");
    btnNext.style.backgroundColor = "";
    btnNext.style.borderColor = "";
  }
}

// Populate Summary List before final submit
function populateSummary() {
  const summaryBox = document.getElementById("briefSummaryContent");
  summaryBox.innerHTML = "";
  
  summaryBox.innerHTML += `<div><strong>Client Name:</strong> ${responses.clientName}</div>`;
  if (responses.businessName) {
    summaryBox.innerHTML += `<div><strong>Business Name:</strong> ${responses.businessName}</div>`;
  }
  
  currentQuestions.forEach(q => {
    if (["clientName", "businessName", "contact"].includes(q.id)) return;
    
    let val = responses[q.id];
    if (Array.isArray(val)) val = val.join(", ");
    
    if (q.type === "file") {
      val = val ? `<a href="${val}" target="_blank" style="color: var(--accent-green); text-decoration: underline;">View Uploaded File</a>` : "No file uploaded";
    }
    
    if (val) {
      summaryBox.innerHTML += `<div><strong>${q.question.replace(/[👋💼🏷️🎨📈🔍📍🔗📱📐🖥️⚡📁💰]/g, "").trim()}:</strong> ${val}</div>`;
    }
  });
  
  summaryBox.innerHTML += `<div><strong>Email:</strong> ${responses.clientEmail}</div>`;
  summaryBox.innerHTML += `<div><strong>WhatsApp:</strong> ${responses.clientPhone}</div>`;
}

// Handle Enter keypress events
function handleEnter(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    nextSlide();
  }
}

// Save to MongoDB Atlas and redirect to WhatsApp
async function submitBrief() {
  let serviceName = "Creative / Digital Onboarding";
  if (currentTrackKey === "logo") serviceName = "Logo & Branding Design";
  else if (currentTrackKey === "social") serviceName = "Social Media Content Setup";
  else if (currentTrackKey === "ads") serviceName = "Paid Ads Campaign";
  else if (currentTrackKey === "websites") serviceName = "Custom Website Development";
  else if (currentTrackKey === "apps") serviceName = "Mobile & Custom Software Systems";
  
  // Create WhatsApp message string template
  let waMsg = `Hello Nile Services,\nI just completed the onboarding brief for "${serviceName}".\n\n`;
  waMsg += `*1. Client Details:*\n`;
  waMsg += `- Name: ${responses.clientName}\n`;
  if (responses.businessName) waMsg += `- Business: ${responses.businessName}\n`;
  waMsg += `- Email: ${responses.clientEmail}\n`;
  waMsg += `- WhatsApp: ${responses.clientPhone}\n\n`;
  
  waMsg += `*2. Onboarding Answers:*\n`;
  currentQuestions.forEach(q => {
    if (["clientName", "businessName", "contact"].includes(q.id)) return;
    let label = q.question.replace(/[👋💼🏷️🎨📈🔍📍🔗📱📐🖥️⚡📁💰]/g, "").replace(/\?/g, "").trim();
    let val = responses[q.id];
    if (Array.isArray(val)) val = val.join(", ");
    if (val) {
      waMsg += `- ${label}: ${val}\n`;
    }
  });
  
  // Submit JSON object to MongoDB Atlas database API
  const newBrief = {
    clientName: responses.clientName,
    businessName: responses.businessName || "Personal Project",
    email: responses.clientEmail,
    phone: responses.clientPhone,
    track: currentTrackKey,
    trackLabel: serviceName,
    answers: responses
  };
  
  try {
    const nextBtn = document.getElementById("btnNext");
    if (nextBtn) {
      nextBtn.disabled = true;
      nextBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Saving...`;
    }

    const response = await fetch("/api/briefs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBrief)
    });
    
    if (response.ok) {
      console.log("🟢 Saved successfully to MongoDB database!");
    } else {
      console.error("🔴 Failed to save to database server.");
    }
  } catch (err) {
    console.error("🔴 DB write error:", err);
  }
  
  // Trigger WhatsApp redirection
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`;
  window.open(whatsappUrl, "_blank");
  
  // Redirect to admin hub to review
  setTimeout(() => {
    window.location.href = "admin.html";
  }, 1000);
}
