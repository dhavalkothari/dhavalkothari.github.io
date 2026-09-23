/**
 * Single structured source for all approved case studies.
 * Consumed by work.html (index rendering) and case-study.html (?slug=).
 *
 * Do not add a visible "AI solutions" category card until an approved
 * AI case-study record exists here — see PORTFOLIO_CONTENT_MASTER.md
 * "Future AI case-study plug-in" for the template to use later.
 */
const PORTFOLIO_DISCLOSURE =
  "Anonymized or reconstructed portfolio case study to respect client confidentiality. Underlying thoughts, architecture, analytical approach, system design and solution views reflects the actual work.";

window.CASE_STUDIES = [
  {
    slug: "enterprise-infrastructure-intelligence",
    category: "Executive BI",
    title: "Enterprise Infrastructure Intelligence",
    summary:
      "An enterprise infrastructure intelligence demonstrator that brings spend, service health, capacity, risk, and modernization priorities into one decision-ready workspace.",
    oneLine:
      "An executive infrastructure workspace designed to turn disconnected cost, capacity, service-health, and risk signals into one operational view.",
    tools: ["Power BI", "Data modeling", "Executive reporting", "Infrastructure analytics"],
    tags: ["Power BI", "Executive reporting", "Infrastructure analytics"],
    disclosure: PORTFOLIO_DISCLOSURE,
    heroImage: "assets/enterprise-infrastructure-thumbnail.svg",
    heroImageAlt: "Enterprise infrastructure dashboard showing spend, savings, modernization, and domain signals",
    demoUrl: "assets/enterprise-infrastructure-dashboard.html",
    demoLabel: "Open the interactive demonstrator",
    gallery: [],
    problem:
      "Infrastructure leaders often inherit separate reports for facilities, on-premises estate, cloud resources, storage, risk, and cost. The consequence is not merely fragmented reporting; it is slower prioritization. A leadership team cannot easily see where spend is growing, which risks require attention, where capacity is constrained, or how modernization work changes the picture.",
    solution:
      "The workspace brings those domains into a single executive layer, then supports drill-through into the operational detail behind the headline. It is organized around the questions a leader needs to answer: What is changing? Where is exposure concentrated? Which domains are inefficient? What needs attention first?\n\nThe design combines executive KPI summaries with domain-level views for facilities, on-premises compute, on-premises storage, cloud compute, cloud storage, and risk/compliance. Global filters create a consistent way to explore region, provider, business unit, criticality, and time period.",
    solutionDiagram: null,
    enables: [
      "Compare spend, utilization, risk, and modernization progress across infrastructure domains.",
      "Identify areas for cost, capacity, lifecycle, and remediation review.",
      "Move from an executive signal to the operational detail needed to investigate it.",
      "Create a shared reporting language across technical teams and leadership.",
    ],
    demonstrates: [
      "Executive dashboard storytelling and information hierarchy.",
      "KPI design for cost, risk, utilization, and operational performance.",
      "Multi-domain data-model and drill-through thinking.",
      "Reporting UX designed for both leadership review and operational follow-up.",
    ],
    ctaPrimary: { label: "Open the interactive demonstrator", href: "assets/enterprise-infrastructure-dashboard.html" },
    ctaSecondary: { label: "Explore Snowflake FinOps work", href: "case-study.html?slug=snowflake-finops-command-center" },
  },
  {
    slug: "snowflake-finops-command-center",
    category: "Data platforms",
    title: "Snowflake FinOps Command Center",
    summary:
      "A platform analytics demonstrator that makes compute consumption, warehouse efficiency, query performance, and optimization work visible to technical and business stakeholders.",
    oneLine:
      "A platform observability workspace designed to connect compute cost, warehouse behavior, query performance, data lifecycle, and optimization priorities.",
    tools: ["Snowflake", "SQL", "FinOps", "Data platform analytics"],
    tags: ["Snowflake", "SQL", "FinOps"],
    disclosure: PORTFOLIO_DISCLOSURE,
    heroImage: "assets/snowflake-finops-thumbnail.svg",
    heroImageAlt: "Snowflake FinOps dashboard showing credits, warehouse efficiency, optimization, and query performance",
    demoUrl: "assets/snowflake-finops-command-center.html",
    demoLabel: "Open the interactive demonstrator",
    gallery: [],
    problem:
      "Data-platform teams can see Snowflake usage in several technical views, but it is difficult to translate that activity into a clear operating story. Finance needs cost visibility, engineering needs to investigate inefficient workloads, and leaders need confidence that optimization work is prioritized and measurable.",
    solution:
      "The command center organizes platform reporting around the decisions that matter: where credits are consumed, which warehouse patterns need attention, what queries are expensive, how storage is growing, who owns consumption, and what optimization work should happen next.\n\nIt brings together an executive overview, warehouse utilization, query performance, storage and lifecycle signals, workload attribution, pipeline modernization, and an optimization backlog. The user can begin with a high-level platform signal and move into the supporting detail without losing context.",
    solutionDiagram: null,
    enables: [
      "Make platform consumption and cost drivers understandable beyond raw system logs.",
      "Prioritize optimization work by likely benefit, effort, and ownership.",
      "Give finance, platform engineering, and leadership a common view of performance and cost.",
      "Connect technical efficiency work to an operational reporting narrative.",
    ],
    demonstrates: [
      "Snowflake cost and usage analysis.",
      "SQL-performance and warehouse-optimization thinking.",
      "Platform reporting for technical and business audiences.",
      "Information architecture for complex operational data.",
    ],
    ctaPrimary: { label: "Open the interactive demonstrator", href: "assets/snowflake-finops-command-center.html" },
    ctaSecondary: { label: "Explore infrastructure intelligence", href: "case-study.html?slug=enterprise-infrastructure-intelligence" },
  },
  {
    slug: "action-item-tracker",
    category: "Automation",
    title: "Action Item Tracker",
    summary:
      "An operations-tracking system that makes ownership, critical actions, due dates, and exceptions visible through a practical, maintainable workflow.",
    oneLine:
      "An operations-tracking workflow designed to make ownership, critical actions, due dates, and exceptions visible in one maintainable working system.",
    tools: ["Excel automation", "Workflow design", "Operational reporting", "Process improvement"],
    tags: ["Excel automation", "Operations", "Workflow design"],
    disclosure: PORTFOLIO_DISCLOSURE,
    heroImage: "assets/action-item-tracker/architecture-overview.png",
    heroImageAlt: "Action Item Tracker architecture overview diagram",
    demoUrl: null,
    demoLabel: null,
    gallery: [
      { src: "assets/action-item-tracker/architecture-overview.png", alt: "Action Item Tracker architecture overview", caption: "System architecture: master data sheet, Power Query transforms, and VBA automation feeding six output views." },
      { src: "assets/action-item-tracker/application-flow-diagram.png", alt: "Action Item Tracker application flow diagram", caption: "Application flow from data entry through automated calculation, logging, and filtered reporting views." },
      { src: "assets/action-item-tracker/control-panel.png", alt: "Action Item Tracker control panel view", caption: "Control panel view: owner and aging filters with total, WIP, on-hold, open, closed, and critical counts." },
    ],
    problem:
      "When actions are tracked across emails, meeting notes, individual spreadsheets, and informal follow-up, it becomes difficult to see ownership, ageing, urgency, or missed commitments. The work is not simply to create a spreadsheet; it is to create a dependable operating rhythm.",
    solution:
      "The tracker brings open items, critical actions, missed commitments, and a management dashboard into one workflow. It combines a practical input and control layer with focused operational views so users can update records, identify exceptions, and follow through without maintaining separate lists.\n\nThe design emphasizes clarity of ownership, status, due dates, and escalation signals. Supporting architecture and application-flow views explain how the workbook operates as a system rather than a static file.",
    solutionDiagram: null,
    enables: [
      "Maintain a clear view of open, critical, and overdue actions.",
      "Make follow-up responsibility and status easy to identify.",
      "Reduce fragmented manual tracking and duplicate update work.",
      "Create a repeatable operational process that can be understood by the people using it.",
    ],
    demonstrates: [
      "Workflow and operational-system design.",
      "Practical automation and exception management.",
      "Clear information hierarchy in a familiar business tool.",
      "Translating a recurring coordination problem into a sustainable process.",
    ],
    ctaPrimary: { label: "View the system design", href: "#proof" },
    ctaSecondary: { label: "Discuss an automation opportunity", href: "contact.html" },
  },
  {
    slug: "freemium-learning-analytics",
    category: "Product analytics",
    title: "Freemium Learning Analytics",
    summary:
      "A customer and content-performance view designed to connect discoverability, engagement, adoption, and value across a freemium learning journey.",
    oneLine:
      "A customer and content-performance analytics concept designed to make engagement, discoverability, conversion signals, and value easier to understand across a freemium learning journey.",
    tools: ["Power BI", "Product analytics", "Customer value", "Content performance"],
    tags: ["Product analytics", "Customer value", "Content performance"],
    disclosure: PORTFOLIO_DISCLOSURE,
    heroImage: "assets/freemium-learning/executive-view.png",
    heroImageAlt: "Freemium learning analytics executive view dashboard",
    demoUrl: null,
    demoLabel: null,
    gallery: [
      { src: "assets/freemium-learning/executive-view.png", alt: "Executive view dashboard showing active learners, conversion rate, and content performance", caption: "Executive view: active learners, conversion rate, content consumption, and traffic sources." },
      { src: "assets/freemium-learning/discoverability.png", alt: "Discoverability details dashboard", caption: "Discoverability details: content impressions, search visibility, and channel performance." },
      { src: "assets/freemium-learning/engagement-journeys.png", alt: "Engagement journeys dashboard", caption: "Engagement journeys across the learning experience." },
      { src: "assets/freemium-learning/engagement-retention.png", alt: "Engagement and retention dashboard", caption: "Engagement and retention trends across learner segments." },
      { src: "assets/freemium-learning/customer-value-roi.png", alt: "Customer value and ROI dashboard", caption: "Customer value details: skills improved, time saved, and estimated ROI." },
      { src: "assets/freemium-learning/content-production.png", alt: "Content production details dashboard", caption: "Content production details connecting output to engagement outcomes." },
    ],
    problem:
      "Freemium learning products need more than activity reporting. Product, customer-success, and content teams need to understand whether users discover the right content, engage meaningfully, return over time, and experience enough value to continue their journey.",
    solution:
      "The analytics concept organizes the experience around program overview, executive view, customer value and ROI, engagement journeys, discoverability, retention, content production, and an executive hub. This connects user behavior to content and customer-value questions rather than isolating each metric in a separate report.",
    solutionDiagram: null,
    enables: [
      "View engagement and value signals across the broader learning journey.",
      "Identify content, discoverability, and retention questions worth investigating.",
      "Give product and customer-facing teams a shared view of adoption and value.",
    ],
    demonstrates: [
      "Freemium and product-analytics thinking.",
      "Customer-value and content-performance framing.",
      "Dashboard experience design across related business questions.",
    ],
    ctaPrimary: { label: "View the analytics gallery", href: "#proof" },
    ctaSecondary: { label: "View all work", href: "work.html" },
  },
];
