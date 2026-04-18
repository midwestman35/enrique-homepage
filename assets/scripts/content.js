export const siteContent = {
  hero: {
    eyebrow: "NOC engineer - network and VoIP specialist",
    title: "NG911 operations, network engineering, and incident response.",
    lede:
      "I work in NOC and network operations across public safety, carrier, and cloud environments. Development work exists mainly through personal projects built around SIP, logs, and triage workflows.",
    availability: "Focused on NOC, network, VoIP, and public safety operations work.",
    primaryCta: {
      label: "Start a conversation",
      href: "mailto:enrique@carafe.one",
    },
    secondaryCta: {
      label: "GitHub",
      href: "https://github.com/midwestman35",
    },
    signalStrip: [
      {
        label: "Current",
        value: "Axon - NOC Engineer, NG911 operations",
      },
      {
        label: "Focus",
        value: "Network operations, VoIP systems, cloud monitoring",
      },
      {
        label: "Project",
        value: "NocLense - personal SIP and system log analyzer",
      },
    ],
  },
  orbit: {
    signal: {
      title: "Signal",
      copy: "Start with the core resume thesis: NOC engineering, network and VoIP specialization, and NG911 operations.",
    },
    systems: {
      title: "Systems",
      copy: "The primary work is operations engineering across public safety, carrier, and enterprise environments. Development is secondary and project-driven.",
    },
    proof: {
      title: "Proof",
      copy: "The project section stays close to the resume: one personal build rooted in SIP, logs, and NOC triage.",
    },
    trajectory: {
      title: "Trajectory",
      copy: "Each role adds more protocol depth, broader infrastructure exposure, and more operational responsibility.",
    },
    contact: {
      title: "Contact",
      copy: "Close with a direct path to the work: reach out, review the code, or open the resume.",
    },
  },
  capabilities: [
    {
      accent: "emerald",
      eyebrow: "01 - NG911 and VoIP operations",
      title: "Mission-critical call delivery, incident handling, and carrier systems.",
      summary:
        "The strongest thread in the resume is public safety and voice operations where uptime, routing, and escalation handling directly matter.",
      bullets: [
        "NG911, ANI/ALI services, SIP, MGCP, H.248",
        "Runbooks, incident triage, outage response, SLA ownership",
        "FortiGate, Digi devices, Metaswitch, Ribbon C15, CUCM",
      ],
    },
    {
      accent: "cyan",
      eyebrow: "02 - Network and cloud operations",
      title: "Monitoring, escalation, and troubleshooting across complex environments.",
      summary:
        "The day-to-day work is classic operations engineering: monitoring, troubleshooting, triage, documentation, and cross-functional escalation handling.",
      bullets: [
        "AWS, Datadog, Kibana, Rollbar, distributed system observability",
        "SD-WAN, MPLS, IPv4 and IPv6, SNMP, NetFlow, VPN",
        "Jira, Zendesk, ServiceNow, SolarWinds, VMware vSphere and ESXi",
      ],
    },
    {
      accent: "graphite",
      eyebrow: "03 - Personal project work",
      title: "Development as a side channel to operations experience.",
      summary:
        "The development story belongs here, but it should read like the resume does: one self-initiated project built around operator and triage workflows.",
      bullets: [
        "React 18, TypeScript, Vite, Electron, Node.js, Bash scripting",
        "SIP and system log analysis for NOC-style investigation work",
        "Personal project work rather than primary job function",
      ],
    },
  ],
  project: {
    eyebrow: "Personal project",
    title: "NocLense",
    summary:
      "Self-initiated SIP and system log analyzer built with React 18, TypeScript, and Vite, distributed as an Electron desktop app and deployed on Vercel.",
    link: {
      label: "View repository",
      href: "https://github.com/midwestman35/NocLense",
    },
    problem:
      "SIP and system investigations slow down when logs, context, and triage patterns live in separate places.",
    system:
      "AI-assisted context handling, faceted filtering, saved views, and a Web Worker-backed ingestion pipeline for large SIP captures.",
    outcome:
      "A personal tool that reflects the same operational priorities as the day job: speed, triage clarity, and readable signal.",
    stack: ["React 18", "TypeScript", "Vite", "Electron", "Vercel"],
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
    title: "Open to NOC, network, VoIP, and public safety operations work.",
    body:
      "The homepage should read the same way the resume does: operations engineering first, with personal project work as a secondary signal of technical curiosity and initiative.",
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
};
