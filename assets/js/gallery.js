document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const tiles = Array.from(document.querySelectorAll("[data-gallery-item]"));
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImg = lightbox?.querySelector("img");
  const lightboxCaption = lightbox?.querySelector(".lightbox_caption");
  const lightboxCloseBtn = lightbox?.querySelector("[data-lightbox-close]");

  if (!tiles.length) {
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

  const matchesFilter = (tile, filter) => {
    if (filter === "all") {
      return true;
    }
    const categories = (tile.dataset.category || "")
      .split(",")
      .map((item) => item.trim());
    return categories.includes(filter);
  };

  const applyFilter = (filter) => {
    tiles.forEach((tile) => {
      tile.classList.toggle("is-hidden", !matchesFilter(tile, filter));
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");
      applyFilter(filter);
    });
  });

  const attachTileHandlers = () => {
    tiles.forEach((tile) => {
      const media = tile.querySelector(".tile_media");
      const caption =
        media?.getAttribute("data-caption") ||
        tile.querySelector("h3")?.textContent ||
        "";
      const src =
        media?.getAttribute("data-full") ||
        media?.style.backgroundImage.replace(/url\(["']?|["']?\)/g, "") ||
        "";

      const open = () => {
        if (!src) return;
        openLightbox(src, caption);
      };

      tile.addEventListener("click", open);
      media?.addEventListener("click", (event) => {
        event.stopPropagation();
        open();
      });
    });
  };

  attachTileHandlers();
});

