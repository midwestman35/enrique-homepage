import { siteContent } from "./content.js";

const heroEyebrow = document.getElementById("heroEyebrow");
const heroTitle = document.getElementById("heroTitle");
const heroLede = document.getElementById("heroLede");
const heroAvailability = document.getElementById("heroAvailability");
const heroPrimaryCta = document.getElementById("heroPrimaryCta");
const heroSecondaryCta = document.getElementById("heroSecondaryCta");
const signalStrip = document.getElementById("signalStrip");
const capabilityGrid = document.getElementById("capabilityGrid");
const projectEyebrow = document.getElementById("projectEyebrow");
const projectTitle = document.getElementById("projectTitle");
const projectSummary = document.getElementById("projectSummary");
const projectProblem = document.getElementById("projectProblem");
const projectSystem = document.getElementById("projectSystem");
const projectOutcome = document.getElementById("projectOutcome");
const projectLink = document.getElementById("projectLink");
const projectStack = document.getElementById("projectStack");
const trajectoryList = document.getElementById("trajectoryList");
const contactTitle = document.getElementById("contactTitle");
const contactBody = document.getElementById("contactBody");
const contactActions = document.getElementById("contactActions");
const orbitReadoutTitle = document.getElementById("orbitReadoutTitle");
const orbitReadoutCopy = document.getElementById("orbitReadoutCopy");
const orbitLegend = document.getElementById("orbitLegend");
const orbitHalo = document.getElementById("orbitHalo");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));

const sections = Array.from(document.querySelectorAll("[data-orbit-section]"));
const orbitNodes = Array.from(document.querySelectorAll("[data-node]"));

function setLinkAttributes(linkEl, linkData) {
  linkEl.textContent = linkData.label;
  linkEl.href = linkData.href;

  if (linkData.external) {
    linkEl.target = "_blank";
    linkEl.rel = "noreferrer noopener";
  } else {
    linkEl.removeAttribute("target");
    linkEl.removeAttribute("rel");
  }
}

function renderHero() {
  const { hero } = siteContent;

  heroEyebrow.textContent = hero.eyebrow;
  heroTitle.textContent = hero.title;
  heroLede.textContent = hero.lede;
  heroAvailability.textContent = hero.availability;

  setLinkAttributes(heroPrimaryCta, hero.primaryCta);
  heroPrimaryCta.className = "button button--primary";

  setLinkAttributes(heroSecondaryCta, {
    ...hero.secondaryCta,
    external: true,
  });
  heroSecondaryCta.className = "button button--secondary";

  signalStrip.innerHTML = hero.signalStrip
    .map(
      (item) => `
        <li class="signal-strip__item">
          <span class="signal-strip__label">${item.label}</span>
          <strong>${item.value}</strong>
        </li>
      `
    )
    .join("");
}

function renderCapabilities() {
  capabilityGrid.innerHTML = siteContent.capabilities
    .map(
      (capability) => `
        <article class="evidence-card capability-card capability-card--${capability.accent}">
          <p class="capability-card__eyebrow">${capability.eyebrow}</p>
          <h3>${capability.title}</h3>
          <p>${capability.summary}</p>
          <ul>
            ${capability.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
          </ul>
        </article>
      `
    )
    .join("");
}

function renderProject() {
  const { project } = siteContent;

  projectEyebrow.textContent = project.eyebrow;
  projectTitle.textContent = project.title;
  projectSummary.textContent = project.summary;
  projectProblem.textContent = project.problem;
  projectSystem.textContent = project.system;
  projectOutcome.textContent = project.outcome;
  projectLink.textContent = project.link.label;
  projectLink.href = project.link.href;
  projectLink.target = "_blank";
  projectLink.rel = "noreferrer noopener";

  projectStack.innerHTML = project.stack.map((item) => `<li>${item}</li>`).join("");
}

