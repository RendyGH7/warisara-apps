/**
 * WARISARA — Meet the Makers Section Controller
 */

window.WARISARA_MAKERS = {
  init: function () {
    const container = document.getElementById("makers-grid");
    if (!container || !window.MAKERS_DATA) return;

    container.innerHTML = "";
    window.MAKERS_DATA.forEach((maker) => {
      const card = document.createElement("article");
      card.className = "glass-card p-6 flex flex-col justify-between";
      card.innerHTML = `
        <div>
          <div class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold text-forest-500 bg-forest-500/15 border border-forest-500/30 uppercase tracking-wider mb-2.5">${maker.role}</div>
          <h3 class="font-display text-2xl font-light text-surface mb-1">${maker.name}</h3>
          <div class="text-xs text-surface/60 mb-3 flex items-center gap-1.5">
            <span>${maker.location}</span>
            <span>•</span>
            <span class="text-terracotta-400 font-semibold">${maker.craft}</span>
          </div>
          <blockquote class="font-display italic text-sm sm:text-base text-brass-200 mb-4 leading-snug border-l-2 border-brass-400 pl-3 py-0.5">
            "${maker.quote}"
          </blockquote>
          <p class="text-xs text-surface/75 leading-relaxed font-light mb-4">${maker.story}</p>
        </div>
        <div class="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <span class="text-surface/50">Penjaga Tradisi</span>
          <span class="text-brass-300 font-semibold uppercase tracking-wider flex items-center gap-1 hover:text-brass-200 transition-colors">
            Kenali Kisah <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </span>
        </div>
      `;
      container.appendChild(card);
    });
  }
};
