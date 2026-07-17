/* ==========================================================
   EDIT EVERYTHING HERE — this is the only place you should
   need to touch to change links or add/remove downloads.
   ========================================================== */
const SITE = {
  // Path to your logo file inside /images (any format: png, svg, jpg...)
  logo: "images/logo.png",

  // Main "Download" pill button, top of the page
downloadButton: {
  href: "https://ts.buzzheavier.com/d/6xx9jt8i6hn8?v=xkM0ADTrN2vyYd2_Kh-bI5wr1vB1bos4F6-9X3-bzndqWdgFsuEVHzor7RrOcbWtD9nluk5f7ubcTCtxGj7SY0bqGTAt6Uw8k2NzDSOQ7XiRROL0for_NYKwn9CnCZk84jPY0QclZTm2HWo-GGAxByckN16iR2B_NjiPQ9pAk7R0giFJUx8B"
},

  // Social / external links
  discord: "dsc.gg/Valor",
  youtube: "https://www.youtube.com/@iezstreams",

  // Rows shown inside the configs menu (the grid icon, far right)
  // Add or remove entries here — the menu rebuilds itself automatically.
  configs: [
    {
      name: "Legit Config",
      tag: "FREE",
      href: "downloads/Vexor_Legit.cfg",
      filename: "Vexor_Legit.cfg"
    },
    {
      name: "Rage Config",
      tag: "FREE",
      href: "downloads/Vexor_Rage.cfg",
      filename: "Vexor_Rage.cfg"
    }
  ]
};

/* ==========================================================
   Below this line: wiring. No need to edit unless you're
   changing behavior, not just links.
   ========================================================== */

// Forces a real "Save File" download instead of the browser just
// opening/navigating to the file. The plain `download` attribute
// on <a> tags is ignored by most browsers when the page is opened
// directly from disk (file://) rather than served over http(s).
// This fetches the file as data and saves it manually instead.
function forceDownload(url, filename) {
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Could not fetch file");
      return res.blob();
    })
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    })
    .catch(() => {
      // Fallback: if fetching fails (e.g. still on file://), at least
      // navigate to the file so the user can save it manually.
      window.location.href = url;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  // Logo
  document.getElementById("main-logo").src = SITE.logo;

  // Download button
  const downloadBtn = document.getElementById("download-btn");
  downloadBtn.href = SITE.downloadButton.href;
  downloadBtn.setAttribute("download", SITE.downloadButton.filename);
  downloadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    forceDownload(SITE.downloadButton.href, SITE.downloadButton.filename);
  });

  // Socials
  document.getElementById("discord-btn").href = SITE.discord;
  document.getElementById("youtube-btn").href = SITE.youtube;

  // Build the configs menu list
  const list = document.getElementById("config-list");
  list.innerHTML = SITE.configs.map((cfg, i) => `
    <li class="config-row">
      <span class="config-row-name">
        ${cfg.name} <span class="config-tag">${cfg.tag}</span>
      </span>
      <a class="config-download" href="${cfg.href}" data-index="${i}" aria-label="Download ${cfg.name}">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </li>
  `).join("");

  // Wire up each config download link
  list.querySelectorAll(".config-download").forEach((link) => {
    const cfg = SITE.configs[Number(link.dataset.index)];
    link.addEventListener("click", (e) => {
      e.preventDefault();
      forceDownload(cfg.href, cfg.filename);
    });
  });

  // Toggle the menu on the grid button
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("config-menu");

  function openMenu() {
    menu.hidden = false;
    menuBtn.setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    menu.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
  }

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.hidden ? openMenu() : closeMenu();
  });

  // Close when clicking outside the menu
  document.addEventListener("click", (e) => {
    if (!menu.hidden && !menu.contains(e.target) && e.target !== menuBtn) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});