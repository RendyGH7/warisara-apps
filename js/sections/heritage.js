window.WARISARA_FEATURED_HERITAGE = {
  init: function () {
    const container = document.getElementById("featured-heritage-grid");
    if (!container || !window.HERITAGE_DATA) return;

    container.innerHTML = "";
    window.HERITAGE_DATA.forEach((item) => {
      const card = document.createElement("article");
      card.className = "glass-card p-6 flex flex-col justify-between";
      card.innerHTML = `
        <div>
          <div class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold text-terracotta-400 bg-terracotta-500/15 border border-terracotta-500/30 uppercase tracking-wider mb-2.5">${item.category}</div>
          <h3 class="font-display text-2xl font-light text-surface mb-1">${item.name}</h3>
          <div class="text-xs text-brass-400 font-medium mb-3 flex items-center gap-1">
            <span class="material-symbols-outlined text-xs text-brass-400">location_on</span>
            <span>${item.province}</span>
          </div>
          <p class="text-sm text-surface/75 font-light leading-relaxed mb-4">${item.summary}</p>
        </div>
        <div class="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
          <span class="text-surface/50">Pusaka Nusantara</span>
          <span class="text-brass-300 font-semibold uppercase tracking-wider flex items-center gap-1 hover:text-brass-200 transition-colors">
            Telusuri <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </span>
        </div>
      `;
      container.appendChild(card);
    });
  }
};
