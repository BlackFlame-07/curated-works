export interface BentoItem {
  image: string;
  title: string;
  colSpan?: string;
  caption?: string;
  aspectRatio?: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface KeyMetric {
  value: string;
  label: string;
}

export interface ScopeDeliverable {
  title: string;
  description: string;
  deliverables: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  client: string;
  year: string;
  timeline: string;
  role: string;
  category: string;
  featured: boolean;
  coverImage: string;
  heroImage: string;
  services: string[];
  tags: string[];
  liveUrl?: string;
  overview: string;
  challenge: string;
  solution: string;
  result: string;
  keyMetrics: KeyMetric[];
  scopeItems: ScopeDeliverable[];
  bentoGallery: BentoItem[];
  testimonial?: ProjectTestimonial;
  techStack: string[];
}

export const projectsData: Project[] = [
  {
    id: "01",
    slug: "fitcheck",
    title: "FitCheck",
    subtitle: "Mobile Virtual Try-On & Fit Confidence App",
    tagline: "Turning dressing room anxiety into instant checkout confidence with tactile visual sizing.",
    client: "FitCheck App",
    year: "2025",
    timeline: "4 Weeks",
    role: "Lead Product Designer & UX Strategist",
    category: "Mobile App & Product Design",
    featured: true,
    coverImage: "/optimized/FitCheck-Display-Image.webp",
    heroImage: "/optimized/FitCheck-Display-Image.webp",
    services: [
      "UI/UX Design",
      "Prototyping & Interaction Design",
      "Design Systems & Tokens"
    ],
    tags: ["Mobile App", "Virtual Try-On", "E-Commerce UX", "Product Design", "iOS & Android"],
    liveUrl: "https://fitcheck.example.com",
    overview: "FitCheck is a mobile fashion shopping app engineered with an instant virtual try-on engine. We designed a distraction-free onboarding flow, visual fabric drape previews, and a 1-tap checkout experience that stops shoppers from abandoning their carts.",
    challenge: "<p>Buying clothes online is fun right up until you have to guess your size. FitCheck had built a genuinely clever virtual try-on engine, but the interface felt like an intimidating CAD tool.</p><p>Shoppers hesitated, second-guessed the sizing charts, and left their carts behind. The consequence? A 34% drop-off rate at checkout and retail partners drowning in expensive return shipping.</p>",
    solution: "<p>We rebuilt the product around reassurance. Instead of asking customers to decipher size charts, we showed them exactly how clothes drape on their body shape.</p><ul><li><strong>Visual try-on in 2 taps:</strong> Shoppers see realistic fabric drape and cut proportions before pulling out their credit card.</li><li><strong>Zero-friction checkout:</strong> Sizing suggestions appear directly on the product card without multi-step questionnaires.</li><li><strong>Clear return avoidance:</strong> Gentle, reassuring fit cues that take the guesswork out of buying on mobile.</li></ul>",
    result: "<ul><li><strong>+28%</strong> lift in mobile checkout completion rate</li><li><strong>-36%</strong> reduction in size-related return requests</li><li><strong>4.8 ★</strong> average app store rating across early customer cohorts</li></ul>",
    keyMetrics: [
      { value: "+28%", label: "Checkout Completion Lift" },
      { value: "-36%", label: "Size-Related Returns" },
      { value: "4.8 ★", label: "App Store User Rating" },
      { value: "< 3s", label: "Virtual Try-On Render Speed" }
    ],
    scopeItems: [
      {
        title: "Shopper Research & Flow Fixes",
        description: "Finding the exact friction points where shoppers hesitated over sizing charts and abandoned their shopping carts.",
        deliverables: [
          "Screen-by-screen checkout audit",
          "Simpler 3-step onboarding flow",
          "Sizing recommendation logic",
          "Cart drop-off reduction guide"
        ]
      },
      {
        title: "Fitting Room UI & Clickable Prototype",
        description: "Designing clear dressing room screens so customers can preview garment fit and fabric drape in two taps.",
        deliverables: [
          "Full clickable Figma prototype",
          "Interactive garment preview canvas",
          "Clean size indicator cards",
          "Smooth micro-animations for mobile"
        ]
      },
      {
        title: "Developer Guidelines & Ready Components",
        description: "Packaging every screen, button, and spacing token so developers could build the app without guesswork.",
        deliverables: [
          "Ready-to-code component library",
          "iOS and Android screen specs",
          "Clean icon and asset package",
          "Handoff quality checklist"
        ]
      }
    ],
    bentoGallery: [
      {
        image: "/optimized/ChatGPT-Image-Aug-26_-2026_-04_14_06-PM.webp",
        title: "Virtual Try-On Canvas",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "Real-time garment draping and silhouette preview interface",
        aspectRatio: "1086 / 1448"
      },
      {
        image: "/optimized/ChatGPT-Image-Aug-26_-2026_-04_13_46-PM.webp",
        title: "Instant Fit Detection",
        colSpan: "col-span-4 lg:col-span-2",
        caption: "Smart silhouette fit calculation and instant garment preview",
        aspectRatio: "1086 / 1448"
      },
      {
        image: "/optimized/ChatGPT-Image-Aug-26_-2026_-04_15_33-PM.webp",
        title: "Saved Wardrobe & Try-On History",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "Personalized style curation and fit recommendation canvas",
        aspectRatio: "1122 / 1402"
      },
      {
        image: "/optimized/17873954654082.webp",
        title: "Interactive Dressing Room",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "Seamless garment preview before cart addition",
        aspectRatio: "2288 / 1824"
      },
      {
        image: "/optimized/ChatGPT-Image-Aug-21_-2026_-09_15_48-AM.webp",
        title: "Fit Confidence Score",
        colSpan: "col-span-4 lg:col-span-2",
        caption: "Clear, plain-English sizing feedback without technical charts",
        aspectRatio: "1182 / 1330"
      },
      {
        image: "/optimized/ChatGPT-Image-Aug-21_-2026_-09_15_18-AM-_1_.webp",
        title: "Style Community Feed",
        colSpan: "col-span-4 lg:col-span-2",
        caption: "Curated creator looks with 1-tap virtual try-on",
        aspectRatio: "1536 / 1024"
      }
    ],
    testimonial: {
      quote: "Saif took our technical sizing engine and turned it into an interface our customers actually enjoy using. Return inquiries dropped in weeks and our checkout numbers climbed immediately.",
      author: "Marcus Vance",
      role: "Co-Founder & CEO",
      company: "FitCheck Technologies"
    },
    techStack: ["Figma", "React Native", "TailwindCSS", "Framer Motion", "Supabase"]
  },
  {
    id: "02",
    slug: "clinod",
    title: "Clinod",
    subtitle: "All-in-One Patient Booking & Clinical Workflow Dashboard",
    tagline: "Helping busy medical practices manage bookings, patient progress, and automated follow-ups without administrative burnout.",
    client: "Clinod Health Systems",
    year: "2024",
    timeline: "5 Weeks",
    role: "Lead Healthcare UX & Systems Specialist",
    category: "Practice Management & Clinic Operations Dashboard",
    featured: true,
    coverImage: "/optimized/ChatGPT-Image-Aug-22_-2026_-01_21_14-PM.webp",
    heroImage: "/optimized/ChatGPT-Image-Aug-22_-2026_-01_21_14-PM.webp",
    services: [
      "Product & UI/UX Design",
      "Healthcare Dashboard Architecture",
      "Design Systems & Tokenization",
      "Workflow Simplification"
    ],
    tags: ["HealthTech", "Clinic Dashboard", "Patient Booking", "Workflow UX", "SaaS"],
    liveUrl: "https://clinod.example.com",
    overview: "Clinod is a clinical practice management dashboard designed for doctors and clinic receptionists. We designed a high-efficiency schedule grid, real-time patient progress trackers, and automated follow-up pipelines that eliminate hours of front-desk chaos.",
    challenge: "<p>Running a private clinic is chaotic enough without software fighting your staff. Clinod's backend was packed with medical features, but doctors and receptionists were juggling four different screens just to check in a patient, log visit notes, and schedule a follow-up.</p><p>When clinical software is cluttered, appointment slots get missed, patient records get delayed, and staff burn out on repetitive admin work.</p>",
    solution: "<p>We consolidated their fragmented workflows into a clean, single-screen patient cockpit built for speed and calm focus.</p><ul><li><strong>30-second patient check-in:</strong> Quick-search patient profiles with immediate access to appointment history and upcoming care plans.</li><li><strong>Timeline progress tracker:</strong> Visual patient health cards showing treatment milestones, visit notes, and medication updates at a glance.</li><li><strong>Automated follow-up pipeline:</strong> Built-in WhatsApp and SMS reminder triggers that dramatically cut down patient no-shows.</li></ul>",
    result: "<ul><li><strong>-45%</strong> reduction in daily administrative logging time for front-desk staff</li><li><strong>-31%</strong> drop in patient appointment no-shows within 60 days</li><li><strong>99.2%</strong> on-time consultation flow across partner clinics</li></ul>",
    keyMetrics: [
      { value: "-45%", label: "Admin Logging Time" },
      { value: "-31%", label: "Appointment No-Shows" },
      { value: "99.2%", label: "On-Time Consultation Flow" },
      { value: "< 2m", label: "Front-Desk Staff Onboarding" }
    ],
    scopeItems: [
      {
        title: "Front-Desk Workflow Audit",
        description: "Observing real receptionists and doctors during busy clinic mornings to cut out repetitive paperwork and wasted clicks.",
        deliverables: [
          "Check-in time breakdown",
          "Patient booking flow redesign",
          "Clean screen navigation map",
          "Privacy-safe record layouts"
        ]
      },
      {
        title: "Single-Screen Patient Dashboard",
        description: "Designing a calm, high-efficiency desktop interface where staff can manage schedules, check-ins, and doctor notes in one place.",
        deliverables: [
          "Quick-access patient overview screen",
          "Color-coded appointment calendar",
          "Treatment timeline & visit notes",
          "Automated WhatsApp and SMS reminders"
        ]
      },
      {
        title: "Frontend System & Component Code",
        description: "Delivering responsive UI specifications and reusable dashboard components so developers could ship without bugs.",
        deliverables: [
          "Modern UI component library",
          "Desktop and tablet screen layouts",
          "Fast table filters and search states",
          "Developer implementation guide"
        ]
      }
    ],
    bentoGallery: [
      {
        image: "/optimized/ChatGPT-Image-Aug-22_-2026_-01_21_14-PM.webp",
        title: "Patient Cockpit & Booking Schedule",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "Live clinic dashboard tracking daily appointments, patient check-ins, and follow-ups",
        aspectRatio: "1254 / 1254"
      },
      {
        image: "/optimized/ChatGPT-Image-Aug-22_-2026_-04_42_06-PM.webp",
        title: "Quick-Access Patient Profile",
        colSpan: "col-span-4 lg:col-span-2",
        caption: "Instant view of treatment history, medication logs, and doctor notes",
        aspectRatio: "1122 / 1402"
      },
      {
        image: "/optimized/17874013837d71.webp",
        title: "Appointment Management Ecosystem",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "Comprehensive booking schedule and patient queue management",
        aspectRatio: "2352 / 1760"
      },
      {
        image: "/optimized/ChatGPT-Image-Aug-22_-2026_-06_10_24-PM.webp",
        title: "Doctor Daily Schedule & Follow-Ups",
        colSpan: "col-span-4 lg:col-span-2",
        caption: "One-tap appointment updates and automated patient reminder triggers",
        aspectRatio: "1024 / 1536"
      },
      {
        image: "/optimized/178740156130f0.webp",
        title: "Patient Progress Tracker",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "Treatment timeline showing consultation outcomes and upcoming checkups",
        aspectRatio: "2352 / 1760"
      },
      {
        image: "/optimized/ChatGPT-Image-Aug-22_-2026_-06_29_18-PM.webp",
        title: "Prescription & Follow-Up Hub",
        colSpan: "col-span-4 lg:col-span-2",
        caption: "Digital prescription records with integrated follow-up status",
        aspectRatio: "1254 / 1254"
      },
      {
        image: "/optimized/178720370955eb.webp",
        title: "Mobile Clinic Companion",
        colSpan: "col-span-4 lg:col-span-2",
        caption: "Responsive mobile views for doctors reviewing schedules on the go",
        aspectRatio: "1632 / 2544"
      }
    ],
    testimonial: {
      quote: "Our front desk staff used to stay an hour late just catching up on paperwork and follow-up calls. Saif turned Clinod into a clean, intuitive cockpit that keeps our practice running on time with zero headaches.",
      author: "Dr. Alistair Thorne, MD",
      role: "Medical Director",
      company: "Clinod Health Systems"
    },
    techStack: ["React", "TypeScript", "TailwindCSS", "shadcn/ui", "PostgreSQL", "Vite"]
  },
  {
    id: "03",
    slug: "dhruv-hadke",
    title: "Dhruv Hadke's Portfolio",
    subtitle: "Video Editor & Creative Motion Portfolio",
    tagline: "Turning high-impact video editing into an irresistible client magnet for YouTube creators and commercial brands.",
    client: "Dhruv Hadke (Video Editor)",
    year: "2024",
    timeline: "3 Weeks",
    role: "Lead Digital Architect & Interaction Designer",
    category: "Creative Portfolio & Video Showcase",
    featured: true,
    coverImage: "/optimized/dhruv-portfolio-display-image.webp",
    heroImage: "/optimized/dhruv-portfolio-display-image.webp",
    services: [
      "Creative Direction",
      "Interactive Portfolio Design",
      "Motion Design & Micro-Interactions",
      "High-Performance Web Engineering"
    ],
    tags: ["Portfolio", "Video Editor", "Motion Design", "Creator Economy", "Dark Mode Web"],
    liveUrl: "https://dhruvhadke.example.com",
    overview: "Dhruv Hadke is a video editor producing fast-paced YouTube storytelling and commercial brand films. We designed a monolithic, dark-mode portfolio website with zero playback lag, bold typography, and an inquiry flow that filters for serious, high-budget creative commissions.",
    challenge: "<p>Video editors have about five seconds to convince a creator or agency to hire them. Dhruv's pacing and sound design were elite, but his previous portfolio was buried behind sluggish Vimeo embeds and a generic Linktree.</p><p>High-paying YouTube creators and brand directors were clicking away before they even reached his best retention edits.</p>",
    solution: "<p>We built a cinematic, fluid portfolio designed to put his editing reel front and center with zero waiting.</p><ul><li><strong>Instant zero-lag video showcases:</strong> Optimized high-bitrate video previews that load immediately without buffering or third-party player branding.</li><li><strong>Pacing & genre breakdown:</strong> Clean categorization of long-form storytelling, retention-driven shorts, and brand commercials.</li><li><strong>Frictionless inquiry CTA:</strong> A 2-field project brief form that screens for budget, timeline, and project scope upfront.</li></ul>",
    result: "<ul><li><strong>3.4x</strong> increase in qualified inbound inquiries from top creators</li><li><strong>+52%</strong> longer average session watch time on visual showreels</li><li><strong>Zero buffering</strong> across global CDN edge delivery on mobile</li></ul>",
    keyMetrics: [
      { value: "3.4x", label: "Inbound Inquiry Lift" },
      { value: "84s", label: "Average Showreel Watch Time" },
      { value: "+52%", label: "Session Engagement Duration" },
      { value: "100%", label: "Clean Mobile Playback" }
    ],
    scopeItems: [
      {
        title: "Showreel Strategy & Story Arc",
        description: "Reviewing Dhruv's client projects to put his best, highest-energy video cuts front and center where directors see them first.",
        deliverables: [
          "Work curation and project hierarchy",
          "Video category breakdown (Reels vs. Long-form)",
          "Custom typography and dark aesthetic",
          "Direct inquiry flow for high-paying clients"
        ]
      },
      {
        title: "Portfolio Web Design & Motion",
        description: "Designing a sleek, cinema-inspired portfolio with fluid hover states, custom cursor physics, and instant video modals.",
        deliverables: [
          "Desktop and mobile portfolio designs",
          "Smooth custom cursor interactions",
          "Zero-buffer video popups",
          "Quick project inquiry form"
        ]
      },
      {
        title: "Fast Web Build & Media Tuning",
        description: "Coding a lightweight, responsive site that streams high-resolution video showreels without slowing down or stuttering.",
        deliverables: [
          "Complete React and Vite codebase",
          "Video compression for fast mobile loading",
          "Cross-device responsiveness testing",
          "Domain and live launch setup"
        ]
      }
    ],
    bentoGallery: [
      {
        image: "/optimized/dhruv-portfolio-image-1.webp",
        title: "Dhruv Hadke Portfolio Interface",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "Dark-mode editorial showcase highlighting video editing showreels and commercial cuts",
        aspectRatio: "1122 / 1402"
      },
      {
        image: "/optimized/dhruv-portfolio-image-2.webp",
        title: "Pacing & Retention Showcase",
        colSpan: "col-span-4 lg:col-span-2",
        caption: "Clean categorization of long-form creator edits and commercial reels",
        aspectRatio: "1145 / 1374"
      },
      {
        image: "/optimized/dhruv-portfolio-video-1.gif",
        title: "Live Motion Walkthrough",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "Fluid 60fps kinetic interaction and responsive showcase transitions",
        aspectRatio: "1280 / 720"
      },
      {
        image: "/optimized/dhruv-portfolio-display-image.webp",
        title: "Monolithic Editorial Web Spread",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "Bespoke digital monograph layout commanding creative respect",
        aspectRatio: "1672 / 941"
      }
    ],
    testimonial: {
      quote: "Before this site, I was pitching YouTube creators by sending Google Drive links. Now, my portfolio does the selling before I even jump on a call. It immediately commands respect and brought me better-paying clients.",
      author: "Dhruv Hadke",
      role: "Video Editor & Motion Designer",
      company: "Dhruv Hadke Studio"
    },
    techStack: ["React", "TypeScript", "TailwindCSS", "GSAP Motion", "Vite"]
  },
  {
    id: "04",
    slug: "wisdom-weave",
    title: "Wisdom Weave",
    subtitle: "Education & Career Advisory Firm Landing Page",
    tagline: "Guiding ambitious students and professionals into high-growth careers with clear advisory funnels.",
    client: "Wisdom Weave Advisory",
    year: "2025",
    timeline: "4 Weeks",
    role: "Lead Conversion Designer & Web Architect",
    category: "Education & Professional Services Landing Page",
    featured: true,
    coverImage: "/optimized/image_20261010122643.webp",
    heroImage: "/optimized/image_20261010122643.webp",
    services: [
      "Landing Page UI/UX",
      "Conversion Rate Optimization",
      "Brand Positioning & Messaging",
      "Lead Capture Architecture"
    ],
    tags: ["EdTech", "Consultation Landing Page", "Career Advisory", "Lead Generation", "Conversion UX"],
    liveUrl: "https://wisdomweave.example.com",
    overview: "Wisdom Weave is an educational and professional consultation firm helping graduates and mid-career professionals transition into high-growth industries. We designed a conversion-focused landing page that breaks down complex consultation tracks and drives qualified discovery call bookings.",
    challenge: "<p>Career and higher education choices are high-stakes, and most people looking for guidance are already overwhelmed with conflicting advice. Wisdom Weave offered exceptional 1-on-1 mentorship, but their previous site read like a dense academic syllabus.</p><p>Prospective students and professionals couldn't quickly figure out which advisory track fit their situation, causing 58% of visitors to bounce before booking a call.</p>",
    solution: "<p>We restructured the landing page around clarity, empathy, and immediate action.</p><ul><li><strong>Clear consultation tracks:</strong> Interactive decision cards for college admissions, career switching, and professional certification.</li><li><strong>Verified outcomes & placement proof:</strong> Clear salary growth benchmarks and alumni success stories highlighted upfront to build immediate credibility.</li><li><strong>1-click consultation scheduler:</strong> Embedded booking flow for free 15-minute diagnostic calls without email back-and-forth.</li></ul>",
    result: "<ul><li><strong>+42%</strong> increase in booked discovery consultations within 60 days</li><li><strong>-52%</strong> drop in homepage bounce rate across paid and organic traffic</li><li><strong>2.7x</strong> more qualified inquiries for premium 1-on-1 advisory packages</li></ul>",
    keyMetrics: [
      { value: "+42%", label: "Discovery Call Bookings" },
      { value: "-52%", label: "Homepage Bounce Rate" },
      { value: "2.7x", label: "Qualified Advisory Leads" },
      { value: "96%", label: "Positive Feedback on Clarity" }
    ],
    scopeItems: [
      {
        title: "Advisory Offer & Clear Pricing Tiers",
        description: "Organizing their mentorship tracks into clear, relatable options so prospective clients immediately know which one fits their goals.",
        deliverables: [
          "Clear 3-track consultation menu",
          "Common client questions answered upfront",
          "Wireframes for fast scanning",
          "Plain-English service descriptions"
        ]
      },
      {
        title: "Trust-Building Landing Page Design",
        description: "Designing a warm, professional landing page featuring verified placement proof, alumni testimonials, and an easy booking scheduler.",
        deliverables: [
          "Desktop and mobile Figma layouts",
          "Interactive consultation selector",
          "Client reviews and outcome cards",
          "1-click calendar reservation flow"
        ]
      },
      {
        title: "Responsive Website & Calendar Setup",
        description: "Building a snappy, mobile-ready website with automated calendar booking and visitor analytics already wired up.",
        deliverables: [
          "Clean, responsive web build",
          "Direct Calendly and lead form integration",
          "Visitor tracking and analytics setup",
          "Live hosting and performance check"
        ]
      }
    ],
    bentoGallery: [
      {
        image: "/optimized/image_20261010122643.webp",
        title: "Consultation Advisory Tracks",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "Interactive consultation tracks for career transitions and academic planning",
        aspectRatio: "1200 / 675"
      },
      {
        image: "/optimized/image_20261010124936.webp",
        title: "Student & Professional Pathways",
        colSpan: "col-span-4 lg:col-span-2",
        caption: "Structured decision paths guiding prospective clients to the right mentor",
        aspectRatio: "682 / 1013"
      },
      {
        image: "/optimized/Screenshot-2026-10-10-123654.webp",
        title: "Placement Proof & Career Benchmarks",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "Transparent career benchmarks and verified alumni transition outcomes",
        aspectRatio: "1920 / 1080"
      },
      {
        image: "/optimized/image_20261010124422.webp",
        title: "Mentorship Framework Visualizer",
        colSpan: "col-span-4 lg:col-span-2",
        caption: "Visual breakdown of the 1-on-1 diagnostic consultation and roadmap phases",
        aspectRatio: "896 / 909"
      },
      {
        image: "/optimized/image_20261010131215.webp",
        title: "Client Case Studies & Reviews",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "Social proof cards detailing real salary bumps and university admissions",
        aspectRatio: "1200 / 675"
      },
      {
        image: "/optimized/Screenshot-2026-10-10-130232.webp",
        title: "1-Click Diagnostic Booking",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "Direct calendar reservation flow for free 15-minute discovery consultations",
        aspectRatio: "1920 / 1080"
      }
    ],
    testimonial: {
      quote: "Before Saif redesigned our landing page, our traffic was bouncing because people couldn't tell which consultation was right for them. Now, prospective clients book discovery calls already knowing our process and ready to work with us.",
      author: "Priya Sharma",
      role: "Managing Director",
      company: "Wisdom Weave Advisory"
    },
    techStack: ["React", "TypeScript", "TailwindCSS", "Framer Motion", "Calendly API", "Vite"]
  },
  {
    id: "05",
    slug: "vellux",
    title: "Vellux",
    subtitle: "Custom Software Engineering Agency Landing Page",
    tagline: "Positioning full-cycle engineering capabilities to win funded startups and enterprise modernization contracts.",
    client: "Vellux Software Solutions",
    year: "2024",
    timeline: "5 Weeks",
    role: "Lead B2B Web Designer & Brand Strategist",
    category: "B2B Technology & Dev Agency Landing Page",
    featured: true,
    coverImage: "/optimized/Vellux-display-mockup.webp",
    heroImage: "/optimized/Vellux-display-mockup.webp",
    services: [
      "B2B Landing Page Design",
      "Brand Positioning & Messaging",
      "Interactive Architecture Visuals",
      "Technical Lead Funnel UX"
    ],
    tags: ["B2B Tech", "Software Agency", "Landing Page", "Lead Generation", "Enterprise UX"],
    liveUrl: "https://vellux.example.com",
    overview: "Vellux is a custom software development firm building scalable MVPs for funded startups and modernizing mission-critical legacy architectures for enterprise clients. We designed a sharp, technical landing page that proves engineering credibility and speeds up B2B sales cycles.",
    challenge: "<p>Selling custom software engineering is brutal when every dev shop sounds identical. Vellux had a veteran engineering team capable of shipping 4-week startup MVPs or modernizing legacy enterprise systems, but their website looked like a generic template.</p><p>Enterprise clients doubted their security standards, while startups thought they moved too slow. Prospects spent weeks in discovery meetings just trying to figure out their core capabilities.</p>",
    solution: "<p>We designed a dual-audience landing page that clearly bifurcates startup agility from enterprise compliance.</p><ul><li><strong>Dedicated audience pathways:</strong> Fast-lane for <em>'Funded Startups: 4-Week MVP Sprints'</em> and rigor-lane for <em>'Enterprise: Legacy Modernization & Scale'</em>.</li><li><strong>Interactive tech stack visualizer:</strong> High-density visual breakdown of frameworks, DevOps security, and database scalability that engineers respect.</li><li><strong>Transparent scoping intake:</strong> Project scope estimator that captures technical requirements and budget range upfront before the initial discovery call.</li></ul>",
    result: "<ul><li><strong>+36%</strong> increase in qualified enterprise RFP submissions</li><li><strong>-40%</strong> shorter sales cycle due to clear upfront capability transparency</li><li><strong>2.5x</strong> more startup MVP sprint inquiries within the first quarter</li></ul>",
    keyMetrics: [
      { value: "+36%", label: "Enterprise RFP Submissions" },
      { value: "-40%", label: "Sales Cycle Discovery Time" },
      { value: "2.5x", label: "Startup MVP Sprint Inquiries" },
      { value: "100%", label: "Client Tech Transparency" }
    ],
    scopeItems: [
      {
        title: "Sales Positioning & Capability Breakdown",
        description: "Clarifying what Vellux builds so startup founders looking for MVPs and enterprise directors looking for modernization both feel in the right place.",
        deliverables: [
          "Startup vs. Enterprise service tracks",
          "Plain-English tech stack breakdown",
          "Clear agency differentiation guide",
          "Project scoping intake questionnaire"
        ]
      },
      {
        title: "High-Credibility Technical Landing Page",
        description: "Designing a sharp, dark-mode website with interactive architecture visuals that show off engineering quality before the first sales call.",
        deliverables: [
          "Full responsive Figma designs",
          "Interactive tech stack display",
          "Project budget and timeline estimator",
          "Client case study preview cards"
        ]
      },
      {
        title: "Production Build & Lead Capture",
        description: "Coding a high-speed website with sub-second page loads, polished micro-interactions, and direct lead capture for incoming RFPs.",
        deliverables: [
          "Production-ready React codebase",
          "Project inquiry and RFP form integration",
          "98+ Lighthouse speed score",
          "Clean technical SEO setup"
        ]
      }
    ],
    bentoGallery: [
      {
        image: "/optimized/Vellux-display-mockup.webp",
        title: "Engineering Services Command Center",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "B2B landing page interface articulating full-cycle software development capabilities",
        aspectRatio: "1 / 1"
      },
      {
        image: "/optimized/vellux-video-1.gif",
        title: "Interactive Tech Stack Visualizer",
        colSpan: "col-span-4 lg:col-span-2",
        caption: "Dynamic display of frontend frameworks, cloud infrastructure, and databases",
        aspectRatio: "1280 / 720"
      },
      {
        image: "/optimized/vellux-image-1.webp",
        title: "Startup vs. Enterprise Pathways",
        colSpan: "col-span-4 lg:col-span-2",
        caption: "Dedicated tracks for 4-week startup MVPs and enterprise legacy modernization",
        aspectRatio: "1164 / 1351"
      },
      {
        image: "/optimized/vellux-video-2.gif",
        title: "Development Process Timeline",
        colSpan: "col-span-4 lg:col-span-2",
        caption: "Clear agile sprints from initial scoping to production deployment",
        aspectRatio: "1280 / 720"
      },
      {
        image: "/optimized/vellux-mockup-2.webp",
        title: "Scoping & Estimate Calculator",
        colSpan: "col-span-4 lg:col-span-2",
        caption: "Transparent project intake form capturing timeline and tech requirements",
        aspectRatio: "1200 / 488"
      },
      {
        image: "/optimized/Screenshot-2026-10-09-173749.webp",
        title: "Mobile Technical Presentation",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "Responsive mobile experience optimized for busy executives reading on the go",
        aspectRatio: "1920 / 1080"
      }
    ],
    testimonial: {
      quote: "Before the redesign, prospective enterprise clients were hesitant because our old site didn't show the depth of our engineering work. Saif gave us an authority-driven site that pre-sells our technical standards and closes contracts faster.",
      author: "David Chen",
      role: "Head of Engineering & Partner",
      company: "Vellux Software Solutions"
    },
    techStack: ["React", "TypeScript", "TailwindCSS", "shadcn/ui", "Radix UI", "Vite"]
  },
  {
    id: "06",
    slug: "blue-sky",
    title: "Blue Sky",
    subtitle: "Cloud Compute Spaces & Virtual Dev Environments Landing Page",
    tagline: "Turning complicated cloud hosting into instant, one-click developer workspaces.",
    client: "Blue Sky Cloud Labs",
    year: "2025",
    timeline: "4 Weeks",
    role: "Lead Developer Experience & Web Designer",
    category: "Developer Tools & Cloud Infrastructure Landing Page",
    featured: true,
    coverImage: "/optimized/image_20261010143054.webp",
    heroImage: "/optimized/image_20261010143054.webp",
    services: [
      "Developer Tools UI/UX",
      "Landing Page Architecture",
      "Technical Benchmark Visuals",
      "Pricing & Tier Calculator UX"
    ],
    tags: ["Cloud Infrastructure", "DevTools", "Compute Spaces", "Developer UX", "Landing Page"],
    liveUrl: "https://bluesky.example.com",
    overview: "Blue Sky is a cloud infrastructure platform providing on-demand compute spaces, virtual dev environments, and scalable GPU clusters. We designed a clean, developer-first landing page with live latency benchmarks and instant workspace spin-up flows.",
    challenge: "<p>Most cloud hosting websites are notoriously confusing, packed with cryptic calculator sliders and hidden bandwidth fees. Blue Sky offered lightning-fast virtual compute spaces and GPU containers, but developers visiting their site couldn't easily tell how fast they could spin up a machine or what it would cost per hour.</p><p>Faced with confusing setup instructions, developers left for AWS or DigitalOcean simply out of familiarity.</p>",
    solution: "<p>We rebuilt the landing page with a developer-first aesthetic centered on speed, transparent specs, and 1-click trials.</p><ul><li><strong>Real-time latency & spin-up benchmarks:</strong> Visual telemetry showing exact boot times versus standard cloud providers.</li><li><strong>Clean compute tier comparisons:</strong> Clear CPU, RAM, and GPU specs with transparent hourly pricing and zero surprise invoices.</li><li><strong>Terminal-inspired UI:</strong> Interactive command snippets and live status monitors that speak directly to engineers.</li></ul>",
    result: "<ul><li><strong>+44%</strong> increase in free-tier developer workspace activations</li><li><strong>3.2x</strong> higher engagement with technical documentation and CLI install guides</li><li><strong>-48%</strong> reduction in pricing-related support tickets</li></ul>",
    keyMetrics: [
      { value: "+44%", label: "Workspace Activations" },
      { value: "1.8s", label: "Time to First Cloud Launch" },
      { value: "3.2x", label: "Technical Docs Engagement" },
      { value: "99.9%", label: "Developer Satisfaction Rate" }
    ],
    scopeItems: [
      {
        title: "Developer Onboarding & Pricing Clarity",
        description: "Auditing how software engineers evaluate cloud tools so we could remove confusing setup instructions and hidden pricing calculators.",
        deliverables: [
          "Friction points identified in setup flows",
          "Transparent hourly pricing structure",
          "Simple compute tier comparison wireframes",
          "Fast 1-line CLI onboarding guide"
        ]
      },
      {
        title: "Terminal-Style Developer Landing Page",
        description: "Designing a focused, dark-mode developer experience with live latency numbers, copy-paste terminal commands, and simple server tiers.",
        deliverables: [
          "Developer-first interface screens",
          "Side-by-side cloud comparison table",
          "Interactive code and terminal snippets",
          "Mobile and desktop screen layouts"
        ]
      },
      {
        title: "Live Interactive Demos & Fast Codebase",
        description: "Building an ultra-fast web build with live interactive pricing sliders and 1-click terminal copy widgets.",
        deliverables: [
          "Production-grade React codebase",
          "Interactive hourly pricing calculator",
          "Copy-to-clipboard terminal widgets",
          "Edge deployment for instant global loading"
        ]
      }
    ],
    bentoGallery: [
      {
        image: "/optimized/image_20261010143054.webp",
        title: "Compute Spaces Console Preview",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "Landing page preview showing 1-click virtual dev environment spin-up",
        aspectRatio: "1200 / 675"
      },
      {
        image: "/optimized/Screenshot-2026-10-10-143750.webp",
        title: "Live Cloud Latency Benchmarks",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "Transparent benchmark graphs proving sub-second spin-up times vs. legacy cloud platforms",
        aspectRatio: "1920 / 1080"
      },
      {
        image: "/optimized/image_20261010144233.webp",
        title: "Hardware & GPU Specifications",
        colSpan: "col-span-4 lg:col-span-2",
        caption: "Granular breakdown of vCPU cores, high-speed RAM, and dedicated GPU clusters",
        aspectRatio: "1 / 1"
      },
      {
        image: "/optimized/image_20261010152929.webp",
        title: "Terminal CLI Companion",
        colSpan: "col-span-4 lg:col-span-2",
        caption: "1-line terminal spin-up command with instant authentication",
        aspectRatio: "1 / 1"
      }
    ],
    testimonial: {
      quote: "Engineers are naturally skeptical of cloud marketing claims. Saif designed a site that cuts straight to the specs, shows live benchmarks, and lets devs launch a workspace in seconds. Our signup rate jumped immediately.",
      author: "Marcus Lind",
      role: "Founder & CTO",
      company: "Blue Sky Cloud Labs"
    },
    techStack: ["React", "TypeScript", "TailwindCSS", "shadcn/ui", "PrismJS", "Vite"]
  },
  {
    id: "07",
    slug: "a2s",
    title: "A2S",
    subtitle: "Commercial Videography & Film Production Agency Landing Page",
    tagline: "Converting commercial brands and marketing directors with cinematic visual storytelling and instant production booking.",
    client: "A2S Visual Agency",
    year: "2024",
    timeline: "4 Weeks",
    role: "Lead Creative Director & Web Architect",
    category: "Creative Agency Portfolio & Landing Page",
    featured: true,
    coverImage: "/optimized/image_20261010162201.webp",
    heroImage: "/optimized/image_20261010162201.webp",
    services: [
      "Agency Portfolio Design",
      "Cinematic Art Direction",
      "Motion & Video Optimization",
      "Production Booking Funnel"
    ],
    tags: ["Videography", "Film Production", "Creative Agency", "Portfolio Landing Page", "Cinematic Web"],
    liveUrl: "https://a2s.example.com",
    overview: "A2S is a full-service commercial videography agency crafting cinematic brand films, high-fashion campaigns, and product documentaries. We designed an edge-to-edge portfolio landing page that highlights their cinematography with silky horizontal galleries, client credentials, and direct production booking funnels.",
    challenge: "<p>High-budget brand marketing directors look at a production agency's reel for thirty seconds before making up their mind. A2S shot breathtaking campaigns for fashion and commercial brands, but their previous site was slow, cluttered, and failed to communicate their full production capabilities.</p><p>Potential clients assumed they were solo camera operators rather than a full-scale production house with directors and colorists.</p>",
    solution: "<p>We designed a monolithic, cinematic portfolio landing page that feels like a luxury film magazine.</p><ul><li><strong>Edge-to-edge cinematic frame showcases:</strong> High-bitrate visual stills and video previews optimized for instant mobile playback.</li><li><strong>Full-service production breakdown:</strong> Clear commercial packages detailing creative treatment, location shooting, and post-production color grading.</li><li><strong>Fast shoot reservation portal:</strong> Direct shoot booking flow that captures project concept, target dates, and production budget upfront.</li></ul>",
    result: "<ul><li><strong>+38%</strong> increase in commercial brand retainer inquiries</li><li><strong>2.3x</strong> higher average production contract value on inbound leads</li><li><strong>-46%</strong> reduction in time spent back-and-forth qualifying client budgets</li></ul>",
    keyMetrics: [
      { value: "+38%", label: "Commercial Retainer Inquiries" },
      { value: "2.3x", label: "Average Production Contract Value" },
      { value: "0.6s", label: "Instant Visual Reel Load Time" },
      { value: "94%", label: "Positive Brand Client Impression" }
    ],
    scopeItems: [
      {
        title: "Production Packages & Screening Funnel",
        description: "Structuring their commercial packages so brand marketing directors immediately recognize them as a full production house with fixed tiers.",
        deliverables: [
          "Clear commercial package tiers",
          "Commercial shoot intake questionnaire",
          "Showreel sequencing guide",
          "Budget pre-qualification flow"
        ]
      },
      {
        title: "Cinematic Portfolio UI & Motion",
        description: "Designing an edge-to-edge, film-magazine digital showcase with silky horizontal galleries, bold typography, and direct shoot reservation.",
        deliverables: [
          "Full-bleed desktop and mobile portfolio layouts",
          "Smooth horizontal project slider",
          "Director's treatment and case study templates",
          "Commercial production booking form"
        ]
      },
      {
        title: "Fast Video Streaming & Web Codebase",
        description: "Building a high-performance web experience that streams crisp commercial video reels and high-res photography with zero buffering.",
        deliverables: [
          "Fast React and TypeScript codebase",
          "Buffer-free video streaming setup",
          "Smooth mobile touch and swipe controls",
          "Live production deployment"
        ]
      }
    ],
    bentoGallery: [
      {
        image: "/optimized/image_20261010162201.webp",
        title: "Cinematic Commercial Spread",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "Edge-to-edge showcase celebrating high-fashion and commercial film production",
        aspectRatio: "1200 / 675"
      },
      {
        image: "/optimized/A_modern_tablet_device_resting_2K_20261010175437.webp",
        title: "Brand Documentary & Color Grade",
        colSpan: "col-span-4 lg:col-span-2",
        caption: "Master color grading and tactile cinematography highlights",
        aspectRatio: "2400 / 1792"
      },
      {
        image: "/optimized/image_20261010181610.webp",
        title: "Production Capabilities Overview",
        colSpan: "col-span-8 lg:col-span-4",
        caption: "Full-cycle production services covering scripting, shooting, and sound design",
        aspectRatio: "1024 / 898"
      },
      {
        image: "/optimized/a2s-image-2.webp",
        title: "Director's Treatment Showcase",
        colSpan: "col-span-4 lg:col-span-2",
        caption: "Behind-the-scenes treatments and visual storyboard breakdowns",
        aspectRatio: "5820 / 6592"
      }
    ],
    testimonial: {
      quote: "Before Saif built our portfolio, marketing directors treated us like freelance videographers and haggled on day rates. This site positioned us as a high-end production house. Our average project budget more than doubled within three months.",
      author: "Alex Sterling",
      role: "Executive Producer & Founder",
      company: "A2S Visual Agency"
    },
    techStack: ["React", "TypeScript", "TailwindCSS", "Framer Motion", "Vite"]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  if (!slug) return undefined;
  const target = slug.toLowerCase();
  return projectsData.find(p => p.slug.toLowerCase() === target);
}

export function getAdjacentProjects(currentSlug: string): { prev?: Project; next?: Project } {
  const currentProject = getProjectBySlug(currentSlug);
  const currentIndex = currentProject 
    ? projectsData.findIndex(p => p.slug.toLowerCase() === currentProject.slug.toLowerCase())
    : -1;

  if (currentIndex === -1) {
    return { prev: undefined, next: undefined };
  }

  const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
  const nextIndex = (currentIndex + 1) % projectsData.length;

  return {
    prev: projectsData[prevIndex],
    next: projectsData[nextIndex]
  };
}

export function getNextTwoProjects(currentSlug: string): Project[] {
  const currentProject = getProjectBySlug(currentSlug);
  const currentIndex = currentProject 
    ? projectsData.findIndex(p => p.slug.toLowerCase() === currentProject.slug.toLowerCase())
    : 0;

  const firstNext = projectsData[(currentIndex + 1) % projectsData.length];
  const secondNext = projectsData[(currentIndex + 2) % projectsData.length];

  return [firstNext, secondNext];
}
