/**
 * Nile Services Portal - Internal Database-Driven Admin Dashboard Logic
 * Integrates with Node.js MongoDB API
 */

const WHATSAPP_NUMBER = "2348123456789";
let briefs = [];

document.addEventListener("DOMContentLoaded", () => {
  const passcode = sessionStorage.getItem("nile_admin_passcode");
  if (!passcode) {
    showLoginScreen();
  } else {
    loadBriefs();
  }
});

function showLoginScreen() {
  document.getElementById("loginGate").style.display = "flex";
  document.getElementById("adminDashboardContent").style.display = "none";
}

function showDashboard() {
  document.getElementById("loginGate").style.display = "none";
  document.getElementById("adminDashboardContent").style.display = "block";
}

// Handle Admin Authenticate Action
async function handleLoginSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("adminPasscodeInput");
  const errorMsg = document.getElementById("loginErrorMsg");
  const passcode = input.value.trim();
  
  if (!passcode) return;

  errorMsg.style.display = "none";
  sessionStorage.setItem("nile_admin_passcode", passcode);
  
  await loadBriefs();
}

// Load briefs from Node.js MongoDB Atlas REST API
async function loadBriefs() {
  const tbody = document.getElementById("briefsTableBody");
  const emptyState = document.getElementById("tableEmptyState");
  const errorMsg = document.getElementById("loginErrorMsg");
  
  tbody.innerHTML = `
    <tr>
      <td colspan="6" style="text-align: center; padding: 60px 20px; color: #71717A;">
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 24px; margin-bottom: 12px; color: var(--accent-green);"></i>
        <p style="margin: 0; font-size: 13px;">Loading briefs from MongoDB Atlas...</p>
      </td>
    </tr>
  `;

  const passcode = sessionStorage.getItem("nile_admin_passcode") || "";

  try {
    const response = await fetch("/api/briefs", {
      headers: {
        "x-admin-passcode": passcode
      }
    });

    if (response.status === 401) {
      sessionStorage.removeItem("nile_admin_passcode");
      errorMsg.style.display = "block";
      showLoginScreen();
      return;
    }

    if (!response.ok) throw new Error("Failed to fetch data from database");
    
    briefs = await response.json();
    showDashboard();
    updateStats();
    renderTable(briefs);
  } catch (err) {
    console.error("🔴 Error fetching briefs:", err);
    tbody.innerHTML = "";
    emptyState.style.display = "block";
    emptyState.querySelector("h3").textContent = "Database Error";
    emptyState.querySelector("p").textContent = "Could not connect to MongoDB Atlas. Check your database configuration.";
  }
}

// Update dashboard stats cards
function updateStats() {
  const total = briefs.length;
  const logoCount = briefs.filter(b => b.track === "logo").length;
  const socialCount = briefs.filter(b => b.track === "social").length;
  const adsCount = briefs.filter(b => b.track === "ads").length;
  const webCount = briefs.filter(b => b.track === "websites").length;
  const appCount = briefs.filter(b => b.track === "apps").length;
  const productUploadCount = briefs.filter(b => b.track === "product_upload").length;
  
  document.getElementById("statTotal").textContent = total;
  
  // Update category counts (Websites & Apps & Uploads stack into Campaign Ads and Social sections dynamically)
  document.getElementById("statLogo").textContent = logoCount;
  document.getElementById("statSocial").textContent = socialCount + webCount + productUploadCount;
  document.getElementById("statAds").textContent = adsCount + appCount;
}