function trajectoryItemMarkup(item, isOpen) {
  const panelId = `trajectory-panel-${item.id}`;
  const expanded = isOpen ? "true" : "false";
  const hidden = isOpen ? "" : " hidden";
  const cardClass = isOpen
    ? "rail-item trajectory-card trajectory-card--open"
    : "rail-item trajectory-card";

  return `
    <article class="${cardClass}" data-trajectory-item>
      <div class="trajectory-card__shell">
        <div class="trajectory-card__meta">
          <p class="trajectory-card__dates">${item.dates}</p>
          <p class="trajectory-card__eyebrow">${item.eyebrow}</p>
        </div>
        <div class="trajectory-card__main">
          <h3>${item.company}</h3>
          <p class="trajectory-card__role">${item.role}</p>
        </div>
        <button
          class="trajectory-toggle"
          type="button"
          aria-expanded="${expanded}"
          aria-controls="${panelId}"
        >
          <span>View scope</span>
        </button>
      </div>
      <div class="trajectory-panel" id="${panelId}"${hidden}>
        <ul class="trajectory-tags">
          ${item.tags.map((tag) => `<li>${tag}</li>`).join("")}
        </ul>
        <ul class="trajectory-points">
          ${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
        </ul>
      </div>
    </article>
  `;
}

function renderTrajectory() {
  trajectoryList.innerHTML = siteContent.trajectory
    .map((item, index) => trajectoryItemMarkup(item, index === 0))
    .join("");
}

function renderContact() {
  const { contact } = siteContent;

  contactTitle.textContent = contact.title;
  contactBody.textContent = contact.body;

  contactActions.innerHTML = contact.links
    .map((link) => {
      const rel = link.external ? ' target="_blank" rel="noreferrer noopener"' : "";
      return `<a class="button button--${link.kind}" href="${link.href}"${rel}>${link.label}</a>`;
    })
    .join("");
}

function setActiveOrbitState(key) {
  const orbitContent = siteContent.orbit[key];

  if (!orbitContent) {
    return;
  }

  orbitReadoutTitle.textContent = orbitContent.title;
  orbitReadoutCopy.textContent = orbitContent.copy;

  Array.from(orbitLegend.children).forEach((item) => {
    item.classList.toggle("is-active", item.dataset.step === key);
    if (item.dataset.step === key) {
      item.setAttribute("aria-current", "step");
    } else {
      item.removeAttribute("aria-current");
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${key}`;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  orbitNodes.forEach((node) => {
    node.classList.toggle("orbit-node--active", node.dataset.node === key);
  });

  const activeNode = orbitNodes.find((node) => node.dataset.node === key);
  if (activeNode && orbitHalo) {
    orbitHalo.setAttribute(
      "transform",
      `translate(${activeNode.dataset.x} ${activeNode.dataset.y})`
    );
  }
}

function setupTrajectoryAccordion() {
  const cards = Array.from(trajectoryList.querySelectorAll("[data-trajectory-item]"));

  function openCard(targetCard) {
    cards.forEach((card) => {
      const button = card.querySelector(".trajectory-toggle");
      const panel = card.querySelector(".trajectory-panel");
      const isTarget = card === targetCard;

      card.classList.toggle("trajectory-card--open", isTarget);
      button.setAttribute("aria-expanded", isTarget ? "true" : "false");
      panel.hidden = !isTarget;
    });
  }

  cards.forEach((card) => {
    const button = card.querySelector(".trajectory-toggle");
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      if (expanded) {
        button.setAttribute("aria-expanded", "false");
        card.classList.remove("trajectory-card--open");
        card.querySelector(".trajectory-panel").hidden = true;
        return;
      }

      openCard(card);
    });
  });
}

function setupOrbitObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        setActiveOrbitState(visible[0].target.dataset.orbitSection);
      }
    },
    {
      rootMargin: "-32% 0px -32% 0px",
      threshold: [0.25, 0.55, 0.8],
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupSectionReveal() {
  const revealTargets = Array.from(document.querySelectorAll("[data-reveal]"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealTargets.forEach((target) => observer.observe(target));
}

renderHero();
renderCapabilities();
renderProject();
renderTrajectory();
renderContact();
setActiveOrbitState("signal");
setupTrajectoryAccordion();
setupOrbitObserver();
setupSectionReveal();
