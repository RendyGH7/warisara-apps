/**
 * WARISARA — From Hands to Home (Creative Economy) Section Controller
 */

window.WARISARA_ECONOMY = {
  init: function () {
    const container = document.getElementById("products-grid");
    if (!container || !window.PRODUCTS_DATA) return;

    container.innerHTML = "";
    window.PRODUCTS_DATA.forEach((prod) => {
      const card = document.createElement("article");
      card.className = "glass-card p-6 flex flex-col justify-between";
      card.innerHTML = `
        <div>
          <div class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold text-terracotta-400 bg-terracotta-500/15 border border-terracotta-500/30 uppercase tracking-wider mb-2.5">${prod.origin}</div>
          <h3 class="font-display text-2xl font-light text-surface mb-1">${prod.name}</h3>
          <div class="text-xs text-surface/60 mb-3">Oleh: <span class="text-brass-300 font-semibold">${prod.maker}</span></div>
          <div class="space-y-1.5 text-xs text-surface/80 mb-4 bg-white/5 p-3 rounded-lg border border-white/10 font-light">
            <div><strong class="text-brass-300 font-semibold">Bahan:</strong> ${prod.material}</div>
            <div><strong class="text-brass-300 font-semibold">Pengerjaan:</strong> ${prod.process}</div>
          </div>
          <p class="text-xs text-surface/70 leading-relaxed italic mb-4 font-light">"${prod.philosophy}"</p>
        </div>
        <div class="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <span class="text-forest-400 font-semibold flex items-center gap-1">
            <span class="material-symbols-outlined text-xs text-forest-400">verified</span>
            Karya Otentik
          </span>
          <span class="text-brass-300 font-semibold uppercase tracking-wider flex items-center gap-1 hover:text-brass-200 transition-colors">
            Kenali Pembuat <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </span>
        </div>
      `;
      container.appendChild(card);
    });
  }
};
