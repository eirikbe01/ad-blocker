const SPONSORED_TERMS = [
  "Promoted", "Sponsored",          // EN
  "Sponset", "Annonse",             // NO
  "Anzeige", "Gesponsert",          // DE
  "Publicidad", "Patrocinado",      // ES
  "Sponsorisé", "Publicité"         // FR
].map(s => s.toLowerCase());

function looksSponsoredText(node) {
  const text = (node.innerText || node.textContent || "").trim().toLowerCase();
  if (!text) return false;
  if (text.length > 40) return false;
  return SPONSORED_TERMS.some(term => text === term || text.includes(term));
}

function findPostContainer(el) {
  return el.closest('article, div[data-urn^="urn:li:activity:"], div.feed-update, li.reusable-search__result-container, div.feed-shared-update-v2')
      || el.closest('[role="article"]')
      || el.closest('li, div');
}

function hideSponsored(root = document) {
  const nodes = root.querySelectorAll('span, div, time, a');
  let removed = 0;

  for (const n of nodes) {
    if (!n) continue;
    const txt = n.innerText || n.textContent || "";
    if (txt.length > 30) continue; // quick skip for large chunks
    if (looksSponsoredText(n)) {
      const post = findPostContainer(n);
      if (post && post.style.display !== "none") {
        post.style.setProperty("display", "none", "important");
        removed++;
      }
    }
  }
  return removed;
}

// Initial sweep
hideSponsored();

// Observe dynamic content (infinite scroll)
const mo = new MutationObserver(muts => {
  for (const m of muts) {
    for (const node of m.addedNodes) {
      if (node instanceof Element) hideSponsored(node);
    }
  }
});
mo.observe(document.documentElement, { childList: true, subtree: true });

// Low-frequency safety sweep
setInterval(() => hideSponsored(), 3000);