// Render briefs rows inside the table body
function renderTable(list) {
  const tbody = document.getElementById("briefsTableBody");
  const emptyState = document.getElementById("tableEmptyState");
  tbody.innerHTML = "";
  
  if (list.length === 0) {
    emptyState.style.display = "block";
    return;
  } else {
    emptyState.style.display = "none";
  }
  
  list.forEach(item => {
    const row = document.createElement("tr");
    row.className = "admin-table-row";
    
    // Determine category styling badges
    let badgeStyle = "background-color: #3F3F46; color: #F4F4F5;";
    let trackLabel = item.trackLabel;
    
    if (item.track === "logo") {
      badgeStyle = "background-color: rgba(168, 85, 247, 0.15); color: #C084FC;";
      trackLabel = "Logo & Branding";
    } else if (item.track === "social") {
      badgeStyle = "background-color: rgba(6, 182, 212, 0.15); color: #22D3EE;";
      trackLabel = "Social Media";
    } else if (item.track === "ads") {
      badgeStyle = "background-color: rgba(225, 29, 72, 0.15); color: #FB7185;";
      trackLabel = "Campaign Ads";
    } else if (item.track === "websites") {
      badgeStyle = "background-color: rgba(16, 185, 129, 0.15); color: #34D399;";
      trackLabel = "Custom Websites";
    } else if (item.track === "apps") {
      badgeStyle = "background-color: rgba(245, 158, 11, 0.15); color: #FBBF24;";
      trackLabel = "Software / Apps";
    } else if (item.track === "product_upload") {
      badgeStyle = "background-color: rgba(14, 165, 233, 0.15); color: #38BDF8;";
      trackLabel = "Product Uploading";
    }
    
    // Get unique identifier (either Hex MongoDB _id or string local id)
    const itemId = item._id || item.id;
    
    row.innerHTML = `
      <td style="padding: 16px 24px; font-size: 13px; color: #A1A1AA;">${item.date || new Date(item.createdAt).toLocaleDateString()}</td>
      <td style="padding: 16px 24px; font-weight: 700; font-size: 14px; color: #F4F4F5;">${item.clientName}</td>
      <td style="padding: 16px 24px; font-size: 13px; color: #D4D4D8;">${item.businessName}</td>
      <td style="padding: 16px 24px;">
        <span style="font-size: 11px; padding: 4px 8px; border-radius: 4px; font-weight: 800; text-transform: uppercase; ${badgeStyle}">${trackLabel}</span>
      </td>
      <td style="padding: 16px 24px; font-size: 13px; color: #A1A1AA;">${item.phone}</td>
      <td style="padding: 16px 24px; display: flex; gap: 8px; justify-content: center;">
        <button class="btn btn-secondary btn-xs" style="color: #F4F4F5; border-color: #3F3F46; padding: 6px 12px; text-transform: none; font-size: 12px;" onclick="viewBrief('${itemId}')">
          <i class="fa-solid fa-eye"></i> View
        </button>
        <button class="btn btn-secondary btn-xs" style="color: #EF4444; border-color: rgba(239, 68, 68, 0.2); padding: 6px 12px; text-transform: none; font-size: 12px;" onclick="deleteBrief('${itemId}')">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Apply search queries and dropdown category filters
function applyFilters() {
  const phrase = document.getElementById("adminSearch").value.trim().toLowerCase();
  const track = document.getElementById("adminFilterTrack").value;
  
  const filtered = briefs.filter(b => {
    const nameMatch = b.clientName ? b.clientName.toLowerCase().includes(phrase) : false;
    const bizMatch = b.businessName ? b.businessName.toLowerCase().includes(phrase) : false;
    const emailMatch = b.email ? b.email.toLowerCase().includes(phrase) : false;
    
    const matchesSearch = nameMatch || bizMatch || emailMatch;
    const matchesTrack = track === "all" || b.track === track;
    
    return matchesSearch && matchesTrack;
  });
  
  renderTable(filtered);
}

// Open modal showing complete brief questionnaire values
function viewBrief(id) {
  const item = briefs.find(b => (b._id === id || b.id === id));
  if (!item) return;
  
  const modal = document.getElementById("briefModal");
  const modalTrackBadge = document.getElementById("modalTrackBadge");
  const modalClientName = document.getElementById("modalClientName");
  const modalContent = document.getElementById("modalContent");
  const btnModalWhatsApp = document.getElementById("btnModalWhatsApp");
  
  // Set badge label
  modalTrackBadge.textContent = item.trackLabel.split(" ")[0] || item.track;
  
  // Styling track colors
  if (item.track === "logo") {
    modalTrackBadge.style.background = "#A855F7";
    modalTrackBadge.style.color = "#FFF";
  } else if (item.track === "social") {
    modalTrackBadge.style.background = "#06B6D4";
    modalTrackBadge.style.color = "#FFF";
  } else if (item.track === "ads") {
    modalTrackBadge.style.background = "#E11D48";
    modalTrackBadge.style.color = "#FFF";
  } else if (item.track === "websites") {
    modalTrackBadge.style.background = "#10B981";
    modalTrackBadge.style.color = "#FFF";
  } else {
    modalTrackBadge.style.background = "#F59E0B";
    modalTrackBadge.style.color = "#FFF";
  }
  
  modalClientName.textContent = item.clientName + " — " + item.businessName;
  
  // Compile responses key-values
  let html = `
    <div style="background-color: #18181B; border: 1px solid #27272A; border-radius: 8px; padding: 20px;">
      <h4 style="color: #A1A1AA; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px 0;">Contact Details</h4>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div><strong>Email Address:</strong> <a href="mailto:${item.email}" style="color: var(--accent-green); text-decoration: none;">${item.email}</a></div>
        <div><strong>WhatsApp Phone:</strong> <a href="tel:${item.phone}" style="color: var(--accent-green); text-decoration: none;">${item.phone}</a></div>
        <div><strong>Submission Date:</strong> ${item.date || new Date(item.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
    
    <div>
      <h4 style="color: #A1A1AA; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0;">Questionnaire Answers</h4>
      <div style="display: flex; flex-direction: column; gap: 20px;">
  `;
  
  // Map values dynamically based on questions
  Object.keys(item.answers).forEach(key => {
    if (["clientName", "businessName", "clientEmail", "clientPhone"].includes(key)) return;
    
    let answerVal = item.answers[key];
    
    if (Array.isArray(answerVal)) answerVal = answerVal.join(", ");
    
    // Check if the answer is a Cloudinary file link
    if (typeof answerVal === "string" && answerVal.includes("res.cloudinary.com")) {
      answerVal = `
        <a href="${answerVal}" target="_blank" class="btn btn-secondary btn-xs" style="color: var(--accent-green); border-color: var(--accent-green); text-transform: none; display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; margin-top: 4px;">
          <i class="fa-solid fa-file-arrow-down"></i> View Uploaded File
        </a>
      `;
    }
    
    // Map nice readable question headers
    let questionLabel = key;
    if (key === "tagline") questionLabel = "Slogan or Tagline";
    else if (key === "vibe") questionLabel = "Brand Style / Vibe";
    else if (key === "colors") questionLabel = "Preferred Brand Colors";
    else if (key === "logoType") questionLabel = "Preferred Logo Type";
    else if (key === "references") questionLabel = "Inspiration References";
    else if (key === "referenceFile") questionLabel = "Uploaded Reference Files";
    else if (key === "socialHandle") questionLabel = "Social Media Handle";
    else if (key === "socialPlatforms") questionLabel = "Target Channels";
    else if (key === "socialGoals") questionLabel = "Content Goals";
    else if (key === "postingFrequency") questionLabel = "Posting Frequency";
    else if (key === "competitors") questionLabel = "Competitor Profiles";
    else if (key === "adsGoal") questionLabel = "Product to Advertise";
    else if (key === "adsObjective") questionLabel = "Campaign Target Objective";
    else if (key === "adsBudget") questionLabel = "Daily Ad Spend Budget";
    else if (key === "adsLocation") questionLabel = "Target Location";
    else if (key === "adsContentLinks") questionLabel = "Campaign Links";
    else if (key === "webType") questionLabel = "Website Structure Type";
    else if (key === "webFeatures") questionLabel = "Required Web Features";
    else if (key === "webDesignVibe") questionLabel = "Design Aesthetic Preference";
    else if (key === "webHosting") questionLabel = "Domain & Hosting status";
    else if (key === "appPlatforms") questionLabel = "Target Build Platforms";
    else if (key === "appDescription") questionLabel = "Product Functional Scope";
    else if (key === "appIntegrations") questionLabel = "Required Integration APIs";
    else if (key === "storeLogins") questionLabel = "Store Login Credentials";
    else if (key === "productCount") questionLabel = "Products Upload Count (Fee)";
    
    html += `
      <div style="border-left: 2px solid #3F3F46; padding-left: 16px;">
        <div style="color: #A1A1AA; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">${questionLabel}</div>
        <div style="color: #F4F4F5; font-size: 14px;">${answerVal || "<i>None provided</i>"}</div>
      </div>
    `;
  });
  
  html += `</div></div>`;
  modalContent.innerHTML = html;
  
  // Connect WhatsApp follow-up button
  const followUpMsg = `Hello ${item.clientName},\nI am reviewing the project brief you submitted to Nile Services. Let's discuss details!`;
  btnModalWhatsApp.onclick = () => {
    const waUrl = `https://wa.me/${item.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(followUpMsg)}`;
    window.open(waUrl, "_blank");
  };
  
  modal.style.display = "flex";
}

// Close detailed modal
function closeModal() {
  document.getElementById("briefModal").style.display = "none";
}

// Delete brief record from MongoDB Atlas database API
async function deleteBrief(id) {
  if (confirm("Are you sure you want to delete this brief? This action will permanently remove it from MongoDB Atlas.")) {
    const passcode = sessionStorage.getItem("nile_admin_passcode") || "";
    try {
      const response = await fetch(`/api/briefs/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-passcode": passcode
        }
      });
      
      if (response.status === 401) {
        alert("Session expired or unauthorized. Please re-authenticate.");
        sessionStorage.removeItem("nile_admin_passcode");
        showLoginScreen();
        return;
      }

      if (response.ok) {
        loadBriefs(); // Refresh briefs list
      } else {
        alert("Failed to delete the brief from the server.");
      }
    } catch (err) {
      console.error("🔴 Error deleting brief:", err);
      alert("Network error: Failed to complete deletion.");
    }
  }
}

// Clear all briefs warning message
function clearAllBriefs() {
  alert("Clear All is disabled in production to protect active customer briefs. Delete records individually.");
}
