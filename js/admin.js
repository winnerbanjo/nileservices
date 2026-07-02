/**
 * Nile Services Portal - Internal Admin Dashboard Logic
 */

const WHATSAPP_NUMBER = "2348123456789";
let briefs = [];

document.addEventListener("DOMContentLoaded", () => {
  loadBriefs();
});

// Load briefs from LocalStorage database
function loadBriefs() {
  const data = localStorage.getItem("nile_briefs");
  briefs = JSON.parse(data || "[]");
  
  // Sort by date (newest first)
  briefs.sort((a, b) => b.id.localeCompare(a.id));
  
  updateStats();
  renderTable(briefs);
}

// Update dashboard stats cards
function updateStats() {
  const total = briefs.length;
  const logoCount = briefs.filter(b => b.track === "logo").length;
  const socialCount = briefs.filter(b => b.track === "social").length;
  const adsCount = briefs.filter(b => b.track === "ads").length;
  
  document.getElementById("statTotal").textContent = total;
  document.getElementById("statLogo").textContent = logoCount;
  document.getElementById("statSocial").textContent = socialCount;
  document.getElementById("statAds").textContent = adsCount;
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
    }
    
    row.innerHTML = `
      <td style="padding: 16px 24px; font-size: 13px; color: #A1A1AA;">${item.date}</td>
      <td style="padding: 16px 24px; font-weight: 700; font-size: 14px; color: #F4F4F5;">${item.clientName}</td>
      <td style="padding: 16px 24px; font-size: 13px; color: #D4D4D8;">${item.businessName}</td>
      <td style="padding: 16px 24px;">
        <span style="font-size: 11px; padding: 4px 8px; border-radius: 4px; font-weight: 800; text-transform: uppercase; ${badgeStyle}">${trackLabel}</span>
      </td>
      <td style="padding: 16px 24px; font-size: 13px; color: #A1A1AA;">${item.phone}</td>
      <td style="padding: 16px 24px; display: flex; gap: 8px; justify-content: center;">
        <button class="btn btn-secondary btn-xs" style="color: #F4F4F5; border-color: #3F3F46; padding: 6px 12px; text-transform: none; font-size: 12px;" onclick="viewBrief('${item.id}')">
          <i class="fa-solid fa-eye"></i> View
        </button>
        <button class="btn btn-secondary btn-xs" style="color: #EF4444; border-color: rgba(239, 68, 68, 0.2); padding: 6px 12px; text-transform: none; font-size: 12px;" onclick="deleteBrief('${item.id}')">
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
    const matchesSearch = b.clientName.toLowerCase().includes(phrase) || 
                          b.businessName.toLowerCase().includes(phrase) ||
                          b.email.toLowerCase().includes(phrase);
    const matchesTrack = track === "all" || b.track === track;
    
    return matchesSearch && matchesTrack;
  });
  
  renderTable(filtered);
}

// Open modal showing complete brief questionnaire values
function viewBrief(id) {
  const item = briefs.find(b => b.id === id);
  if (!item) return;
  
  const modal = document.getElementById("briefModal");
  const modalTrackBadge = document.getElementById("modalTrackBadge");
  const modalClientName = document.getElementById("modalClientName");
  const modalContent = document.getElementById("modalContent");
  const btnModalWhatsApp = document.getElementById("btnModalWhatsApp");
  
  // Set badge label
  modalTrackBadge.textContent = item.track === "logo" ? "Logo Design" : (item.track === "social" ? "Social Media" : "Campaign Ads");
  
  // Styling track colors
  if (item.track === "logo") {
    modalTrackBadge.style.background = "#A855F7";
    modalTrackBadge.style.color = "#FFF";
  } else if (item.track === "social") {
    modalTrackBadge.style.background = "#06B6D4";
    modalTrackBadge.style.color = "#FFF";
  } else {
    modalTrackBadge.style.background = "#E11D48";
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
        <div><strong>Submission Date:</strong> ${item.date}</div>
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
    
    // Map nice readable question headers
    let questionLabel = key;
    if (key === "tagline") questionLabel = "Slogan or Tagline";
    else if (key === "vibe") questionLabel = "Brand Style / Vibe";
    else if (key === "colors") questionLabel = "Preferred Brand Colors";
    else if (key === "references") questionLabel = "Inspiration References";
    else if (key === "socialHandle") questionLabel = "Social Media Handle";
    else if (key === "socialGoals") questionLabel = "Content Goals";
    else if (key === "competitors") questionLabel = "Competitor Profiles";
    else if (key === "adsGoal") questionLabel = "Product to Advertise";
    else if (key === "adsBudget") questionLabel = "Daily Ad Spend Budget";
    else if (key === "adsLocation") questionLabel = "Target Location";
    else if (key === "adsAssetLink") questionLabel = "Campaign Graphic Links";
    
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
  const followUpMsg = `Hello ${item.clientName},\nI am reviewing the logo/branding onboarding brief you submitted to Nile Services. Let's discuss details!`;
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

// Delete brief record
function deleteBrief(id) {
  if (confirm("Are you sure you want to delete this brief? This action cannot be undone.")) {
    const filtered = briefs.filter(b => b.id !== id);
    localStorage.setItem("nile_briefs", JSON.stringify(filtered));
    loadBriefs();
  }
}

// Clear all briefs database records
function clearAllBriefs() {
  if (confirm("WARNING: Are you absolutely sure you want to clear all submitted briefs? This will wipe the database table completely.")) {
    localStorage.removeItem("nile_briefs");
    loadBriefs();
  }
}
