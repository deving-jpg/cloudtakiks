// Central content for CloudTaktiks — sourced from brand guidelines + live site.

export const SITE = {
  name: "Cloud Taktiks",
  tagline: "Cloud-based ERP Excellence",
  since: 2016,
  email: "support@cloudtaktiks.com",
  address: "Dubai, United Arab Emirates",
  phones: [
    { region: "Middle East", number: "+971 50 561 2620" },
    { region: "Europe", number: "+34 689 872 690" },
    { region: "Latin America", number: "+506 8845 5513" },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/cloudtaktiks/", icon: "linkedin" as const },
    { label: "X", href: "https://x.com/cloudtaktiks", icon: "x" as const },
    { label: "YouTube", href: "https://www.youtube.com/@CloudTaktiks", icon: "youtube" as const },
    { label: "Facebook", href: "https://www.facebook.com/people/CloudTaktiks/61566555384654/", icon: "facebook" as const },
  ],
};

export const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Offerings", href: "/offerings" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Team member photos — language-independent, ordered to match team.members in lib/i18n.ts.
// Drop image files in public/img/team/ matching these paths. Any member without a photo
// (or whose file is missing) falls back to an initials avatar automatically.
export const TEAM_PHOTOS: (string | null)[] = [
  "/img/team/omar-haddad.jpg", // Founder & CEO
  "/img/team/elena-rossi.jpg", // CTO
  "/img/team/diego-morales.jpg", // Head of Cloud Operations
  "/img/team/sara-khan.jpg", // SAP Business One Lead
  "/img/team/lucas-fernandez.jpg", // Cybersecurity Lead
  "/img/team/maria-castro.jpg", // Head of Client Success
];

export const STATS = [
  { value: 750, suffix: "+", label: "Clients worldwide" },
  { value: 40, suffix: "+", label: "Countries served" },
  { value: 7500, suffix: "+", label: "Active users" },
  { value: 2016, suffix: "", label: "Trusted since", raw: true },
];

export const OFFERINGS = [
  {
    slug: "sap-business-one-cloud-hosting",
    title: "SAP Business One Cloud Hosting",
    short: "Secure, high-performance SAP B1 hosting on Azure & Huawei Cloud.",
    body: "Optimized hosting for SAP Business One built for fast response and minimal downtime. Deployments on Microsoft Azure and Huawei Cloud supporting both SQL and HANA databases, with scalable infrastructure, daily backups, advanced security and round-the-clock monitoring.",
    icon: "cloud",
    points: ["Azure & Huawei Cloud", "SQL + HANA", "Daily backups", "24/7 monitoring"],
  },
  {
    slug: "crowdstrike-endpoint-protection",
    title: "CrowdStrike Endpoint Protection",
    short: "World-leading, cloud-native endpoint protection powered by AI.",
    body: "We deliver CrowdStrike Falcon — next-generation antivirus with AI-driven threat detection and behavioral analytics. Lightweight monitoring with zero performance impact that blocks ransomware and malware before it spreads.",
    icon: "shield",
    points: ["NGAV", "AI threat detection", "Behavioral analytics", "Ransomware block"],
  },
  {
    slug: "cyber-security-solutions",
    title: "Cyber Security Solutions",
    short: "Proactive protection, from monitoring to incident response.",
    body: "Comprehensive protective services spanning network monitoring, vulnerability assessments, penetration testing, endpoint safeguards and incident response — with compliance support tailored to your organizational risk profile.",
    icon: "lock",
    points: ["Network monitoring", "Pen testing", "Vulnerability scans", "Incident response"],
  },
  {
    slug: "tsplus-remote-access",
    title: "TSplus Remote Access",
    short: "Secure remote desktop to SAP B1 — without RDS/Citrix complexity.",
    body: "Cost-effective remote desktop enabling secure access to SAP Business One and applications via a web portal. Role-based permissions, SSL encryption and built-in security without the traditional RDS or Citrix overhead.",
    icon: "remote",
    points: ["Web portal access", "Role-based", "SSL encryption", "No Citrix needed"],
  },
  {
    slug: "mfa-advanced-printing",
    title: "MFA & Advanced Printing",
    short: "Extra auth layers plus seamless remote-to-local printing.",
    body: "Multi-Factor Authentication adds verification layers beyond passwords to prevent unauthorized access. Advanced Printing enables secure printing from remote sessions straight to local printers — without driver conflicts.",
    icon: "key",
    points: ["Multi-factor auth", "No driver conflicts", "Remote-to-local", "Secure sessions"],
  },
  {
    slug: "microsoft-365-solutions",
    title: "Microsoft 365 Solutions",
    short: "End-to-end licensing, setup and support for the M365 suite.",
    body: "Full-service Microsoft 365 covering licensing, configuration and support for Outlook, Teams, SharePoint and the Office suite — integrated cleanly with your cloud environment.",
    icon: "grid",
    points: ["Licensing", "Teams & SharePoint", "Outlook", "Full support"],
  },
];

