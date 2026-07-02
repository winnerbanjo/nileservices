/**
 * Nile Services Catalogue - Core Landing Page & Catalogue Interactivity
 */

// Configuration
const WHATSAPP_NUMBER = "2348123456789"; // Replace with Nile Services actual WhatsApp number

document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  
  // Catalogue Elements
  const catalogueGrid = document.getElementById("catalogueGrid");
  const catalogueEmpty = document.getElementById("catalogueEmpty");
  const searchInput = document.getElementById("searchInput");
  const filterTabsContainer = document.getElementById("filterTabs");
  
  // Portfolio Elements
  const portfolioGrid = document.getElementById("portfolioGrid");
  const portfolioTabsContainer = document.getElementById("portfolioTabs");
  
  // FAQ Elements
  const faqItems = document.querySelectorAll(".faq-item");
  
  // Form Elements
  const requestForm = document.getElementById("requestForm");
  const serviceNeededDropdown = document.getElementById("serviceNeeded");
  const dynamicBriefContainer = document.getElementById("dynamicBriefContainer");
  const fileUploadContainer = document.getElementById("fileUploadContainer");
  const referenceFilesInput = document.getElementById("referenceFiles");
  const fileNameDisplay = document.getElementById("fileNameDisplay");
  const successToast = document.getElementById("successToast");

  // State Management
  let currentServiceFilter = "all";
  let searchPhrase = "";
  let currentPortfolioFilter = "all";

  // --- Hero Slider Interactivity ---
  const slides = document.querySelectorAll(".hero-slider .slide");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  const indicator = document.getElementById("slideIndicator");
  
  if (slides.length > 0) {
    let currentSlideIndex = 0;
    let autoPlayTimer = setInterval(nextSlide, 5000); // Autoplay every 5 seconds
    
    const sliderTrack = document.getElementById("heroSliderTrack");
    
    // Set dynamic slider track layout dimensions to support swiping carousel behaviors
    if (sliderTrack) {
      sliderTrack.style.width = `${slides.length * 100}%`;
      slides.forEach(slide => {
        slide.style.width = `${100 / slides.length}%`;
      });
    }

    function updateSlider() {
      const offset = currentSlideIndex * -(100 / slides.length);
      if (sliderTrack) {
        sliderTrack.style.transform = `translateX(${offset}%)`;
      }
      
      slides.forEach((slide, idx) => {
        slide.classList.toggle("active", idx === currentSlideIndex);
      });
      if (indicator) {
        indicator.textContent = `${currentSlideIndex + 1} / ${slides.length}`;
      }
    }
    
    function nextSlide() {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      updateSlider();
    }
    
    function prevSlide() {
      currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
      updateSlider();
    }
    
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        clearInterval(autoPlayTimer);
        nextSlide();
        autoPlayTimer = setInterval(nextSlide, 5000);
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        clearInterval(autoPlayTimer);
        prevSlide();
        autoPlayTimer = setInterval(nextSlide, 5000);
      });
    }
  }

  // Check if there is a category filter in the URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get("filter");
  if (filterParam) {
    currentServiceFilter = filterParam;
  }

  // --- Scroll Reveal Animation Pipeline (Intersection Observer) ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target); // Animates once per page view
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: "0px 0px -40px 0px"
  });

  function registerScrollReveal() {
    const revealElements = document.querySelectorAll(
      ".category-card, .step-card, .faq-item, .agency-image-wrapper, .form-card, .cta-box"
    );
    revealElements.forEach(el => {
      el.classList.add("reveal-init");
      revealObserver.observe(el);
    });
  }

  // --- 1. Responsive Navbar & Scrolling Effects ---
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const isOpened = navLinks.classList.contains("active");
      menuToggle.innerHTML = isOpened 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars-staggered"></i>';
    });

    // Close nav link drawer on item click (mobile UI optimization)
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
      });
    });
  }

  // --- 2. Dynamic Service Catalogue System ---
  function renderServices() {
    if (!catalogueGrid) return;
    
    // Clear everything except the empty state element
    const cards = catalogueGrid.querySelectorAll(".service-card");
    cards.forEach(card => card.remove());

    // Filter service data array
    const filteredServices = servicesData.filter(service => {
      const matchesCategory = currentServiceFilter === "all" || service.category === currentServiceFilter;
      const matchesSearch = service.name.toLowerCase().includes(searchPhrase) || 
                            service.description.toLowerCase().includes(searchPhrase) || 
                            service.categoryLabel.toLowerCase().includes(searchPhrase);
      return matchesCategory && matchesSearch;
    });

    if (filteredServices.length === 0) {
      if (catalogueEmpty) catalogueEmpty.style.display = "block";
    } else {
      if (catalogueEmpty) catalogueEmpty.style.display = "none";
      
      filteredServices.forEach((service, idx) => {
        const card = document.createElement("div");
        card.className = "service-card";
        card.dataset.id = service.id;
        
        // Consultation-only pricing check
        const isConsultation = service.price === "Consultation";
        const priceLabelText = isConsultation ? "Pricing" : "Starting from";
        
        // Redirect to step-by-step animated brief onboarding flow
        const onboardingUrl = `brief.html?service=${service.id}`;
        
        const padVal = (idx + 1).toString().padStart(2, '0');
        
        card.innerHTML = `
          <span class="card-index">${padVal}</span>
          <div class="service-meta">
            <span class="service-cat">${service.categoryLabel}</span>
            <span class="service-timeline"><i class="fa-regular fa-clock"></i> ${service.timeline}</span>
          </div>
          <h3 class="service-name">${service.name}</h3>
          <p class="service-description">${service.description}</p>
          <div class="service-price-block">
            <span class="price-label">${priceLabelText}</span>
            <span class="price-value">${service.price}</span>
          </div>
          <div class="service-actions">
            <a href="${onboardingUrl}" class="btn btn-whatsapp btn-sm"><i class="fa-solid fa-file-signature"></i> Request</a>
            <a href="service.html?id=${service.id}" class="btn btn-secondary btn-sm">Details</a>
          </div>
        `;

        catalogueGrid.appendChild(card);
        
        // Connect to scroll reveal observer
        if (revealObserver) {
          card.classList.add("reveal-init");
          revealObserver.observe(card);
        }
      });
    }
  }

  // Pre-highlight active filter tab from query parameter on load
  if (filterTabsContainer && filterParam) {
    const activeTab = filterTabsContainer.querySelector(".filter-tab.active");
    if (activeTab) activeTab.classList.remove("active");
    const targetTab = filterTabsContainer.querySelector(`[data-filter="${filterParam}"]`);
    if (targetTab) targetTab.classList.add("active");
  }

  // Handle category selector filters
  if (filterTabsContainer) {
    filterTabsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("filter-tab")) {
        filterTabsContainer.querySelector(".filter-tab.active").classList.remove("active");
        e.target.classList.add("active");
        currentServiceFilter = e.target.dataset.filter;
        renderServices();
      }
    });
  }

  // Handle instant search input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchPhrase = e.target.value.toLowerCase().trim();
      renderServices();
    });
  }

  // --- 3. Dynamic Questionnaire Brief Generator ---
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
          <label class="form-label" for="adsLocationBrief">Target Geography / Locations *</label>
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
    // Social Media content briefs
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

    // Attach custom checkbox visual card toggling
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

  // Bind dropdown listener
  if (serviceNeededDropdown) {
    serviceNeededDropdown.addEventListener("change", (e) => {
      handleServiceChange(e.target.value);
    });
  }

  // --- 4. Interactive Portfolio Showcase System ---
  function renderPortfolio() {
    if (!portfolioGrid) return;
    portfolioGrid.innerHTML = "";
    
    const filteredPortfolio = portfolioData.filter(item => {
      return currentPortfolioFilter === "all" || item.category === currentPortfolioFilter;
    });

    filteredPortfolio.forEach(item => {
      // Create portfolio card container (div to support multiple distinct action buttons)
      const pCard = document.createElement("div");
      pCard.className = "portfolio-card";
      
      // Determine font awesome icon to display based on text tags
      let iconHtml = '<i class="fa-solid fa-sparkles"></i>';
      if (item.icon === "megaphone") iconHtml = '<i class="fa-solid fa-bullhorn"></i>';
      else if (item.icon === "leaf") iconHtml = '<i class="fa-solid fa-leaf"></i>';
      else if (item.icon === "globe") iconHtml = '<i class="fa-solid fa-earth-americas"></i>';
      else if (item.icon === "instagram") iconHtml = '<i class="fa-brands fa-instagram"></i>';
      else if (item.icon === "phone") iconHtml = '<i class="fa-solid fa-mobile-screen"></i>';
      else if (item.icon === "trending-up") iconHtml = '<i class="fa-solid fa-chart-line"></i>';
      else if (item.icon === "package") iconHtml = '<i class="fa-solid fa-box-open"></i>';

      // Determine visual style (image background vs color gradient)
      const visualStyle = item.image 
        ? `background-image: url('${item.image}'); background-size: cover; background-position: center;` 
        : `background: ${item.gradient};`;

      // Prefecture WhatsApp message for direct project request/booking
      const requestMsg = `Hello Nile Services,\nI saw your project "${item.title}" (${item.type}) in your creative showcase. I'd like to request a similar service for my brand. Please let me know what you need from my side to start!`;
      const waRedirectUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(requestMsg)}`;

      pCard.innerHTML = `
        <div class="portfolio-visual" style="${visualStyle}">
          <div class="portfolio-visual-content" style="${item.image ? 'background: rgba(9, 9, 11, 0.4);' : ''}">
            ${iconHtml}
            <span>${item.type}</span>
          </div>
        </div>
        <div class="portfolio-body" style="display: flex; flex-direction: column; height: calc(100% - 220px); justify-content: space-between;">
          <div>
            <span class="portfolio-meta-tag">${item.tag}</span>
            <h3 class="portfolio-card-title">${item.title}</h3>
            <p class="portfolio-card-desc" style="margin-bottom: 20px;">${item.description}</p>
          </div>
          <div class="portfolio-actions" style="display: grid; grid-template-columns: 1fr 1.25fr; gap: 12px; margin-top: auto; padding-top: 16px; border-top: 1px dashed var(--border-color);">
            <a href="${item.url || '#'}" target="_blank" class="btn btn-secondary btn-xs" style="text-align: center; justify-content: center; font-size: 11px; padding: 10px 0;"><i class="fa-solid fa-globe"></i> Preview</a>
            <a href="${waRedirectUrl}" target="_blank" class="btn btn-whatsapp btn-xs" style="text-align: center; justify-content: center; font-size: 11px; padding: 10px 0; animation: pulse-glow 2.5s infinite;"><i class="fa-brands fa-whatsapp"></i> Book Similar</a>
          </div>
        </div>
      `;

      portfolioGrid.appendChild(pCard);

      // Connect to scroll reveal observer
      if (revealObserver) {
        pCard.classList.add("reveal-init");
        revealObserver.observe(pCard);
      }
    });
  }

  // Handle portfolio tab selector filters
  if (portfolioTabsContainer) {
    portfolioTabsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("filter-tab")) {
        portfolioTabsContainer.querySelector(".filter-tab.active").classList.remove("active");
        e.target.classList.add("active");
        currentPortfolioFilter = e.target.dataset.portFilter;
        renderPortfolio();
      }
    });
  }

  // --- 5. FAQ Accordion Systems ---
  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-header-btn");
    const content = item.querySelector(".faq-content");
    
    if (btn && content) {
      btn.addEventListener("click", () => {
        const isAlreadyActive = item.classList.contains("active");
        
        // Close other accordion panels
        faqItems.forEach(otherItem => {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-content").style.maxHeight = null;
        });
        
        if (!isAlreadyActive) {
          item.classList.add("active");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  });

  // --- 6. Form Submission & Custom WhatsApp Encoding ---
  if (fileUploadContainer && referenceFilesInput) {
    fileUploadContainer.addEventListener("click", () => {
      referenceFilesInput.click();
    });

    referenceFilesInput.addEventListener("change", () => {
      if (referenceFilesInput.files.length > 0) {
        const fName = referenceFilesInput.files[0].name;
        fileNameDisplay.textContent = `Attached: ${fName}`;
        fileNameDisplay.style.display = "block";
      } else {
        fileNameDisplay.textContent = "";
        fileNameDisplay.style.display = "none";
      }
    });

    // Drag and drop events
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
        const fName = files[0].name;
        fileNameDisplay.textContent = `Attached: ${fName}`;
        fileNameDisplay.style.display = "block";
      }
    });
  }

  // Form Submit Handler
  if (requestForm) {
    requestForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Pull values from inputs
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

      // Generate formatted WhatsApp message
      let waMsg = `Hello Nile Services,\n`;
      waMsg += `I just submitted a project request form. Details:\n\n`;
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

      const encodedMsg = encodeURIComponent(waMsg);
      const whatsappRedirectUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

      // Show beautiful success notification
      if (successToast) successToast.classList.add("active");

      // Clear Form inputs
      requestForm.reset();
      if (fileNameDisplay) {
        fileNameDisplay.textContent = "";
        fileNameDisplay.style.display = "none";
      }
      handleServiceChange(""); // Hide dynamic brief

      // Redirect to WhatsApp after 2 seconds
      setTimeout(() => {
        if (successToast) successToast.classList.remove("active");
        window.open(whatsappRedirectUrl, "_blank");
      }, 2000);
    });
  }

  // --- Initialize Render Functions ---
  if (catalogueGrid) {
    renderServices();
  }
  if (portfolioGrid) {
    renderPortfolio();
  }
  
  // Initialize viewport animations
  registerScrollReveal();
});
