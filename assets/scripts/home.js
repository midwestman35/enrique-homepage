(function () {
  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const navSections = Array.from(document.querySelectorAll("[data-nav-section]"));
  const panels = Array.from(document.querySelectorAll(".mode-panel"));
  const scrubText = document.querySelector("[data-scrub-text]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setActiveNav(sectionId) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${sectionId}`;
      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function setupNavObserver() {
    if (!("IntersectionObserver" in window)) {
      setActiveNav("signal");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveNav(visible[0].target.dataset.navSection);
        }
      },
      {
        rootMargin: "-34% 0px -38% 0px",
        threshold: [0.18, 0.45, 0.72],
      }
    );

    navSections.forEach((section) => observer.observe(section));
  }

  function activatePanel(targetPanel) {
    panels.forEach((panel) => {
      const isActive = panel === targetPanel;
      const trigger = panel.querySelector("[data-panel-trigger]");

      panel.classList.toggle("is-active", isActive);

      if (trigger) {
        trigger.setAttribute("aria-expanded", String(isActive));
      }
    });
  }

  function setupAccordion() {
    panels.forEach((panel) => {
      const trigger = panel.querySelector("[data-panel-trigger]");

      panel.addEventListener("pointerenter", (event) => {
        if (event.pointerType === "mouse") {
          activatePanel(panel);
        }
      });

      if (trigger) {
        trigger.addEventListener("click", () => activatePanel(panel));
      }
    });
  }

  function prepareScrubText() {
    if (!scrubText) {
      return [];
    }

    const words = scrubText.textContent.trim().split(/\s+/);
    const nodes = [];

    scrubText.replaceChildren();

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.dataset.word = "";
      span.textContent = word;
      scrubText.append(span);
      nodes.push(span);

      if (index < words.length - 1) {
        scrubText.append(" ");
      }
    });

    return nodes;
  }

  function setupGsapMotion(wordNodes) {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger || reduceMotion) {
      wordNodes.forEach((node) => {
        node.style.opacity = "1";
        node.style.transform = "none";
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.from("[data-hero-copy] > *", {
      y: 28,
      opacity: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
    });

    gsap.from(".hero-media", {
      scale: 0.92,
      opacity: 0,
      duration: 1.05,
      ease: "power3.out",
    });

    if (wordNodes.length > 0) {
      gsap.to(wordNodes, {
        opacity: 1,
        y: 0,
        stagger: 0.035,
        ease: "none",
        scrollTrigger: {
          trigger: scrubText,
          start: "top 78%",
          end: "bottom 42%",
          scrub: true,
        },
      });
    }

    document.querySelectorAll("[data-scale-media]").forEach((media) => {
      gsap.fromTo(
        media,
        { scale: 0.88, opacity: 0.45 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: media,
            start: "top 86%",
            end: "center 45%",
            scrub: true,
          },
        }
      );
    });

    document.querySelectorAll("[data-stack-card]").forEach((card) => {
      gsap.fromTo(
        card,
        { y: 64, scale: 0.96, opacity: 0.35 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 86%",
            end: "top 42%",
            scrub: true,
          },
        }
      );
    });

    gsap.matchMedia().add("(min-width: 900px)", () => {
      ScrollTrigger.create({
        trigger: ".experience-section",
        pin: "[data-experience-pin]",
        start: "top 96px",
        end: "bottom bottom",
        pinSpacing: false,
      });
    });
  }

  const wordNodes = prepareScrubText();
  setupAccordion();
  setupNavObserver();
  setActiveNav("signal");
  setupGsapMotion(wordNodes);
})();
