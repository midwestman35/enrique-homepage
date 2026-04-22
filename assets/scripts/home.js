import { siteContent } from "./content.js";

function getRequiredElement(id) {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Missing required element: #${id}`);
  }

  return element;
}

function createNode(tagName, className, textContent) {
  const node = document.createElement(tagName);

  if (className) {
    node.className = className;
  }

  if (textContent !== undefined) {
    node.textContent = textContent;
  }

  return node;
}

function setToggleLabel(button, isExpanded) {
  const label = button.querySelector("span");

  if (label) {
    label.textContent = isExpanded ? "Hide details" : "View details";
  }
}

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

function getVisualById(id) {
  return siteContent.visuals.find((visual) => visual.id === id) ?? null;
}

function readSessionValue(key) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSessionValue(key, value) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Ignore storage failures so the splash screen still resolves cleanly.
  }
}

const body = document.body;
const splashScreen = getRequiredElement("splashScreen");
const splashLabel = getRequiredElement("splashLabel");
const splashStatus = getRequiredElement("splashStatus");
const splashTask = getRequiredElement("splashTask");
const splashMeta = getRequiredElement("splashMeta");
const splashPercent = getRequiredElement("splashPercent");
const splashProgressFill = getRequiredElement("splashProgressFill");
const heroEyebrow = getRequiredElement("heroEyebrow");
const heroTitle = getRequiredElement("heroTitle");
const heroLede = getRequiredElement("heroLede");
const heroAvailability = getRequiredElement("heroAvailability");
const heroPrimaryCta = getRequiredElement("heroPrimaryCta");
const heroSecondaryCta = getRequiredElement("heroSecondaryCta");
const heroMetrics = getRequiredElement("heroMetrics");
const heroVisual = getRequiredElement("heroVisual");
const projectEyebrow = getRequiredElement("projectEyebrow");
const projectTitle = getRequiredElement("projectTitle");
const projectSummary = getRequiredElement("projectSummary");
const projectProblem = getRequiredElement("projectProblem");
const projectSystem = getRequiredElement("projectSystem");
const projectOutcome = getRequiredElement("projectOutcome");
const projectLink = getRequiredElement("projectLink");
const projectStack = getRequiredElement("projectStack");
const projectVisual = getRequiredElement("projectVisual");
const trajectoryEyebrow = getRequiredElement("trajectoryEyebrow");
const trajectoryTitle = getRequiredElement("trajectoryTitle");
const trajectoryList = getRequiredElement("trajectoryList");
const contactEyebrow = getRequiredElement("contactEyebrow");
const contactTitle = getRequiredElement("contactTitle");
const contactActions = getRequiredElement("contactActions");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = Array.from(document.querySelectorAll("[data-nav-section]"));

function renderSplash() {
  const { splash } = siteContent;

  splashLabel.textContent = splash.label;
  splashStatus.textContent = splash.status;
  splashTask.textContent = splash.task;
  splashMeta.textContent = splash.meta;
  splashPercent.textContent = `${splash.progressSteps[0]}%`;
  splashProgressFill.style.setProperty("--splash-progress", `${splash.progressSteps[0]}%`);
}

function setupSplashScreen() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasSeenSplash = readSessionValue("ev-home-splash-seen") === "true";
  const minDuration = hasSeenSplash || reduceMotion ? 140 : 1050;
  const progressSteps = siteContent.splash.progressSteps;
  const stepDuration = Math.max(90, Math.floor(minDuration / progressSteps.length));
  const start = window.performance.now();
  let didFinish = false;
  let intervalId = null;

  body.classList.add("is-splash-active");

  intervalId = window.setInterval(() => {
    const elapsed = window.performance.now() - start;
    const stepIndex = Math.min(
      progressSteps.length - 1,
      Math.floor(elapsed / stepDuration)
    );
    const currentValue = progressSteps[stepIndex];

    splashPercent.textContent = `${currentValue}%`;
    splashProgressFill.style.setProperty("--splash-progress", `${currentValue}%`);

    if (stepIndex === progressSteps.length - 1) {
      window.clearInterval(intervalId);
    }
  }, stepDuration);

  function finishSplash() {
    if (didFinish) {
      return;
    }

    didFinish = true;
    window.clearInterval(intervalId);

    const elapsed = window.performance.now() - start;
    const remaining = Math.max(0, minDuration - elapsed);

    window.setTimeout(() => {
      splashPercent.textContent = `${progressSteps[progressSteps.length - 1]}%`;
      splashProgressFill.style.setProperty(
        "--splash-progress",
        `${progressSteps[progressSteps.length - 1]}%`
      );

      window.setTimeout(() => {
        splashScreen.classList.add("is-hidden");
        splashScreen.setAttribute("aria-hidden", "true");
        body.classList.remove("is-splash-active");
        writeSessionValue("ev-home-splash-seen", "true");

        window.setTimeout(() => {
          splashScreen.remove();
        }, reduceMotion ? 0 : 420);
      }, reduceMotion ? 0 : 110);
    }, remaining);
  }

  if (document.readyState === "complete") {
    finishSplash();
  } else {
    window.addEventListener("load", finishSplash, { once: true });
  }

  // Fallback so the overlay cannot stall indefinitely.
  window.setTimeout(finishSplash, 1800);
}