export const VALUES = [
  { n: "01", title: "Innovation-Driven", body: "We continuously seek innovative solutions so clients stay competitive in an ever-evolving digital landscape." },
  { n: "02", title: "Client-Centricity", body: "Our clients' success is our priority. We build long-term partnerships around their business objectives." },
  { n: "03", title: "Integrity & Transparency", body: "We uphold the highest standards of integrity with transparent, ethical communication in every interaction." },
  { n: "04", title: "Excellence in Service", body: "Exceptional, proactive support that ensures seamless integration, smooth transitions and long-term growth." },
  { n: "05", title: "Security & Compliance", body: "We prioritize data security and regulatory compliance in every solution we implement." },
  { n: "06", title: "Collaboration & Empowerment", body: "We empower businesses to harness the full potential of the cloud, fostering growth and efficiency." },
  { n: "07", title: "Agility & Adaptability", body: "We remain agile and ready to pivot, meeting new challenges and client needs effectively." },
];

export const APPROACH_AREAS = [
  { title: "Total Cost of Ownership", body: "Lower your TCO without compromising capability — efficient infrastructure that pays off.", icon: "key" },
  { title: "High-end Performance", body: "Tuned environments built for fast, consistent response and minimal downtime.", icon: "arrow" },
  { title: "24/7 Support", body: "Round-the-clock support across the Middle East, Europe and Latin America.", icon: "clock" },
  { title: "Unbeatable Efficiency", body: "Streamlined operations that do more with less, every single day.", icon: "cloud" },
  { title: "Expert Team", body: "SAP and cloud specialists who have been shipping since 2016.", icon: "grid" },
  { title: "Robust Security", body: "ISO/IEC 27001:2022 aligned — encrypted, monitored and continuously hardened.", icon: "shield" },
  { title: "Agility", body: "We adapt and pivot quickly as your business and the technology shift.", icon: "remote" },
  { title: "Scalability", body: "Grow seamlessly, without re-architecting — capacity that flexes with you.", icon: "search" },
];

export const WHY = [
  { title: "Expertise", body: "A SAP & cloud team that has been shipping since 2016." },
  { title: "Customization", body: "Solutions shaped around your business, not the other way around." },
  { title: "Cost-Effectiveness", body: "Lower total cost of ownership without sacrificing performance." },
  { title: "Unmatched Support", body: "Real 24/7 support across Middle East, Europe and Latin America." },
  { title: "Security First", body: "ISO/IEC 27001:2022 aligned, encrypted and continuously monitored." },
];

export const TIMELINE = [
  { year: "2016", text: "Founded — launched colocation & infrastructure services." },
  { year: "2018", text: "Managed cloud launch for SAP Business One." },
  { year: "2020", text: "Microsoft Azure partnership established." },
  { year: "2022", text: "Geographic expansion across multiple continents." },
  { year: "2023", text: "SAP B1 Web Client launch & security enhancements." },
  { year: "2024", text: "750+ clients across 40+ countries." },
];

