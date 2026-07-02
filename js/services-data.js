const servicesData = [
  {
    id: "logo-design",
    name: "Logo Design",
    category: "branding",
    categoryLabel: "Logo and Branding",
    price: "₦80,000",
    timeline: "7 to 10 working days",
    description: "A professional logo design for businesses that need a clean and memorable identity. We don't just deliver a single image; you receive a complete, production-ready package to build trust across all channels.",
    bestFor: [
      "New businesses launching for the first time",
      "Businesses rebranding an existing identity",
      "Small brands that want to look more professional",
      "Product-based and service-based brands"
    ],
    includes: [
      "Professional custom logo design concept",
      "Primary logo version & layout variants",
      "High-resolution transparent background (PNG) version",
      "Solid black and solid white logo variants",
      "Optimized social media / profile picture size",
      "Basic brand color palette direction",
      "Print-ready & web-ready source file formats",
      "Minor revisions after the initial draft presentation"
    ],
    note: "This is not just one image. The client gets a proper logo package they can use across their business (WhatsApp, Instagram, packaging, documents, etc.).",
    ctaText: "Request Logo Design"
  },
  {
    id: "logo-redesign",
    name: "Logo Redesign",
    category: "branding",
    categoryLabel: "Logo and Branding",
    price: "₦100,000",
    timeline: "7 to 12 working days",
    description: "For businesses that already have a logo but want it improved, modernized, or made more professional. We retain your core identity while elevating the aesthetic to look premium.",
    bestFor: [
      "Businesses with outdated or amateur logos",
      "Brands wanting a cleaner, minimalist aesthetic",
      "Companies scaling up to target higher-value clients",
      "Businesses aligning design with a new market direction"
    ],
    includes: [
      "Deep audit and review of your existing logo",
      "Modernized & refined logo concept options",
      "Main redesigned logo master files",
      "Transparent PNG, black, and white versions",
      "Optimized profile kit for social media platforms",
      "Refreshed brand color palette advice",
      "Minor revisions to ensure client satisfaction"
    ],
    ctaText: "Request Logo Redesign"
  },
  {
    id: "full-brand-identity",
    name: "Full Brand Identity",
    category: "branding",
    categoryLabel: "Logo and Branding",
    price: "₦180,000",
    timeline: "10 to 15 working days",
    description: "A complete branding package for businesses that want an absolute consistency and premium experience across their social media, website, physical products, and print materials.",
    bestFor: [
      "Businesses preparing for a major market launch",
      "Premium product, fashion, and beauty brands",
      "Corporate startups seeking VC/partner trust",
      "Brands wanting unified styling across all customer touchpoints"
    ],
    includes: [
      "Complete logo suite (primary, secondary, and submarks)",
      "Curated brand color palette (HEX, RGB, CMYK codes)",
      "Font guidelines & typography pairings",
      "Branded social media profile/avatar kit",
      "Double-sided business card design",
      "Professional letterhead design (digital/print formats)",
      "Mini brand style guide document",
      "Guidelines for logo usage and photo styles"
    ],
    ctaText: "Request Brand Identity"
  },
  {
    id: "brand-naming-slogan",
    name: "Brand Naming & Slogan",
    category: "branding",
    categoryLabel: "Logo and Branding",
    price: "₦50,000",
    timeline: "3 to 5 working days",
    description: "Strategic guidance for business owners who need a catchy, memorable, and legally clear brand name, slogan, or positioning tagline that stands out in the marketplace.",
    bestFor: [
      "New businesses in the ideation stage",
      "Startups wanting to establish a distinct voice",
      "Brands going through a name change (rebranding)",
      "Personal brands and content creators"
    ],
    includes: [
      "Market and competitor name audit",
      "A list of distinct and brandable name ideas",
      "Engaging slogan & tagline recommendations",
      "Basic brand positioning statements",
      "Clear rationale explaining the strategic direction"
    ],
    ctaText: "Request Brand Naming Help"
  },
  {
    id: "flyer-design",
    name: "Flyer Design",
    category: "graphic-design",
    categoryLabel: "Graphic Design",
    price: "₦15,000",
    timeline: "1 to 3 working days",
    description: "Clean promotional flyers specifically formatted for social media grids, WhatsApp broadcasts, and printing. Perfect for fast-paced marketing announcements.",
    bestFor: [
      "Special discounts and flash sales",
      "Upcoming events and webinar announcements",
      "Product launch announcements",
      "WhatsApp broadcast lists and status updates"
    ],
    includes: [
      "One high-impact custom flyer design",
      "Mobile-optimized aspect ratio (square or vertical/story format)",
      "Clean visual composition and text hierarchy",
      "Integration of your brand colors and logo",
      "One minor revision phase"
    ],
    ctaText: "Request Flyer Design"
  },
  {
    id: "premium-flyer-design",
    name: "Premium Flyer Design",
    category: "graphic-design",
    categoryLabel: "Graphic Design",
    price: "₦30,000",
    timeline: "2 to 4 working days",
    description: "A visually rich and highly creative flyer design. Uses custom photo placements, advanced typography, and meticulous layouts to capture attention instantly.",
    bestFor: [
      "Premium product releases",
      "Paid Instagram, Facebook, or TikTok ad campaigns",
      "High-end corporate or lifestyle events",
      "Core seasonal brand campaigns"
    ],
    includes: [
      "Premium, bespoke layout concepts",
      "Advanced photo/product placement and basic retouching",
      "High-definition social media format",
      "WhatsApp status optimized version",
      "Up to two minor revisions"
    ],
    ctaText: "Request Premium Flyer"
  },
  {
    id: "company-profile-design",
    name: "Company Profile Design",
    category: "graphic-design",
    categoryLabel: "Graphic Design",
    price: "₦150,000",
    timeline: "7 to 10 working days",
    description: "A professionally structured corporate profile document to showcase your history, capabilities, services, and team. Perfect for pitches and partnerships.",
    bestFor: [
      "Established corporate brands and agencies",
      "Service businesses pitching to corporate clients",
      "NGOs, schools, and real estate developers",
      "Startups applying for government contracts or large partnerships"
    ],
    includes: [
      "Structured layout custom-tailored to your brand style",
      "Clean page designs (Cover, About, Mission/Vision, Services, Team, Contact)",
      "High-quality typography and graphical layouts",
      "Corporate image integration",
      "Delivery in web-ready and print-ready PDF formats"
    ],
    ctaText: "Request Company Profile"
  },
  {
    id: "pitch-deck-design",
    name: "Pitch Deck / Proposal Design",
    category: "graphic-design",
    categoryLabel: "Graphic Design",
    price: "₦120,000",
    timeline: "5 to 10 working days",
    description: "High-end presentation slide design for raising investor funds, pitching big clients, proposing sponsorships, or presenting internal business strategies.",
    bestFor: [
      "Startups preparing to pitch to investors or VC funds",
      "Agencies proposing retainer services to brands",
      "Event organizers seeking corporate sponsors",
      "Business consultants presenting strategies"
    ],
    includes: [
      "Custom slide design matches your brand aesthetic",
      "Layout optimization for up to agreed slide count",
      "Data visualization, charts, and clean info-graphics styling",
      "Delivery in presentation PDF & editable PowerPoint/Canva files",
      "Minor post-presentation revisions"
    ],
    ctaText: "Request Pitch Deck"
  },
  {
    id: "product-catalogue-design",
    name: "Product Catalogue Design",
    category: "graphic-design",
    categoryLabel: "Graphic Design",
    price: "₦120,000",
    timeline: "5 to 10 working days",
    description: "A beautifully organized digital catalog to showcase your product collections, complete with descriptions, specifications, pricing, and high-quality image spreads.",
    bestFor: [
      "Fashion and clothing boutique brands",
      "Beauty, skincare, and cosmetics businesses",
      "Furniture and homeware vendors",
      "Wholesalers and manufacturers sharing pricing guides"
    ],
    includes: [
      "Professional multi-page document layout template",
      "Clean product image arrangement and price displays",
      "Category separation pages",
      "Optimized web-friendly PDF format for easy sharing via WhatsApp/Email",
      "Social-ready sharing snippets"
    ],
    ctaText: "Request Product Catalogue"
  },
  {
    id: "social-media-pack",
    name: "Social Media Design Pack",
    category: "social-media",
    categoryLabel: "Social Media Content",
    price: "₦60,000",
    timeline: "5 to 7 working days",
    description: "A pack of highly engaging, custom-branded post templates designed to make your social media feed look modern, uniform, and professional.",
    bestFor: [
      "Instagram grids and Facebook feeds",
      "New business launches looking to make an impression",
      "Online vendors announcing monthly promotions",
      "Service businesses sharing educational carousel content"
    ],
    includes: [
      "10 custom-designed, branded social media post templates",
      "Simple caption hooks and copy structure recommendation",
      "Optimized format for Instagram/Facebook square and portrait grids",
      "Consistent application of brand colors and typography rules",
      "Minor revisions to layout designs"
    ],
    ctaText: "Request Social Media Pack"
  },
  {
    id: "monthly-content-design",
    name: "Monthly Content Design",
    category: "social-media",
    categoryLabel: "Social Media Content",
    price: "₦120,000/month",
    timeline: "Monthly retainer",
    description: "Consistent monthly design support to feed your pages with premium branded content, helping you maintain top-of-mind awareness without design stress.",
    bestFor: [
      "Active online sellers and retail brands",
      "Beauty salons, hair vendors, and food outlets",
      "Professional service providers sharing daily tips",
      "Busy business owners who want consistency handled by pros"
    ],
    includes: [
      "20 premium social media graphic designs per month",
      "Tailored post captions matching your voice",
      "Simple monthly content calendar map",
      "Core themes (Promo, Value, Behind-the-Scenes, Customer Love)",
      "Ready-to-publish files sent directly to you"
    ],
    ctaText: "Request Monthly Content"
  },
  {
    id: "content-calendar-captions",
    name: "Content Calendar & Captions",
    category: "social-media",
    categoryLabel: "Social Media Content",
    price: "₦50,000",
    timeline: "3 to 5 working days",
    description: "A practical, 30-day strategy plan mapping out exactly what to post, what format to use, and pre-written captions to boost engagement and sales.",
    bestFor: [
      "Business owners who struggle with 'what to write today'",
      "In-house social media managers looking for fresh ideas",
      "Brands wanting structure for their organic traffic",
      "E-commerce vendors looking to convert followers"
    ],
    includes: [
      "Complete 30-day visual content calendar",
      "30 copy-pasteable captions with hashtags and CTAs",
      "Content categorization (Educational, Promotional, Interactive)",
      "Posting frequency and timing recommendations",
      "Story and Reels prompts and ideation"
    ],
    ctaText: "Request Content Calendar"
  },
  {
    id: "social-media-setup",
    name: "Social Media Setup & Optimization",
    category: "social-media",
    categoryLabel: "Social Media Content",
    price: "₦50,000",
    timeline: "2 to 5 working days",
    description: "Make a killer first impression. We structure or audit your social pages so visitors immediately understand what you sell, where you are, and how to buy.",
    bestFor: [
      "Newly registered businesses setting up profiles",
      "Instagram/TikTok pages with high traffic but low follower conversion",
      "Local service companies seeking local discovery",
      "Personal brands trying to showcase authority"
    ],
    includes: [
      "Professional, optimized bio writing with strong CTAs",
      "Highlight cover branding & folder organization layout",
      "Action buttons setup (WhatsApp link, email, call)",
      "Link-in-bio landing page setup (Linktree, Nile, etc.)",
      "Profile photo and banner layout recommendations",
      "Page improvement diagnostic checklist"
    ],
    ctaText: "Optimize My Page"
  },
  {
    id: "video-scriptwriting",
    name: "Video & Ad Script Writing",
    category: "media",
    categoryLabel: "Media and Production",
    price: "₦30,000",
    timeline: "1 to 3 working days",
    description: "High-converting scripts designed to hook viewers in the first 3 seconds, explain your product value, and drive them to take immediate action.",
    bestFor: [
      "TikTok videos, Instagram Reels, and YouTube Shorts",
      "Founder backstory videos and business introduction videos",
      "Paid advertising videos (Meta, TikTok)",
      "New product launch demo clips"
    ],
    includes: [
      "Attention-grabbing hook variations (First 3 seconds)",
      "Core script body (Problem, Solution, Value prop)",
      "Strong call-to-action suggestions",
      "Visual direction notes (what to show on screen)",
      "Ready-to-record formatting"
    ],
    ctaText: "Request Video Script"
  },
  {
    id: "ad-creative-design",
    name: "Ad Creative Design",
    category: "ads-campaigns",
    categoryLabel: "Ads and Campaigns",
    price: "₦35,000",
    timeline: "2 to 4 working days",
    description: "High-performance graphic layouts built specifically for paid ad algorithms. We optimize text-to-image ratios to prevent ad rejections and boost click rates.",
    bestFor: [
      "Meta (Facebook/Instagram) paid ads",
      "Google Display network banners",
      "TikTok ad cover designs",
      "Retargeting campaigns with high-intent offers"
    ],
    includes: [
      "Paid ad-optimized visual graphic assets",
      "Ad copy hook variation ideas for the ad description",
      "Clear call-to-action text overlay design",
      "Formats optimized for Feed and Story placements",
      "One round of minor refinements"
    ],
    ctaText: "Request Ad Creative"
  },
  {
    id: "meta-ads-setup",
    name: "Meta Ads Setup",
    category: "ads-campaigns",
    categoryLabel: "Ads and Campaigns",
    price: "₦100,000",
    timeline: "3 to 5 working days",
    description: "Get your ad campaigns structured right from day one. We set up your target audience, tracking pixels, budgets, and launch your initial campaign set.",
    bestFor: [
      "Businesses launching Facebook/Instagram ads for the first time",
      "Brands wanting to run leads, WhatsApp messages, or website sale campaigns",
      "Local physical stores targeting nearby areas",
      "Business owners overwhelmed by the Meta Ads Manager panel"
    ],
    includes: [
      "Campaign objective alignment session",
      "Detailed custom audience and interest targeting settings",
      "Ad copy variations setup",
      "Ad account setup & configuration check",
      "Launch monitoring support (first 48 hours)",
      "Budget optimization guidance"
    ],
    note: "Ad spend/budget is separate and paid directly to Meta. The starting price covers setup and service fees only.",
    ctaText: "Request Meta Ads Setup"
  },
  {
    id: "monthly-ads-management",
    name: "Monthly Ads Management",
    category: "ads-campaigns",
    categoryLabel: "Ads and Campaigns",
    price: "₦150,000/month",
    timeline: "Monthly retainer",
    description: "We handle the daily optimization of your advertising budget, constantly A/B testing copy, creatives, and target audiences to lower your acquisition costs.",
    bestFor: [
      "E-commerce brands seeking consistent daily orders",
      "Service providers needing a steady stream of leads",
      "Businesses spending over ₦100,000/month on ad platforms",
      "Brands looking to scale their customer acquisition"
    ],
    includes: [
      "Daily tracking and budget optimization",
      "Continuous A/B testing of creatives, text hooks, and custom audiences",
      "Ad creative refresh advice to prevent ad fatigue",
      "Monthly campaign ROI and analytics reporting",
      "Strategic alignment for the next month's offers"
    ],
    note: "Ad spend/budget is separate from the management fee.",
    ctaText: "Request Ads Management"
  },
  {
    id: "campaign-strategy",
    name: "Campaign Strategy",
    category: "ads-campaigns",
    categoryLabel: "Ads and Campaigns",
    price: "₦100,000",
    timeline: "3 to 7 working days",
    description: "A complete launch blueprint outlining the messaging angles, promotion mechanics, ad structures, and timelines for a seasonal sale or product release.",
    bestFor: [
      "Brands launching a new collection or store",
      "Businesses planning Black Friday or seasonal holiday sales",
      "Startups announcing a new funding round or service",
      "Companies wanting a concrete roadmap before spending on ads"
    ],
    includes: [
      "Clear campaign goal definition",
      "Target customer profiles and emotional angles",
      "Sales offer structuring (e.g. bundles, discount codes)",
      "Content/ad creative framework recommendations",
      "Cross-channel posting schedule (Organic + Paid)",
      "Call-to-action suggestions"
    ],
    ctaText: "Request Campaign Strategy"
  },
  {
    id: "website-setup-support",
    name: "Website Setup Support",
    category: "websites",
    categoryLabel: "Websites and Landing Pages",
    price: "₦50,000",
    timeline: "2 to 5 working days",
    description: "Get expert assistance configuring your Nile store or custom domain. We help upload catalog assets, configure payment/delivery flows, and launch clean pages.",
    bestFor: [
      "Existing Nile website merchants wanting optimization",
      "Store owners with unfinished websites",
      "E-commerce brands needing help with bulk inventory uploads",
      "Businesses wanting custom layouts without coding headaches"
    ],
    includes: [
      "Configuration support for products, price variants, and descriptions",
      "Design direction for homepage banners",
      "Arrangement of collections & navigation menus",
      "Payment gateway configuration guidance (Paystack, Flutterwave, etc.)",
      "Delivery zones & shipping charges setup guidance",
      "Mobile checkout layout & ordering path review"
    ],
    ctaText: "Request Website Setup"
  },
  {
    id: "website-audit",
    name: "Website Audit",
    category: "websites",
    categoryLabel: "Websites and Landing Pages",
    price: "₦50,000",
    timeline: "2 to 4 working days",
    description: "A detailed review highlighting speed issues, confusing checkout paths, layout errors, and poor copywriting that are causing visitors to drop off without buying.",
    bestFor: [
      "Websites getting high traffic but zero sales",
      "E-commerce stores wanting to improve average order value",
      "Service businesses with high bounce rates",
      "Nile merchants checking for bugs before running ad campaigns"
    ],
    includes: [
      "Homepage user experience (UX) evaluation",
      "Product presentation and detail page analysis",
      "Checkout friction check (cart, checkout, payment fields)",
      "Mobile layout responsiveness check",
      "Trust factors, testimonials, and FAQ alignment check",
      "Detailed actionable list of fixes to double conversion"
    ],
    ctaText: "Audit My Website"
  },
  {
    id: "custom-landing-page",
    name: "Custom Landing Page",
    category: "websites",
    categoryLabel: "Websites and Landing Pages",
    price: "₦250,000",
    timeline: "7 to 14 working days",
    description: "A single-page marketing website built specifically to drive leads or sales for a specific product, event, course, or service campaign.",
    bestFor: [
      "Promoting digital courses or physical workshops",
      "Pre-launch signups / waitlists for upcoming products",
      "Lead generation for high-ticket service companies",
      "Dedicated landing pages for paid Google or Meta ads"
    ],
    includes: [
      "Stripe-style custom visual landing page",
      "Fully responsive mobile and desktop layouts",
      "Strategic structure: Hero, Features, Social Proof, FAQ, Lead Form",
      "Copywriting layout support",
      "Contact form and lead capture system integration",
      "Deployment setup on your domain"
    ],
    ctaText: "Request Landing Page"
  },
  {
    id: "custom-website",
    name: "Custom Website Development",
    category: "websites",
    categoryLabel: "Websites and Landing Pages",
    price: "₦500,000",
    timeline: "2 to 6 weeks",
    description: "A bespoke corporate, booking, or catalog website custom-developed from the ground up to support your specific business model and design preferences.",
    bestFor: [
      "Companies wanting custom booking systems or client portals",
      "Real estate agencies, schools, NGOs, and travel operators",
      "High-end brands wanting to stand out from stock themes",
      "Restaurants seeking direct interactive menus"
    ],
    includes: [
      "UI/UX layout prototype mapping",
      "Responsive custom web development",
      "Static pages (Home, About, Services, Contact, Blog/News, FAQ)",
      "Contact and booking form database integration",
      "Basic on-page SEO setup (meta tags, sitemap, speed check)",
      "Client training walkthrough for content changes"
    ],
    ctaText: "Request Custom Website"
  },
  {
    id: "app-development",
    name: "Mobile & Web App Development",
    category: "apps",
    categoryLabel: "Apps and Software",
    price: "Consultation",
    timeline: "Custom based on scope",
    description: "Enterprise-grade web portals, custom admin panels, mobile apps, and SaaS platforms built using robust backend architectures and sleek UI designs.",
    bestFor: [
      "Startups building MVP software for funding",
      "Logistics, delivery, and booking platforms",
      "Fintech startups, custom portals, and marketplace builders",
      "Businesses seeking custom software to automate internal processes"
    ],
    includes: [
      "Technical requirement spec sheet mapping",
      "Interactive UI/UX wireframes (Figma)",
      "Frontend client dashboard development",
      "Backend database and API structures",
      "Third-party software integrations (payment, SMS, maps)",
      "Comprehensive staging quality testing",
      "Production deployment and handover"
    ],
    note: "Final pricing and timeline depend heavily on the project scope and specification checklist.",
    ctaText: "Request App Development"
  },
  {
    id: "photography-direction",
    name: "Product Photography Direction",
    category: "media",
    categoryLabel: "Media and Production",
    price: "₦100,000",
    timeline: "Based on shoot scope",
    description: "Creative direction and planning to ensure your product photos look premium, on-brand, and optimized for website grids, catalogs, and paid ad displays.",
    bestFor: [
      "Skincare, cosmetics, and hair vendor brands",
      "Fashion apparel and accessory brands",
      "Food delivery menus and restaurant catalogs",
      "Product brands preparing assets for website launch"
    ],
    includes: [
      "Creative concept planning and visual storyboard",
      "Detailed shot list mapping angles and props",
      "Arrangement and styling direction advice",
      "Digital mood board reflecting color and lighting guidelines",
      "Model styling and location proposal recommendations"
    ],
    note: "Full shoot cost (photographer, location, models, props) is paid separately by the client.",
    ctaText: "Request Photography Direction"
  },
  {
    id: "product-mockup",
    name: "Product Mockup Design",
    category: "media",
    categoryLabel: "Media and Production",
    price: "₦50,000",
    timeline: "2 to 5 working days",
    description: "High-quality 3D digital mockups of your products, packaging boxes, bottles, labels, or digital interfaces to show how they look in real life.",
    bestFor: [
      "Physical product sellers seeking premium catalog graphics",
      "E-commerce websites showing packaging previews",
      "Software brands presenting UI screens inside phone/laptop mockups",
      "Pre-sales and crowdsourcing campaign visuals"
    ],
    includes: [
      "Custom 3D product mockup layout",
      "Premium texture and lighting reflection effects",
      "Social-media ready high-resolution outputs",
      "One round of revision to align visual styling"
    ],
    ctaText: "Request Product Mockup"
  },
  {
    id: "packaging-design",
    name: "Packaging & Label Design",
    category: "branding",
    categoryLabel: "Logo and Branding",
    price: "₦100,000",
    timeline: "7 to 10 working days",
    description: "Premium packaging, box, bottle, jar, or sticker label design layout. We structure file layouts to match print shop specifications perfectly.",
    bestFor: [
      "Skincare, cosmetics, and beauty vendors",
      "Food, snacks, beverages, and health supplement brands",
      "Retail brands wanting premium shipping box designs",
      "E-commerce vendors building custom unboxing experiences"
    ],
    includes: [
      "Creative packaging concept styling",
      "Dieline sizing adaptation (fits print templates)",
      "Print-ready vectors and packaging layout files",
      "Brand color usage and layout typography hierarchy",
      "Up to two design adjustments"
    ],
    ctaText: "Request Packaging Design"
  },
  {
    id: "business-consultation",
    name: "Business Consultation",
    category: "consultation",
    categoryLabel: "Business Consultation",
    price: "₦50,000/session",
    timeline: "60 minutes",
    description: "A focused 1-on-1 strategy call with our growth specialists to clarify your brand messaging, website conversion funnel, marketing budget, or app architecture.",
    bestFor: [
      "Aspiring business owners needing a launch roadmap",
      "Active sellers experiencing low customer conversions",
      "Startups planning custom platforms wanting advice",
      "Brands planning their advertising budgets"
    ],
    includes: [
      "60-minute private consultation session (Google Meet/Zoom)",
      "In-depth discussion covering Brand, Web, Ads, or Funnel Strategy",
      "Diagnostic review of your current web assets / pages",
      "Actionable recap notes detailing the recommended roadmap",
      "Follow-up resource links"
    ],
    ctaText: "Book Consultation"
  },
  {
    id: "business-plan-doc",
    name: "Business Plan / Strategy Doc",
    category: "consultation",
    categoryLabel: "Business Consultation",
    price: "₦180,000",
    timeline: "7 to 14 working days",
    description: "A professional, structured strategy document detailing your market positioning, revenue channels, operational map, and marketing blueprint.",
    bestFor: [
      "Startups pitching to potential partners or early-stage investors",
      "Entrepreneurs applying for bank loans or grants",
      "Brands undergoing restructure seeking clarity",
      "Teams needing a unified strategic guide"
    ],
    includes: [
      "Executive overview layout",
      "Target customer & market competitor analysis",
      "Revenue generation framework mapping",
      "Marketing and customer acquisition blueprint",
      "Operational structure outline",
      "Delivery in a premium formatted PDF document"
    ],
    ctaText: "Request Business Plan"
  }
];