function renderHero() {
  const { hero } = siteContent;
  const heroVisualData = getVisualById("hero");

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

  heroMetrics.replaceChildren(
    ...hero.metrics.map((metric) => {
      const item = createNode("li", "hero-metric");

      item.append(
        createNode("span", "hero-metric__label", metric.label),
        createNode("strong", "hero-metric__value", metric.value),
        createNode("p", "hero-metric__detail", metric.detail)
      );

      return item;
    })
  );

  if (heroVisualData) {
    heroVisual.src = heroVisualData.src;
    heroVisual.alt = heroVisualData.alt;
  }
}

function renderProject() {
  const { project } = siteContent;
  const projectVisualData = getVisualById("product");

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

  projectStack.replaceChildren(
    ...project.stack.map((item) => createNode("li", "", item))
  );

  if (projectVisualData) {
    projectVisual.src = projectVisualData.src;
    projectVisual.alt = projectVisualData.alt;
  }
}

function renderTrajectoryHeading() {
  const { trajectorySection } = siteContent;

  trajectoryEyebrow.textContent = trajectorySection.eyebrow;
  trajectoryTitle.textContent = trajectorySection.title;
}

function createTrajectoryItem(item, isOpen) {
  const panelId = `trajectory-panel-${item.id}`;
  const card = createNode(
    "article",
    isOpen ? "trajectory-card trajectory-card--open" : "trajectory-card"
  );
  const shell = createNode("div", "trajectory-card__shell");
  const meta = createNode("div", "trajectory-card__meta");
  const main = createNode("div", "trajectory-card__main");
  const button = createNode("button", "trajectory-toggle");
  const panel = createNode("div", "trajectory-panel");
  const tags = createNode("ul", "trajectory-tags");
  const points = createNode("ul", "trajectory-points");

  card.dataset.trajectoryItem = "";
  meta.append(
    createNode("p", "trajectory-card__dates", item.dates),
    createNode("p", "trajectory-card__eyebrow", item.eyebrow)
  );
  main.append(
    createNode("h3", "", item.company),
    createNode("p", "trajectory-card__role", item.role)
  );

  button.type = "button";
  button.setAttribute("aria-expanded", String(isOpen));
  button.setAttribute("aria-controls", panelId);
  button.append(createNode("span"));
  setToggleLabel(button, isOpen);

  tags.append(...item.tags.map((tag) => createNode("li", "", tag)));
  points.append(...item.bullets.map((bullet) => createNode("li", "", bullet)));

  panel.id = panelId;
  panel.hidden = !isOpen;
  panel.append(tags, points);

  shell.append(meta, main, button);
  card.append(shell, panel);

  return card;
}

function renderTrajectory() {
  trajectoryList.replaceChildren(
    ...siteContent.trajectory.map((item, index) =>
      createTrajectoryItem(item, index === 0)
    )
  );
}

function renderContact() {
  const { contact } = siteContent;

  contactEyebrow.textContent = contact.eyebrow;
  contactTitle.textContent = contact.title;

  contactActions.replaceChildren(
    ...contact.links.map((link) => {
      const anchor = createNode("a", `button button--${link.kind}`, link.label);

      anchor.href = link.href;

      if (link.external) {
        anchor.target = "_blank";
        anchor.rel = "noreferrer noopener";
      }

      return anchor;
    })
  );
}

function setActiveNavState(key) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${key}`;

    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
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
      setToggleLabel(button, isTarget);
      panel.hidden = !isTarget;
    });
  }

  cards.forEach((card) => {
    const button = card.querySelector(".trajectory-toggle");

    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";

      if (expanded) {
        button.setAttribute("aria-expanded", "false");
        setToggleLabel(button, false);
        card.classList.remove("trajectory-card--open");
        card.querySelector(".trajectory-panel").hidden = true;
        return;
      }

      openCard(card);
    });
  });
}

function setupSectionObserver() {
  if (!("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        setActiveNavState(visible[0].target.dataset.navSection);
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

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

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
      threshold: 0.16,
    }
  );

  revealTargets.forEach((target) => observer.observe(target));
}

renderSplash();
renderHero();
renderProject();
renderTrajectoryHeading();
renderTrajectory();
renderContact();
setActiveNavState("signal");
setupSplashScreen();
setupTrajectoryAccordion();
setupSectionObserver();
setupSectionReveal();
