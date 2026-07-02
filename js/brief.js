/**
 * Nile Services - Interactive Onboarding Brief Engine
 */

const WHATSAPP_NUMBER = "2348123456789";

// Define the Onboarding Tracks Questions
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
      id: "colors",
      badge: "Color Direction",
      question: "What are your preferred colors? 🎨",
      subheading: "Leave blank if you'd like our design team to choose.",
      type: "text",
      placeholder: "e.g. Emerald Green, Matte Obsidian, Rich Gold"
    },
    {
      id: "references",
      badge: "Inspiration",
      question: "Share links to designs or logos you like 🔗",
      subheading: "Add direct URLs to Pinterest, Dribbble, or live websites.",
      type: "textarea",
      placeholder: "e.g. https://pinterest.com/pin/... or dribbble.com/..."
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
      subheading: "Provide links to Instagram, Twitter, or TikTok accounts.",
      type: "text",
      placeholder: "e.g. instagram.com/nileafrica",
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
      id: "competitors",
      badge: "Inspiration",
      question: "List 2-3 competitor profiles you admire 🔍",
      subheading: "Add handles or links so we can analyze their content styles.",
      type: "textarea",
      placeholder: "e.g. @stripe, @google, @apple"
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
      id: "adsAssetLink",
      badge: "Campaign Content",
      question: "Paste links to ad graphic/video assets 🔗",
      subheading: "Link to Google Drive, Dropbox, or live social posts you want us to run ads on.",
      type: "text",
      placeholder: "e.g. google.com/drive/...",
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
  ]
};

// State Variables
let currentTrackKey = "";
let currentQuestions = [];
let currentSlideIndex = 0;
const responses = {};

document.addEventListener("DOMContentLoaded", () => {
  // Check url parameters for pre-selected tracks
  const urlParams = new URLSearchParams(window.location.search);
  const trackParam = urlParams.get("service");
  
  if (trackParam) {
    // Map catalog IDs to onboarding tracks
    if (["logo-design", "logo-redesign", "full-brand-identity", "logo"].includes(trackParam)) {
      startTrack("logo");
    } else if (["social-media", "social"].includes(trackParam)) {
      startTrack("social");
    } else if (["ads-campaigns", "ads"].includes(trackParam)) {
      startTrack("ads");
    }
  }
});

