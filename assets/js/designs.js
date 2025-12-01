document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const cards = Array.from(document.querySelectorAll(".design_card"));
  const detailPanel = document.querySelector("[data-detail-panel]");
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImg = lightbox?.querySelector("img");
  const lightboxCaption = lightbox?.querySelector(".lightbox_caption");
  const lightboxCloseBtn = lightbox?.querySelector("[data-lightbox-close]");

  if (!detailPanel || !cards.length) {
    return;
  }

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("is-visible");
    lightbox.setAttribute("aria-hidden", "true");
    if (lightboxImg) {
      lightboxImg.src = "";
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = "";
    }
  };

  const openLightbox = (src, caption = "") => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) {
      lightboxCaption.textContent = caption;
    }
    lightbox.classList.add("is-visible");
    lightbox.setAttribute("aria-hidden", "false");
  };

  lightboxCloseBtn?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });

  const bindMediaTriggers = () => {
    document.querySelectorAll(".card_media[data-full]").forEach((media) => {
      media.addEventListener("click", (event) => {
        event.stopPropagation();
        const src = media.getAttribute("data-full");
        if (!src) return;
        const caption =
          media.getAttribute("data-caption") ||
          media.closest(".design_card")?.querySelector("h3")?.textContent ||
          "";
        openLightbox(src, caption);
      });
    });
  };

  bindMediaTriggers();

  detailPanel.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.matches(".detail_gallery img")) {
      openLightbox(target.currentSrc || target.src, target.alt || "");
    }
  });

  const revealCard = (card) => {
    cards.forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");

    const template = card.querySelector("template");
    if (!template) {
      return;
    }

    detailPanel.innerHTML = "";
    detailPanel.appendChild(template.content.cloneNode(true));
    detailPanel.classList.add("has-content");

    if (window.innerWidth < 900) {
      detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const matchesFilter = (card, filter) => {
    if (filter === "all") {
      return true;
    }
    const categories = (card.dataset.category || "")
      .split(",")
      .map((item) => item.trim());
    return categories.includes(filter);
  };

  const applyFilter = (filter) => {
    cards.forEach((card) => {
      const isMatch = matchesFilter(card, filter);
      card.classList.toggle("is-hidden", !isMatch);
    });

    const visibleCards = cards.filter(
      (card) => !card.classList.contains("is-hidden")
    );

    if (!visibleCards.length) {
      detailPanel.innerHTML =
        "<div class='detail_header'><h2>No projects yet</h2><p>Try another filter to keep exploring.</p></div>";
      return;
    }

    const selected = visibleCards.find((card) =>
      card.classList.contains("is-selected")
    );
    if (!selected) {
      revealCard(visibleCards[0]);
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");
      applyFilter(filter);
    });
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => revealCard(card));
    const button = card.querySelector(".card_button");
    if (button) {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        revealCard(card);
      });
    }
  });

  const preselected =
    document.querySelector(".design_card.is-selected") || cards[0];
  if (preselected) {
    revealCard(preselected);
  }
});

