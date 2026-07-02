/**
 * Nile Services - Service Detail Dynamic Loader
 */

const WHATSAPP_NUMBER = "2348123456789"; // Replace with Nile Services actual WhatsApp number

document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  
  // --- Scroll Reveal Animation Pipeline (Intersection Observer) ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: "0px 0px -40px 0px"
  });

  function registerScrollReveal() {
    const revealElements = document.querySelectorAll(
      ".detail-header-card, .detail-sidebar-card, .modal-list-item, .service-card, .form-card, .cta-box, .includes-box, .notes-box"
    );
    revealElements.forEach(el => {
      el.classList.add("reveal-init");
      revealObserver.observe(el);
    });
  }
  
  // Dynamic Elements
  const breadcrumbActive = document.getElementById("breadcrumbActive");
  const serviceCategory = document.getElementById("serviceCategory");
  const serviceTimeline = document.getElementById("serviceTimeline");
  const serviceTitle = document.getElementById("serviceTitle");
  const servicePrice = document.getElementById("servicePrice");
  const serviceDescription = document.getElementById("serviceDescription");
  const serviceNoteBox = document.getElementById("serviceNoteBox");
  const serviceNoteText = document.getElementById("serviceNoteText");
  const serviceIncludesList = document.getElementById("serviceIncludesList");
  const serviceBestList = document.getElementById("serviceBestList");
  
  // Action Buttons
  const serviceWhatsAppBtn = document.getElementById("serviceWhatsAppBtn");
  const formWhatsAppRedirect = document.getElementById("formWhatsAppRedirect");
  
  // Grids
  const relatedGrid = document.getElementById("relatedGrid");
  
  // Form elements
  const requestForm = document.getElementById("requestForm");
  const serviceNeededDropdown = document.getElementById("serviceNeeded");
  const dynamicBriefContainer = document.getElementById("dynamicBriefContainer");
  const fileUploadContainer = document.getElementById("fileUploadContainer");
  const referenceFilesInput = document.getElementById("referenceFiles");
  const fileNameDisplay = document.getElementById("fileNameDisplay");
  const successToast = document.getElementById("successToast");

  // --- 1. Responsive Navbar Mobile Menu toggling ---
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const isOpened = navLinks.classList.contains("active");
    menuToggle.innerHTML = isOpened 
      ? '<i class="fa-solid fa-xmark"></i>' 
      : '<i class="fa-solid fa-bars-staggered"></i>';
  });

  // --- 2. Extract URL Parameter and Load Service ---
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get("id");

  if (!serviceId) {
    window.location.href = "index.html";
    return;
  }

  // Find service in dataset
  const service = servicesData.find(s => s.id === serviceId);

  if (!service) {
    window.location.href = "index.html";
    return;
  }

  // Populate dynamic page details
  document.title = `${service.name} | Nile Services`;
  breadcrumbActive.textContent = service.name;
  serviceCategory.textContent = service.categoryLabel;
  serviceTimeline.textContent = service.timeline;
  serviceTitle.textContent = service.name;
  
  // Consultation-only pricing check
  const isConsultation = service.price === "Consultation";
  const priceLabel = document.querySelector('.price-label');
  if (priceLabel) {
    priceLabel.textContent = isConsultation ? "Pricing" : "Starting Price";
  }
  servicePrice.textContent = service.price;
  
  serviceDescription.textContent = service.description;

  // Set note box
  if (service.note) {
    serviceNoteBox.style.display = "block";
    serviceNoteText.textContent = service.note;
  } else {
    serviceNoteBox.style.display = "none";
  }

  // Populate deliverables list
  serviceIncludesList.innerHTML = "";
  service.includes.forEach(inc => {
    const item = document.createElement("div");
    item.className = "modal-list-item";
    item.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-green);"></i> <span style="font-size: 14px;">${inc}</span>`;
    serviceIncludesList.appendChild(item);
  });

  // Populate best for list
  serviceBestList.innerHTML = "";
  service.bestFor.forEach(best => {
    const item = document.createElement("div");
    item.className = "modal-list-item";
    item.innerHTML = `<i class="fa-solid fa-angle-right" style="color: var(--accent-gold);"></i> <span style="font-size: 14px;">${best}</span>`;
    serviceBestList.appendChild(item);
  });

  // Redirect to step-by-step animated brief onboarding flow
  serviceWhatsAppBtn.href = `brief.html?service=${service.id}`;

  // Setup form quick WhatsApp link
  const formWaMsg = `Hello Nile Services, I'm filling the request form for "${service.name}". I'd like to discuss details with you on WhatsApp.`;
  formWhatsAppRedirect.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formWaMsg)}`;

  // --- 3. Pre-select Service Dropdown Options ---
  function mapServiceToDropdownVal(sId) {
    const mapping = {
      "logo-design": "Logo Design",
      "logo-redesign": "Logo Redesign",
      "full-brand-identity": "Brand Identity",
      "brand-naming-slogan": "Other",
      "flyer-design": "Flyer Design",
      "premium-flyer-design": "Flyer Design",
      "company-profile-design": "Other",
      "pitch-deck-design": "Pitch Deck / Proposal",
      "product-catalogue-design": "Other",
      "social-media-pack": "Social Media Content",
      "monthly-content-design": "Social Media Content",
      "content-calendar-captions": "Social Media Content",
      "social-media-setup": "Social Media Content",
      "video-scriptwriting": "Other",
      "ad-creative-design": "Ads Setup",
      "meta-ads-setup": "Ads Setup",
      "monthly-ads-management": "Ads Management",
      "campaign-strategy": "Ads Setup",
      "website-setup-support": "Website Setup",
      "website-audit": "Other",
      "custom-landing-page": "Custom Website",
      "custom-website": "Custom Website",
      "app-development": "Mobile App / Web App",
      "photography-direction": "Product Photography Direction",
      "product-mockup": "Other",
      "packaging-design": "Packaging / Label Design",
      "business-consultation": "Business Consultation",
      "business-plan-doc": "Business Consultation"
    };
    return mapping[sId] || "Other";
  }

  const dropdownVal = mapServiceToDropdownVal(serviceId);
  serviceNeededDropdown.value = dropdownVal;

  // --- 4. Dynamic Questionnaire Brief Generator ---
  function handleServiceChange(selectedService) {
    if (!dynamicBriefContainer) return;

    dynamicBriefContainer.style.display = "none";
    dynamicBriefContainer.innerHTML = "";

    if (!selectedService) return;

    let html = "";
    
    // Logo & Branding briefs
    if (["Logo Design", "Logo Redesign", "Brand Identity", "Packaging / Label Design"].includes(selectedService)) {
      dynamicBriefContainer.style.display = "flex";
      html = `
        <div class="dynamic-brief-section">
          <div class="dynamic-brief-title"><i class="fa-solid fa-wand-magic-sparkles"></i> 1. Choose Your Preferred Logo Style Vibe *</div>
          <div class="checkbox-grid">
            <div class="checkbox-card"><input type="checkbox" name="logo_vibe" value="Minimalist & Clean" id="vibe_1"><label class="checkbox-label" for="vibe_1">Minimalist & Clean</label></div>
            <div class="checkbox-card"><input type="checkbox" name="logo_vibe" value="Bold & Modern" id="vibe_2"><label class="checkbox-label" for="vibe_2">Bold & Modern</label></div>
            <div class="checkbox-card"><input type="checkbox" name="logo_vibe" value="Elegant & Luxury" id="vibe_3"><label class="checkbox-label" for="vibe_3">Elegant & Luxury</label></div>
            <div class="checkbox-card"><input type="checkbox" name="logo_vibe" value="Vintage & Classic" id="vibe_4"><label class="checkbox-label" for="vibe_4">Vintage & Classic</label></div>
            <div class="checkbox-card"><input type="checkbox" name="logo_vibe" value="Playful & Colorful" id="vibe_5"><label class="checkbox-label" for="vibe_5">Playful & Colorful</label></div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="sloganBrief">Brand Tagline / Slogan (if any)</label>
          <input type="text" id="sloganBrief" class="form-input" placeholder="e.g. Look Better, Sell Smarter">
        </div>
        <div class="form-group">
          <label class="form-label" for="brandMessageBrief">Key Message / Vibe (Optional)</label>
          <input type="text" id="brandMessageBrief" class="form-input" placeholder="e.g. Eco-friendly luxury, affordable organic skincare">
        </div>
      `;
    } 
    // Ads & Campaigns briefs
    else if (["Ads Setup", "Ads Management"].includes(selectedService)) {
      dynamicBriefContainer.style.display = "flex";
      html = `
        <div class="form-group">
          <label class="form-label" for="adsLocationBrief">Target Locations *</label>
          <input type="text" id="adsLocationBrief" class="form-input" placeholder="e.g. Lagos & Abuja, Nigeria" required>
        </div>
        <div class="dynamic-brief-section">
          <div class="dynamic-brief-title"><i class="fa-solid fa-bullseye"></i> 2. Target Audience Age Group *</div>
          <div class="checkbox-grid">
            <div class="checkbox-card"><input type="checkbox" name="ads_age" value="18 - 24" id="age_1"><label class="checkbox-label" for="age_1">18 - 24</label></div>
            <div class="checkbox-card"><input type="checkbox" name="ads_age" value="25 - 34" id="age_2"><label class="checkbox-label" for="age_2">25 - 34</label></div>
            <div class="checkbox-card"><input type="checkbox" name="ads_age" value="35 - 44" id="age_3"><label class="checkbox-label" for="age_3">35 - 44</label></div>
            <div class="checkbox-card"><input type="checkbox" name="ads_age" value="45+" id="age_4"><label class="checkbox-label" for="age_4">45+</label></div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="dailyBudgetBrief">Estimated Daily spend Budget *</label>
          <select id="dailyBudgetBrief" class="form-select" required>
            <option value="" disabled selected>Select daily spend...</option>
            <option value="₦2,000 - ₦5,000">₦2,000 - ₦5,000</option>
            <option value="₦5,000 - ₦10,000">₦5,000 - ₦10,000</option>
            <option value="₦10,000 - ₦25,000">₦10,000 - ₦25,000</option>
            <option value="Above ₦25,000">Above ₦25,000</option>
          </select>
        </div>
      `;
    } 
    // Websites & Apps briefs
    else if (["Website Setup", "Custom Website", "Mobile App / Web App"].includes(selectedService)) {
      dynamicBriefContainer.style.display = "flex";
      html = `
        <div class="dynamic-brief-section">
          <div class="dynamic-brief-title"><i class="fa-solid fa-laptop-code"></i> 1. Required Core Features *</div>
          <div class="checkbox-grid">
            <div class="checkbox-card"><input type="checkbox" name="web_features" value="Online Payments" id="feat_1"><label class="checkbox-label" for="feat_1">Online Payments</label></div>
            <div class="checkbox-card"><input type="checkbox" name="web_features" value="User Logins" id="feat_2"><label class="checkbox-label" for="feat_2">User Logins</label></div>
            <div class="checkbox-card"><input type="checkbox" name="web_features" value="Booking Calendar" id="feat_3"><label class="checkbox-label" for="feat_3">Booking Calendar</label></div>
            <div class="checkbox-card"><input type="checkbox" name="web_features" value="Product Catalog" id="feat_4"><label class="checkbox-label" for="feat_4">Product Catalog</label></div>
            <div class="checkbox-card"><input type="checkbox" name="web_features" value="Live Chat" id="feat_5"><label class="checkbox-label" for="feat_5">Live Chat</label></div>
            <div class="checkbox-card"><input type="checkbox" name="web_features" value="Admin Dashboard" id="feat_6"><label class="checkbox-label" for="feat_6">Admin Dashboard</label></div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="webDomainBrief">Domain & Hosting Status *</label>
          <select id="webDomainBrief" class="form-select" required>
            <option value="" disabled selected>Select status...</option>
            <option value="Already purchased">Already purchased</option>
            <option value="Need to buy (Advice requested)">Need to buy (Advice requested)</option>
          </select>
        </div>
      `;
    } 
    // Social Media Content briefs
    else if (["Social Media Content"].includes(selectedService)) {
      dynamicBriefContainer.style.display = "flex";
      html = `
        <div class="dynamic-brief-section">
          <div class="dynamic-brief-title"><i class="fa-solid fa-share-nodes"></i> 1. Social Platforms to Target *</div>
          <div class="checkbox-grid">
            <div class="checkbox-card"><input type="checkbox" name="sm_platforms" value="Instagram" id="plat_1"><label class="checkbox-label" for="plat_1">Instagram</label></div>
            <div class="checkbox-card"><input type="checkbox" name="sm_platforms" value="WhatsApp Business" id="plat_2"><label class="checkbox-label" for="plat_2">WhatsApp Business</label></div>
            <div class="checkbox-card"><input type="checkbox" name="sm_platforms" value="Facebook" id="plat_3"><label class="checkbox-label" for="plat_3">Facebook</label></div>
            <div class="checkbox-card"><input type="checkbox" name="sm_platforms" value="TikTok" id="plat_4"><label class="checkbox-label" for="plat_4">TikTok</label></div>
            <div class="checkbox-card"><input type="checkbox" name="sm_platforms" value="Twitter/X" id="plat_5"><label class="checkbox-label" for="plat_5">Twitter/X</label></div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="smPostFreq">Target Posting Frequency *</label>
          <select id="smPostFreq" class="form-select" required>
            <option value="" disabled selected>Select posting frequency...</option>
            <option value="2-3 posts per week">2-3 posts per week</option>
            <option value="Daily posts">Daily posts</option>
            <option value="Full monthly content plan">Full monthly content plan</option>
          </select>
        </div>
      `;
    } 
    // Consultation briefs
    else if (["Business Consultation"].includes(selectedService)) {
      dynamicBriefContainer.style.display = "flex";
      html = `
        <div class="form-group">
          <label class="form-label" for="consultationBottleneck">What is your primary business challenge? *</label>
          <select id="consultationBottleneck" class="form-select" required>
            <option value="" disabled selected>Select primary bottleneck...</option>
            <option value="Generating traffic & sales">Generating traffic & sales</option>
            <option value="Poor brand identity / logo look">Poor brand identity / logo look</option>
            <option value="Website conversion setup">Website conversion setup</option>
            <option value="Meta ads not converting">Meta ads not converting</option>
            <option value="General scaling operations">General scaling operations</option>
          </select>
        </div>
      `;
    }

    dynamicBriefContainer.innerHTML = html;

    // Attach custom UI helpers to newly added checkbox cards
    dynamicBriefContainer.querySelectorAll(".checkbox-card").forEach(card => {
      const checkbox = card.querySelector('input[type="checkbox"]');
      card.addEventListener("click", (e) => {
        if (e.target !== checkbox && e.target.tagName !== "LABEL") {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event("change"));
        }
      });
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          card.classList.add("checked");
        } else {
          card.classList.remove("checked");
        }
      });
    });
  }

  // Pre-fill questionnaire on load
  handleServiceChange(dropdownVal);

  // Bind change events if user changes selection
  serviceNeededDropdown.addEventListener("change", (e) => {
    handleServiceChange(e.target.value);
  });

  // --- 5. Render Related Services (Same Category, max 3) ---
  const related = servicesData.filter(s => s.category === service.category && s.id !== service.id).slice(0, 3);

  if (related.length === 0) {
    const backupRelated = servicesData.filter(s => s.id !== service.id).slice(0, 3);
    renderRelatedServicesList(backupRelated);
  } else {
    renderRelatedServicesList(related);
  }

  function renderRelatedServicesList(list) {
    relatedGrid.innerHTML = "";
    list.forEach((rel, idx) => {
      const card = document.createElement("div");
      card.className = "service-card";
      
      const onboardingUrl = `brief.html?service=${rel.id}`;
      const padVal = (idx + 1).toString().padStart(2, '0');
      
      card.innerHTML = `
        <span class="card-index">${padVal}</span>
        <div class="service-meta">
          <span class="service-cat">${rel.categoryLabel}</span>
          <span class="service-timeline"><i class="fa-regular fa-clock"></i> ${rel.timeline}</span>
        </div>
        <h3 class="service-name">${rel.name}</h3>
        <p class="service-description">${rel.description}</p>
        <div class="service-price-block">
          <span class="price-label">${rel.price === "Consultation" ? "Pricing" : "Starting from"}</span>
          <span class="price-value">${rel.price}</span>
        </div>
        <div class="service-actions">
          <a href="${onboardingUrl}" class="btn btn-whatsapp btn-sm"><i class="fa-solid fa-file-signature"></i> Request</a>
          <a href="service.html?id=${rel.id}" class="btn btn-secondary btn-sm">Details</a>
        </div>
      `;
      relatedGrid.appendChild(card);
      
      // Register scroll reveal
      if (revealObserver) {
        card.classList.add("reveal-init");
        revealObserver.observe(card);
      }
    });
  }

  // --- 6. Form Upload File Listeners ---
  fileUploadContainer.addEventListener("click", () => {
    referenceFilesInput.click();
  });

  referenceFilesInput.addEventListener("change", () => {
    if (referenceFilesInput.files.length > 0) {
      fileNameDisplay.textContent = `Attached: ${referenceFilesInput.files[0].name}`;
      fileNameDisplay.style.display = "block";
    } else {
      fileNameDisplay.textContent = "";
      fileNameDisplay.style.display = "none";
    }
  });

  // Drag events
  ["dragenter", "dragover"].forEach(eventName => {
    fileUploadContainer.addEventListener(eventName, (e) => {
      e.preventDefault();
      fileUploadContainer.style.borderColor = "var(--accent-green)";
    }, false);
  });

  ["dragleave", "drop"].forEach(eventName => {
    fileUploadContainer.addEventListener(eventName, (e) => {
      e.preventDefault();
      fileUploadContainer.style.borderColor = "var(--border-color)";
    }, false);
  });

  fileUploadContainer.addEventListener("drop", (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) {
      referenceFilesInput.files = files;
      fileNameDisplay.textContent = `Attached: ${files[0].name}`;
      fileNameDisplay.style.display = "block";
    }
  });

  // --- 7. Form Submission & WhatsApp Brief Builder ---
  requestForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const businessName = document.getElementById("businessName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const serviceNeeded = document.getElementById("serviceNeeded").value;
    const industry = document.getElementById("industry").value.trim();
    const budgetRange = document.getElementById("budgetRange").value;
    const timeline = document.getElementById("timeline").value.trim();
    const hasWebsite = document.getElementById("hasWebsite").value;
    const websiteLink = document.getElementById("websiteLink").value.trim();
    const instagram = document.getElementById("instagram").value.trim();
    const tiktok = document.getElementById("tiktok").value.trim();
    const reference = document.getElementById("reference").value.trim();
    const stylePref = document.getElementById("stylePref").value.trim();
    const colorPref = document.getElementById("colorPref").value.trim();
    const projectDesc = document.getElementById("description").value.trim();
    const additionalNotes = document.getElementById("notes").value.trim();

    // Gather dynamic brief data if present
    let briefDetails = "";
    
    const vibeCheckboxes = document.querySelectorAll('input[name="logo_vibe"]:checked');
    if (vibeCheckboxes.length > 0) {
      const vibes = Array.from(vibeCheckboxes).map(cb => cb.value).join(", ");
      briefDetails += `*Logo Style Vibe:* ${vibes}\n`;
    }
    const sloganInput = document.getElementById("sloganBrief");
    if (sloganInput && sloganInput.value.trim()) {
      briefDetails += `*Brand Slogan:* ${sloganInput.value.trim()}\n`;
    }
    const messageInput = document.getElementById("brandMessageBrief");
    if (messageInput && messageInput.value.trim()) {
      briefDetails += `*Brand Message:* ${messageInput.value.trim()}\n`;
    }
    const locInput = document.getElementById("adsLocationBrief");
    if (locInput && locInput.value.trim()) {
      briefDetails += `*Ads Locations:* ${locInput.value.trim()}\n`;
    }
    const ageCheckboxes = document.querySelectorAll('input[name="ads_age"]:checked');
    if (ageCheckboxes.length > 0) {
      const ages = Array.from(ageCheckboxes).map(cb => cb.value).join(", ");
      briefDetails += `*Ads Target Age:* ${ages}\n`;
    }
    const dailySpendSelect = document.getElementById("dailyBudgetBrief");
    if (dailySpendSelect && dailySpendSelect.value) {
      briefDetails += `*Ads Daily Budget:* ${dailySpendSelect.value}\n`;
    }
    const webCheckboxes = document.querySelectorAll('input[name="web_features"]:checked');
    if (webCheckboxes.length > 0) {
      const feats = Array.from(webCheckboxes).map(cb => cb.value).join(", ");
      briefDetails += `*Required Web Features:* ${feats}\n`;
    }
    const domainSelect = document.getElementById("webDomainBrief");
    if (domainSelect && domainSelect.value) {
      briefDetails += `*Domain & Hosting:* ${domainSelect.value}\n`;
    }
    const platCheckboxes = document.querySelectorAll('input[name="sm_platforms"]:checked');
    if (platCheckboxes.length > 0) {
      const plats = Array.from(platCheckboxes).map(cb => cb.value).join(", ");
      briefDetails += `*Social Platforms:* ${plats}\n`;
    }
    const freqSelect = document.getElementById("smPostFreq");
    if (freqSelect && freqSelect.value) {
      briefDetails += `*Posting Frequency:* ${freqSelect.value}\n`;
    }
    const bottleneckSelect = document.getElementById("consultationBottleneck");
    if (bottleneckSelect && bottleneckSelect.value) {
      briefDetails += `*Primary Challenge:* ${bottleneckSelect.value}\n`;
    }

    let waMsg = `Hello Nile Services,\n`;
    waMsg += `I just submitted a service request from the page: "${service.name}". Details:\n\n`;
    waMsg += `*Name:* ${fullName}\n`;
    waMsg += `*Business Name:* ${businessName}\n`;
    waMsg += `*Phone:* ${phone}\n`;
    waMsg += `*WhatsApp:* ${whatsapp}\n`;
    waMsg += `*Email:* ${email}\n`;
    waMsg += `*Service Requested:* ${serviceNeeded}\n`;
    waMsg += `*Budget Range:* ${budgetRange}\n`;
    if (industry) waMsg += `*Industry:* ${industry}\n`;
    if (timeline) waMsg += `*Preferred Timeline:* ${timeline}\n`;
    waMsg += `*Has Website?:* ${hasWebsite}\n`;
    if (websiteLink) waMsg += `*Website Link:* ${websiteLink}\n`;
    if (instagram) waMsg += `*Instagram Handle:* ${instagram}\n`;
    if (tiktok) waMsg += `*TikTok Handle:* ${tiktok}\n`;
    if (stylePref) waMsg += `*Style Vibe:* ${stylePref}\n`;
    if (colorPref) waMsg += `*Preferred Colors:* ${colorPref}\n`;
    if (reference) waMsg += `*References:* ${reference}\n`;
    
    // Inject dynamic brief items if present
    if (briefDetails) {
      waMsg += `\n*Service-Specific Brief:*\n${briefDetails}`;
    }
    
    waMsg += `\n*Project Description:*\n${projectDesc}\n\n`;
    if (additionalNotes) waMsg += `*Additional Notes:*\n${additionalNotes}\n`;

    // Save brief details internally inside localStorage for Admin Portal sync
    const newBrief = {
      id: "brief_" + Date.now(),
      date: new Date().toLocaleDateString(),
      clientName: fullName,
      businessName: businessName || "Personal Project",
      email: email,
      phone: whatsapp || phone,
      track: serviceNeeded.toLowerCase().includes("logo") ? "logo" : (serviceNeeded.toLowerCase().includes("ads") ? "ads" : "social"),
      trackLabel: serviceNeeded,
      answers: {
        clientName: fullName,
        businessName: businessName,
        budget: budgetRange,
        industry: industry,
        description: projectDesc,
        notes: additionalNotes
      }
    };
    
    const existingBriefs = JSON.parse(localStorage.getItem("nile_briefs") || "[]");
    existingBriefs.push(newBrief);
    localStorage.setItem("nile_briefs", JSON.stringify(existingBriefs));

    const encodedMsg = encodeURIComponent(waMsg);
    const whatsappRedirectUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

    successToast.classList.add("active");

    requestForm.reset();
    fileNameDisplay.textContent = "";
    fileNameDisplay.style.display = "none";
    serviceNeededDropdown.value = dropdownVal; // Restore preselection
    handleServiceChange(dropdownVal); // Re-render correct empty brief

    setTimeout(() => {
      successToast.classList.remove("active");
      window.open(whatsappRedirectUrl, "_blank");
    }, 2000);
  });
  
  // Trigger viewport scroll reveals
  registerScrollReveal();
});