export const BLOG = [
  {
    slug: "competitive-edge-cloud-erp-smes",
    title: "The Competitive Edge of Cloud ERP for SMEs",
    excerpt: "How cloud-based enterprise solutions hand small and mid-sized businesses an outsized advantage.",
    date: "Dec 18, 2025",
    views: 315,
    category: "Technology",
    image: "/img/blogs/featured.png",
    body: [
      "For years, enterprise resource planning was the preserve of large corporations with deep IT budgets. Cloud ERP has rewritten that rule. By moving the platform, the database and the infrastructure into a managed cloud environment, small and mid-sized enterprises can now run the same calibre of system the largest players rely on — without the capital cost of building it themselves.",
      "The advantage is not only financial. Cloud ERP turns a fixed, depreciating asset into a flexible operating cost that scales with the business. Need more capacity for a busy quarter? It is provisioned in minutes. Opening a new branch in another country? The same system follows you there, with the same data, the same controls and the same support.",
      "At Cloud Taktiks we see this every day with SAP Business One on Microsoft Azure and Huawei Cloud. Daily backups, 24/7 monitoring and ISO/IEC 27001:2022-aligned security mean an SME gets enterprise resilience out of the box — letting the team focus on growth instead of plumbing.",
    ],
  },
  {
    slug: "cloud-migration-roadmap-sap-b1",
    title: "Cloud Migration Roadmap for SAP Business One",
    excerpt: "A practical, low-risk path for moving your SAP systems to the cloud.",
    date: "Dec 18, 2025",
    views: 248,
    category: "Technology",
    image: "/img/blogs/cloud-migration.png",
    body: [
      "A successful migration starts long before any data is moved. It starts with a clear assessment: which add-ons are in use, how the database is sized, where the integrations live and what the real recovery objectives are. Skipping this step is the single biggest cause of painful go-lives.",
      "From there, the path is staged — a sandbox migration to validate, a parallel run to build confidence, and a tightly-scheduled cutover with a rollback plan ready in case anything drifts. Done well, the business experiences minimal disruption and users barely notice the ground shifting beneath them.",
      "The reward is durable: lower total cost of ownership, elastic capacity, and a platform that is finally easy to back up, secure and scale.",
    ],
  },
  {
    slug: "cybersecurity-frameworks-cloud-erp",
    title: "Cybersecurity Frameworks for Cloud ERP",
    excerpt: "The security protocols and safeguards that keep enterprise cloud platforms resilient.",
    date: "Dec 18, 2025",
    views: 278,
    category: "Technology",
    image: "/img/blogs/cybersecurity.png",
    body: [
      "ERP is where a company's most sensitive data lives — finance, customers, inventory, payroll. Protecting it in the cloud is less about a single product and more about layered defence: encryption at rest and in transit, strict access controls, continuous monitoring and a tested response plan.",
      "Frameworks such as ISO/IEC 27001:2022 give that defence a structure. They turn good intentions into repeatable processes — and into evidence you can show auditors, partners and customers.",
      "Pairing that governance with next-generation endpoint protection like CrowdStrike Falcon means threats are caught by behaviour, not just signatures, before they can spread.",
    ],
  },
  {
    slug: "future-of-erp-middle-east",
    title: "The Future of ERP in the Middle East",
    excerpt: "Emerging trends reshaping enterprise resource planning across the region.",
    date: "Dec 18, 2025",
    views: 244,
    category: "Technology",
    body: [
      "The Middle East is moving to the cloud faster than almost anywhere — driven by ambitious national digital agendas, new data-residency options from hyperscalers, and a young, mobile-first workforce that expects modern tools.",
      "For ERP, that means a shift from on-premise boxes to managed cloud platforms that are secure, localized and always available. Businesses want the agility to expand across borders without re-architecting every time.",
      "Cloud Taktiks has built its practice around exactly this: SAP Business One delivered as a resilient, regionally-aware cloud service for organizations across the Gulf and beyond.",
    ],
  },
  {
    slug: "cloud-erp-training-user-adoption",
    title: "Cloud ERP Training & User Adoption Strategies",
    excerpt: "Implementation approaches that turn rollouts into real workforce enablement.",
    date: "Dec 18, 2025",
    views: 284,
    category: "Technology",
    body: [
      "The best ERP in the world delivers nothing if people don't use it well. Adoption is a discipline of its own — and it is won with role-based training, clear champions inside each team, and documentation people actually reach for.",
      "Phasing the rollout helps: start with a core group, gather feedback, refine the process, then expand. Small early wins build the momentum that carries a whole organization.",
      "When training is treated as part of the project — not an afterthought — go-live becomes a launchpad rather than a cliff edge.",
    ],
  },
  {
    slug: "disaster-recovery-testing-erp",
    title: "Disaster Recovery Testing: Why It Matters for ERP",
    excerpt: "Why continuity planning is non-negotiable for mission-critical ERP systems.",
    date: "Dec 18, 2025",
    views: 311,
    category: "Technology",
    body: [
      "A backup you have never restored is a hope, not a plan. Disaster recovery only becomes real when it is tested — regularly, and against the recovery time and recovery point objectives the business actually needs.",
      "For ERP, the stakes are high: an outage can halt invoicing, shipping and payroll within hours. That is why we build high-availability and tested restore procedures into every environment we run.",
      "The goal is simple but powerful: when something goes wrong, recovery is a routine, rehearsed procedure — not a crisis.",
    ],
  },
];

export const PARTNERS = [
  "Microsoft Azure", "SAP Business One", "CrowdStrike", "Huawei Cloud", "TSplus", "Microsoft 365", "HANA", "SQL Server",
];

export const LOGOS = [
  { name: "Microsoft Azure", src: "/logos/azure.svg" },
  { name: "SAP", src: "/logos/sap.svg" },
  { name: "CrowdStrike", src: "/logos/crowdstrike.png" },
  { name: "Huawei Cloud", src: "/logos/huawei.svg" },
  { name: "TSplus", src: "/logos/tsplus.png" },
  { name: "Microsoft 365", src: "/logos/microsoft365.png" },
];
