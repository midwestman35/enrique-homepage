export const siteContent = {
  splash: {
    label: "Resume stream",
    status: "assembling signal...",
    task: "Loading operational profile",
    meta: "Public safety, voice, and infrastructure",
    progressSteps: [14, 29, 47, 63, 82, 100],
  },
  hero: {
    eyebrow: "Engineer, Tinkerer",
    title: "Operational clarity for critical systems and the tools around them.",
    lede:
      "I work inside NG911, voice, and cloud operations, then turn that field pressure into calmer software surfaces for investigation and triage.",
    availability:
      "Focused on public safety, network operations, and operator-first product work.",
    primaryCta: {
      label: "Email Enrique",
      href: "mailto:enrique@carafe.one",
    },
    secondaryCta: {
      label: "GitHub",
      href: "https://github.com/midwestman35",
    },
    metrics: [
      {
        label: "Current",
        value: "Axon",
        detail: "NOC engineer supporting distributed NG911 systems.",
      },
      {
        label: "Protocols",
        value: "SIP / MGCP / H.248",
        detail: "Voice and routing context that shapes how I build.",
      },
      {
        label: "Build track",
        value: "NocLense",
        detail: "A personal product for SIP and system log investigation.",
      },
    ],
  },
  project: {
    eyebrow: "Featured project",
    title: "NocLense",
    summary:
      "A personal SIP and system log analyzer that treats parsing, filtering, context, and saved investigation paths as one workflow instead of several disconnected tools.",
    link: {
      label: "View repository",
      href: "https://github.com/midwestman35/NocLense",
    },
    problem:
      "Investigations slow down when captures, logs, note-taking, and operator context live in separate windows.",
    system:
      "The product combines faceted filtering, AI-assisted context handling, saved views, and a worker-backed ingestion flow for large captures.",
    outcome:
      "It makes the handoff from raw noise to a usable hypothesis faster, which is the same standard I care about in operational environments.",
    stack: ["React 18", "TypeScript", "Vite", "Electron", "Vercel"],
  },
  trajectorySection: {
    eyebrow: "Experience",
    title: "What I've worked on",
  },
  trajectory: [
    {
      id: "axon",
      dates: "Oct 2025 - Present",
      eyebrow: "Current role",
      company: "Axon",
      role: "NOC Engineer - NG911 / Public Safety SaaS",
      tags: ["AWS", "Datadog", "FortiGate", "ANI/ALI", "NG911"],
      bullets: [
        "Monitor AWS-hosted cloud infrastructure and triage service disruptions across distributed NG911 systems in real time.",
        "Perform first-level troubleshooting on Digi remote access devices, FortiGate firewalls, and ANI/ALI routing services.",
        "Classify, prioritize, and manage incidents P1 through P4 across Jira and Zendesk while maintaining SLA compliance.",
      ],
    },
    {
      id: "cdw",
      dates: "Jun 2023 - Oct 2025",
      eyebrow: "Previous role",
      company: "CDW",
      role: "Network Analyst - enterprise operations",
      tags: ["SD-WAN", "Cisco", "Silver Peak", "VMware", "Linux"],
      bullets: [
        "Managed SD-WAN solutions via Cisco and Silver Peak Orchestrator for enterprise customers.",
        "Performed Linux server troubleshooting and alert monitoring across customer infrastructure.",
        "Conducted VMware ESXi, vSphere, and vCenter entry-level triage and virtual machine support.",
      ],
    },
    {
      id: "firstlight",
      dates: "May 2022 - May 2023",
      eyebrow: "Previous role",
      company: "Firstlight Fiber",
      role: "Enterprise NOC Technician I",
      tags: ["SIP", "BGP", "MPLS", "Metaswitch", "Ribbon C15"],
      bullets: [
        "Troubleshot across OSI layers 1 through 4 using Metaswitch, Ribbon C15, Calix CMS, SolarWinds, and Planet Operate.",
        "Provisioned and supported SONET, GPON, DSL, and Active Ethernet environments including campus networks.",
        "Maintained working knowledge of SIP, MGCP, H.248, BGP, OSPF, ISIS, MPLS, IPv4 and IPv6, DNS, DHCP, SNMP, IPFIX, and NetFlow.",
      ],
    },
    {
      id: "hargray",
      dates: "Oct 2021 - May 2022",
      eyebrow: "Previous role",
      company: "Hargray Communications",
      role: "Help Desk Technician",
      tags: ["SIP", "POTS", "eMTA", "PBX", "DOCSIS"],
      bullets: [
        "Resolved voice, video, and HSI service issues via phone, email, and chat while escalating systemic incidents to the NOC.",
        "Supported voice customers across POTS, SIP, eMTA, and PBX delivery platforms.",
        "Documented interactions thoroughly enough to support escalation and audit trail requirements.",
      ],
    },
  ],
  contact: {
    eyebrow: "Contact",
    title: "Open to work that sits between live systems and cleaner product surfaces.",
    links: [
      {
        label: "Email Enrique",
        href: "mailto:enrique@carafe.one",
        kind: "primary",
      },
      {
        label: "GitHub profile",
        href: "https://github.com/midwestman35",
        kind: "secondary",
        external: true,
      },
      {
        label: "Resume",
        href: "documents/EnriqueVelazquez_Resume.docx",
        kind: "secondary",
      },
    ],
  },
  visuals: [
    {
      id: "hero",
      section: "signal",
      src: "assets/images/home/hero-operator.svg",
      alt:
        "Cinematic illustration of a dark operations environment with glowing telemetry walls and layered console light.",
    },
    {
      id: "product",
      section: "proof",
      src: "assets/images/home/product-noclense.svg",
      alt:
        "Product-style render of a NocLense diagnostic interface with logs, filters, timing traces, and highlighted operator decisions.",
    },
  ],
};