// Start the Onboarding questionnaire track
function startTrack(trackKey) {
  currentTrackKey = trackKey;
  currentQuestions = tracks[trackKey];
  currentSlideIndex = 0;
  
  // Clear select slide
  const briefCardFrame = document.getElementById("briefCardFrame");
  briefCardFrame.innerHTML = "";
  
  // Show bottom navigation bar
  document.getElementById("briefFooter").style.display = "block";
  
  // Build and render slides
  currentQuestions.forEach((q, idx) => {
    const slide = document.createElement("div");
    slide.className = `brief-slide ${idx === 0 ? "active" : ""}`;
    slide.id = `slide-${idx}`;
    
    // Header tags
    let html = `
      <span class="brief-badge">${q.badge}</span>
      <h2 class="brief-heading">${q.question}</h2>
      <p class="brief-subheading">${q.subheading}</p>
      <div class="brief-input-wrapper">
    `;
    
    // Dynamic Input Types
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
        <i class="fa-solid fa-triangle-exclamation"></i> Please answer this question to proceed.
      </div>
    `;
    
    slide.innerHTML = html;
    briefCardFrame.appendChild(slide);
  });
  
  // Add Slide Summary Review Card
  const summarySlide = document.createElement("div");
  summarySlide.className = "brief-slide";
  summarySlide.id = `slide-${currentQuestions.length}`;
  summarySlide.innerHTML = `
    <span class="brief-badge">Review Details</span>
    <h2 class="brief-heading">Confirm your project details</h2>
    <p class="brief-subheading">Review your answers below before generating your WhatsApp brief.</p>
    <div id="briefSummaryContent" style="background: rgba(9, 9, 11, 0.02); border-left: 2px solid var(--primary-black); padding: 24px; border-radius: var(--radius-xs); max-height: 280px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; font-size: 14px; text-align: left;">
      <!-- Populated dynamically during updateSlider -->
    </div>
  `;
  briefCardFrame.appendChild(summarySlide);
  
  updateSlider();
}

// Navigate Next Slide
function nextSlide() {
  const qIndex = currentSlideIndex;
  
  // If we are on the summary slide, submit
  if (qIndex === currentQuestions.length) {
    submitBrief();
    return;
  }
  
  const q = currentQuestions[qIndex];
  
  // Validate Input
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
  
  // Transition slides
  currentSlideIndex++;
  updateSlider();
}

// Navigate Previous Slide
function prevSlide() {
  if (currentSlideIndex === 0) {
    // Go back to track select slide
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
  
  // Update progress bar width
  document.getElementById("progressBar").style.width = `${progressPercent}%`;
  
  // Toggle Slide Elements
  const slidesDOM = document.querySelectorAll(".brief-slide");
  slidesDOM.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === currentSlideIndex);
  });
  
  // Update footer controls text
  const indicator = document.getElementById("slideIndicator");
  const btnNext = document.getElementById("btnNext");
  
  if (currentSlideIndex === currentQuestions.length) {
    // Summary Slide State
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
  
  // Add Name & Contact Info
  summaryBox.innerHTML += `<div><strong>Client Name:</strong> ${responses.clientName}</div>`;
  if (responses.businessName) {
    summaryBox.innerHTML += `<div><strong>Business Name:</strong> ${responses.businessName}</div>`;
  }
  
  currentQuestions.forEach(q => {
    if (["clientName", "businessName", "contact"].includes(q.id)) return;
    
    let val = responses[q.id];
    if (Array.isArray(val)) val = val.join(", ");
    if (val) {
      summaryBox.innerHTML += `<div><strong>${q.question.replace(/[👋💼🏷️🎨📈🔍📍🔗📱💰]/g, "").trim()}:</strong> ${val}</div>`;
    }
  });
  
  summaryBox.innerHTML += `<div><strong>Email:</strong> ${responses.clientEmail}</div>`;
  summaryBox.innerHTML += `<div><strong>WhatsApp:</strong> ${responses.clientPhone}</div>`;
}

// Handle hitting Enter key on keyboard inputs to proceed
function handleEnter(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    nextSlide();
  }
}

// Compile brief, save to local database, and redirect to WhatsApp
function submitBrief() {
  // Format WhatsApp message text
  let serviceName = "Creative / Digital Onboarding";
  if (currentTrackKey === "logo") serviceName = "Logo & Branding Design";
  else if (currentTrackKey === "social") serviceName = "Social Media Content Setup";
  else if (currentTrackKey === "ads") serviceName = "Paid Ads Campaign";
  
  let waMsg = `Hello Nile Services,\nI just completed the onboarding brief for "${serviceName}".\n\n`;
  waMsg += `*1. Client Details:*\n`;
  waMsg += `- Name: ${responses.clientName}\n`;
  if (responses.businessName) waMsg += `- Business: ${responses.businessName}\n`;
  waMsg += `- Email: ${responses.clientEmail}\n`;
  waMsg += `- WhatsApp: ${responses.clientPhone}\n\n`;
  
  waMsg += `*2. Onboarding Answers:*\n`;
  currentQuestions.forEach(q => {
    if (["clientName", "businessName", "contact"].includes(q.id)) return;
    let label = q.question.replace(/[👋💼🏷️🎨📈🔍📍🔗📱💰]/g, "").replace(/\?/g, "").trim();
    let val = responses[q.id];
    if (Array.isArray(val)) val = val.join(", ");
    if (val) {
      waMsg += `- ${label}: ${val}\n`;
    }
  });
  
  // Save brief details internally inside localStorage
  const newBrief = {
    id: "brief_" + Date.now(),
    date: new Date().toLocaleDateString(),
    clientName: responses.clientName,
    businessName: responses.businessName || "Personal Project",
    email: responses.clientEmail,
    phone: responses.clientPhone,
    track: currentTrackKey,
    trackLabel: serviceName,
    answers: responses
  };
  
  const existingBriefs = JSON.parse(localStorage.getItem("nile_briefs") || "[]");
  existingBriefs.push(newBrief);
  localStorage.setItem("nile_briefs", JSON.stringify(existingBriefs));
  
  // WhatsApp redirect trigger
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`;
  window.open(whatsappUrl, "_blank");
  
  // Redirect dashboard
  setTimeout(() => {
    window.location.href = "admin.html";
  }, 800);
}
