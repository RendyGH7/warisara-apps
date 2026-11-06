const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('📜 WBTb Indonesia', '<span class="material-symbols-outlined text-[11px]">verified</span><span>WBTb Indonesia</span>');
html = html.replace('📜 WBTb Indonesia', '<span class="material-symbols-outlined text-[11px]">verified</span><span>WBTb Indonesia</span>');
html = html.replace('⭐ UNESCO Living Heritage', '<span class="material-symbols-outlined text-[11px]">award_star</span><span>UNESCO Living Heritage</span>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Cleaned emojis in index.html');
