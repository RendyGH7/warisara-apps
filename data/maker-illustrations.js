(function () {
  "use strict";

  const illustrations = {

    "maker-aceh": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="aceh-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#140E0A"/>
            <stop offset="50%" stop-color="#24160E"/>
            <stop offset="100%" stop-color="#0F0B08"/>
          </linearGradient>
          <linearGradient id="aceh-fire" x1="200" y1="220" x2="200" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#FF3B00" stop-opacity="0.8"/>
            <stop offset="60%" stop-color="#FF9500" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#FFD600" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="aceh-blade" x1="120" y1="80" x2="290" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#FFFDF7"/>
            <stop offset="35%" stop-color="#E5C384"/>
            <stop offset="70%" stop-color="#8E6930"/>
            <stop offset="100%" stop-color="#3D2912"/>
          </linearGradient>
          <radialGradient id="aceh-glow" cx="200" cy="130" r="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#C9A567" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#C9A567" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="240" fill="url(#aceh-bg)"/>
        <circle cx="200" cy="130" r="120" fill="url(#aceh-glow)"/>
        <!-- Islamic Arabesque Arc & Besalen Arch -->
        <path d="M60 240V130C60 70 120 40 200 40C280 40 340 70 340 130V240" stroke="#C9A567" stroke-opacity="0.15" stroke-width="1.5" stroke-dasharray="4 4"/>
        <path d="M100 240V140C100 90 145 65 200 65C255 65 300 90 300 140V240" stroke="#C9A567" stroke-opacity="0.1" stroke-width="1"/>
        <!-- Forge Embers Glow -->
        <circle cx="200" cy="200" r="70" fill="url(#aceh-fire)"/>
        <rect x="150" y="190" width="100" height="30" rx="6" fill="#1C1814" stroke="#C9A567" stroke-opacity="0.3"/>
        <!-- Pucuk Rebung Border Accents -->
        <g opacity="0.2" stroke="#C9A567" stroke-width="1">
          <path d="M20 220L30 200L40 220L50 200L60 220"/>
          <path d="M340 220L350 200L360 220L370 200L380 220"/>
        </g>
        <!-- Rencong Meucugek Silhouette & Details -->
        <!-- Curved Hulu (Handle - Meucugek horn handle) -->
        <path d="M100 70C110 55 130 50 145 65C155 75 150 95 140 105L160 115L150 130L125 115C115 125 95 120 90 100C85 85 92 78 100 70Z" fill="#3E2713" stroke="#C9A567" stroke-width="1.5"/>
        <circle cx="120" cy="85" r="4" fill="#C9A567"/>
        <!-- Forged Blade with Arabic Ba curvature -->
        <path d="M160 115C190 125 240 125 285 105C295 102 310 100 320 102C310 112 285 128 250 138C205 150 168 135 150 130L160 115Z" fill="url(#aceh-blade)" stroke="#FFE8B5" stroke-width="1.5"/>
        <path d="M170 122C210 132 260 128 290 112" stroke="#FFFFFF" stroke-opacity="0.7" stroke-width="1"/>
        <!-- Hammer & Sparks -->
        <circle cx="240" cy="90" r="1.5" fill="#FFEAA7"/>
        <circle cx="270" cy="80" r="2" fill="#FFD166"/>
        <circle cx="290" cy="95" r="1" fill="#FF9F43"/>
        <circle cx="180" cy="85" r="1.5" fill="#FFD166"/>
      </svg>
    `,

    "maker-sumatera-utara": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="su-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1A0D0D"/>
            <stop offset="50%" stop-color="#2D1115"/>
            <stop offset="100%" stop-color="#120A0B"/>
          </linearGradient>
          <linearGradient id="su-ulos" x1="80" y1="60" x2="320" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#8B1515"/>
            <stop offset="30%" stop-color="#C22020"/>
            <stop offset="50%" stop-color="#1F1A1B"/>
            <stop offset="70%" stop-color="#C22020"/>
            <stop offset="100%" stop-color="#8B1515"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#su-bg)"/>
        <!-- Batak Gorga Decorative Wave Motif -->
        <path d="M20 50C60 30 100 70 140 50C180 30 220 70 260 50C300 30 340 70 380 50" stroke="#C9A567" stroke-opacity="0.2" stroke-width="1.5" fill="none"/>
        <path d="M20 190C60 170 100 210 140 190C180 170 220 210 260 190C300 170 340 210 380 190" stroke="#C9A567" stroke-opacity="0.2" stroke-width="1.5" fill="none"/>
        <!-- Gedogan Loom Wood Frame (Baliga & Porapora) -->
        <rect x="70" y="45" width="12" height="150" rx="3" fill="#3D2619" stroke="#C9A567" stroke-opacity="0.4"/>
        <rect x="318" y="45" width="12" height="150" rx="3" fill="#3D2619" stroke="#C9A567" stroke-opacity="0.4"/>
        <!-- Tension Warp Threads -->
        <g stroke="#E5C384" stroke-opacity="0.15" stroke-width="1">
          <line x1="82" y1="70" x2="318" y2="70"/>
          <line x1="82" y1="85" x2="318" y2="85"/>
          <line x1="82" y1="100" x2="318" y2="100"/>
          <line x1="82" y1="115" x2="318" y2="115"/>
          <line x1="82" y1="130" x2="318" y2="130"/>
          <line x1="82" y1="145" x2="318" y2="145"/>
          <line x1="82" y1="160" x2="318" y2="160"/>
          <line x1="82" y1="175" x2="318" y2="175"/>
        </g>
        <!-- Woven Ulos Pinuncaan Textile Centerpiece -->
        <rect x="110" y="65" width="180" height="110" rx="4" fill="url(#su-ulos)" stroke="#C9A567" stroke-opacity="0.4"/>
        <!-- Geometric Diamond & Arrow Weft Patterns -->
        <g fill="#E5C384" fill-opacity="0.85">
          <polygon points="200,80 210,95 200,110 190,95"/>
          <polygon points="160,105 170,120 160,135 150,120"/>
          <polygon points="240,105 250,120 240,135 230,120"/>
          <polygon points="200,130 210,145 200,160 190,145"/>
        </g>
        <!-- Wooden Sword Beater (Baliga Kayu) -->
        <rect x="135" y="55" width="8" height="130" rx="2" fill="#5A3A25" stroke="#C9A567" stroke-width="1" transform="rotate(-6 135 55)"/>
        <!-- Fringes (Rambu Ulos) -->
        <path d="M290 70L310 70 M290 90L310 90 M290 110L310 110 M290 130L310 130 M290 150L310 150 M290 170L310 170" stroke="#E5C384" stroke-width="1.5" stroke-dasharray="3 3"/>
      </svg>
    `,

    "maker-sumatera-barat": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="sb-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1F0910"/>
            <stop offset="60%" stop-color="#3A101C"/>
            <stop offset="100%" stop-color="#15060A"/>
          </linearGradient>
          <linearGradient id="sb-gold" x1="100" y1="80" x2="300" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#FCEABB"/>
            <stop offset="50%" stop-color="#DDA13E"/>
            <stop offset="100%" stop-color="#8E5B18"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#sb-bg)"/>
        <!-- Rumah Gadang Gonjong Roof Silhouette Backdrop -->
        <path d="M70 120C100 80 130 50 140 25C145 60 170 95 200 100C230 95 255 60 260 25C270 50 300 80 330 120" stroke="#C9A567" stroke-opacity="0.25" stroke-width="2" fill="none"/>
        <!-- Golden Weaving Shuttle (Taropong Kayu) -->
        <path d="M90 160C140 145 260 145 310 160C260 175 140 175 90 160Z" fill="#3D2415" stroke="#C9A567" stroke-width="1.5"/>
        <ellipse cx="200" cy="160" rx="35" ry="5" fill="#E5C384"/>
        <line x1="170" y1="160" x2="230" y2="160" stroke="#8E5B18" stroke-width="2"/>
        <!-- Songket Balapak Tapestry Panel with Kaluak Paku Motifs -->
        <rect x="110" y="70" width="180" height="65" rx="3" fill="#4A1220" stroke="#C9A567" stroke-opacity="0.5"/>
        <!-- Kaluak Paku (Curled Fern) Gold Motifs -->
        <g stroke="url(#sb-gold)" stroke-width="1.5" fill="none">
          <path d="M140 105C140 90 155 85 160 95C163 102 158 108 152 105C148 103 148 98 152 96"/>
          <path d="M190 105C190 90 205 85 210 95C213 102 208 108 202 105C198 103 198 98 202 96"/>
          <path d="M240 105C240 90 255 85 260 95C263 102 258 108 252 105C248 103 248 98 252 96"/>
        </g>
        <!-- Golden Thread Lattice Rays -->
        <line x1="200" y1="160" x2="200" y2="135" stroke="#E5C384" stroke-width="1" stroke-dasharray="2 2"/>
        <line x1="160" y1="160" x2="140" y2="135" stroke="#E5C384" stroke-width="1" stroke-dasharray="2 2"/>
        <line x1="240" y1="160" x2="260" y2="135" stroke="#E5C384" stroke-width="1" stroke-dasharray="2 2"/>
      </svg>
    `,

    "maker-riau": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="riau-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#0E1E14"/>
            <stop offset="60%" stop-color="#163824"/>
            <stop offset="100%" stop-color="#09140D"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#riau-bg)"/>
        <!-- Siak Palace Arabesque Arch Outline -->
        <path d="M80 240V120C80 60 140 40 200 40C260 40 320 60 320 120V240" stroke="#E5C384" stroke-opacity="0.2" stroke-width="1.5"/>
        <path d="M120 240V140C120 90 160 70 200 70C240 70 280 90 280 140V240" stroke="#E5C384" stroke-opacity="0.1" stroke-width="1"/>
        <!-- Pucuk Rebung Chevron Rows (Chevron Triangles in Yellow Gold) -->
        <g fill="#DDA13E" fill-opacity="0.8">
          <polygon points="200,75 212,110 188,110"/>
          <polygon points="160,95 172,130 148,130"/>
          <polygon points="240,95 252,130 228,130"/>
          <polygon points="120,115 132,150 108,150"/>
          <polygon points="280,115 292,150 268,150"/>
        </g>
        <g stroke="#FCEABB" stroke-width="1.2">
          <path d="M188 110L200 80L212 110"/>
          <path d="M148 130L160 100L172 130"/>
          <path d="M228 130L240 100L252 130"/>
        </g>
        <!-- Golden Silk Spool (Kelos Benang Emas) -->
        <rect x="175" y="165" width="50" height="25" rx="4" fill="#C9A567" stroke="#FFF" stroke-width="1"/>
        <line x1="160" y1="177" x2="240" y2="177" stroke="#684518" stroke-width="4"/>
        <circle cx="160" cy="177" r="8" fill="#3D2714"/>
        <circle cx="240" cy="177" r="8" fill="#3D2714"/>
      </svg>
    `,

    "maker-kepulauan-riau": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="kr-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#0A1828"/>
            <stop offset="60%" stop-color="#132B45"/>
            <stop offset="100%" stop-color="#07101C"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#kr-bg)"/>
        <!-- Soft Sea Waves Lines (Kepulauan Riau Waters) -->
        <path d="M0 190C60 180 120 200 180 190C240 180 300 200 360 190C380 186 400 188 400 188" stroke="#1D4E89" stroke-opacity="0.4" stroke-width="2"/>
        <path d="M0 215C60 205 120 225 180 215C240 205 300 225 360 215C380 211 400 213 400 213" stroke="#1D4E89" stroke-opacity="0.3" stroke-width="1.5"/>
        <!-- Sheer Tudung Manto Silk Veil Drape -->
        <path d="M120 60C160 45 240 45 280 60C310 90 320 150 300 180C280 195 240 180 200 185C160 180 120 195 100 180C80 150 90 90 120 60Z" fill="#F8F9FA" fill-opacity="0.12" stroke="#E5C384" stroke-width="1.5"/>
        <!-- Embroidered Kelingan Motif (Silver & Gold Spangles) -->
        <g fill="#E5C384">
          <circle cx="160" cy="90" r="3"/>
          <circle cx="200" cy="80" r="4"/>
          <circle cx="240" cy="90" r="3"/>
          <circle cx="140" cy="120" r="3.5"/>
          <circle cx="180" cy="115" r="4"/>
          <circle cx="220" cy="115" r="4"/>
          <circle cx="260" cy="120" r="3.5"/>
          <circle cx="160" cy="145" r="3"/>
          <circle cx="200" cy="140" r="4.5"/>
          <circle cx="240" cy="145" r="3"/>
        </g>
        <!-- Fine Embroidery Needle (Jarum Goyang Emas) -->
        <line x1="280" y1="50" x2="225" y2="105" stroke="#FFFFFF" stroke-width="1.5"/>
        <circle cx="282" cy="48" r="2" fill="#E5C384"/>
        <path d="M285 46C295 38 310 42 320 35" stroke="#E5C384" stroke-width="1" stroke-dasharray="2 2" fill="none"/>
      </svg>
    `,

    "maker-jambi": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="jambi-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#241009"/>
            <stop offset="60%" stop-color="#421E12"/>
            <stop offset="100%" stop-color="#1A0B06"/>
          </linearGradient>
          <linearGradient id="jambi-sepang" x1="120" y1="120" x2="280" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#C85A32"/>
            <stop offset="50%" stop-color="#E58250"/>
            <stop offset="100%" stop-color="#C85A32"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#jambi-bg)"/>
        <!-- Meandering Batanghari River Waves Silhouette -->
        <path d="M0 80C100 120 160 50 240 80C320 110 350 70 400 90" stroke="#C85A32" stroke-opacity="0.25" stroke-width="3" fill="none"/>
        <path d="M0 160C100 200 160 130 240 160C320 190 350 150 400 170" stroke="#C85A32" stroke-opacity="0.25" stroke-width="3" fill="none"/>
        <!-- Batik Fabric Panel (Motif Batanghari) -->
        <rect x="110" y="55" width="180" height="130" rx="6" fill="#33170E" stroke="#E5C384" stroke-opacity="0.3"/>
        <!-- Kapal Sanggat & Tampuk Manggis Batik Motifs -->
        <g stroke="url(#jambi-sepang)" stroke-width="2" fill="none">
          <circle cx="160" cy="120" r="18"/>
          <path d="M160 102V138 M142 120H178"/>
          <circle cx="240" cy="120" r="18"/>
          <path d="M240 102V138 M222 120H258"/>
          <path d="M178 120C190 110 210 110 222 120"/>
        </g>
        <!-- Copper Canting with Hot Wax Drip -->
        <path d="M260 80L285 65C290 62 295 65 295 70L290 85L270 95Z" fill="#C9A567" stroke="#FFF" stroke-width="1"/>
        <path d="M260 80C250 85 245 92 242 100" stroke="#C9A567" stroke-width="2" fill="none"/>
        <circle cx="242" cy="102" r="2.5" fill="#FFB703"/>
      </svg>
    `,

    "maker-sumatera-selatan": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="ss-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1A080C"/>
            <stop offset="50%" stop-color="#3D0B16"/>
            <stop offset="100%" stop-color="#140509"/>
          </linearGradient>
          <linearGradient id="ss-gold" x1="120" y1="60" x2="280" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#FFF2A3"/>
            <stop offset="40%" stop-color="#E5B842"/>
            <stop offset="100%" stop-color="#996F15"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#ss-bg)"/>
        <!-- Jembatan Ampera Bridge Towers Silhouette Backdrop -->
        <g stroke="#C9A567" stroke-opacity="0.18" stroke-width="1.5">
          <line x1="80" y1="180" x2="80" y2="70"/>
          <line x1="95" y1="180" x2="95" y2="70"/>
          <line x1="80" y1="90" x2="95" y2="90"/>
          <line x1="305" y1="180" x2="305" y2="70"/>
          <line x1="320" y1="180" x2="320" y2="70"/>
          <line x1="305" y1="90" x2="320" y2="90"/>
          <line x1="50" y1="150" x2="350" y2="150"/>
        </g>
        <!-- Songket Lepus Panel (100% Gilded Gold Thread Fill) -->
        <rect x="115" y="60" width="170" height="120" rx="4" fill="#5E0F20" stroke="url(#ss-gold)" stroke-width="2"/>
        <!-- Bintang Berantai Interlocking Star Lattice -->
        <g stroke="url(#ss-gold)" stroke-width="1.8" fill="none">
          <!-- Star Center 1 -->
          <polygon points="160,95 167,110 182,110 170,119 174,134 160,125 146,134 150,119 138,110 153,110" fill="#E5B842" fill-opacity="0.3"/>
          <!-- Star Center 2 -->
          <polygon points="240,95 247,110 262,110 250,119 254,134 240,125 226,134 230,119 218,110 233,110" fill="#E5B842" fill-opacity="0.3"/>
          <!-- Chain Links (Berantai) -->
          <circle cx="200" cy="115" r="14"/>
          <circle cx="200" cy="115" r="8"/>
        </g>
        <circle cx="160" cy="114" r="3" fill="#FFF"/>
        <circle cx="240" cy="114" r="3" fill="#FFF"/>
      </svg>
    `,

    "maker-bangka-belitung": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="bb-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#091D21"/>
            <stop offset="60%" stop-color="#123B44"/>
            <stop offset="100%" stop-color="#08181C"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#bb-bg)"/>
        <!-- Belitung Granite Boulders Silhouette -->
        <path d="M40 210C60 170 110 175 130 210Z" fill="#1C383D" opacity="0.6"/>
        <path d="M280 210C300 160 360 165 380 210Z" fill="#1C383D" opacity="0.6"/>
        <!-- Kain Cual Woven Panel -->
        <rect x="110" y="55" width="180" height="130" rx="4" fill="#0E2F37" stroke="#E5C384" stroke-width="1.5"/>
        <!-- Kembang Kenanga & Bebek Berseluk Motif -->
        <g stroke="#E5C384" stroke-width="1.8" fill="none">
          <!-- Central Diamond -->
          <polygon points="200,80 235,120 200,160 165,120"/>
          <polygon points="200,92 223,120 200,148 177,120"/>
          <circle cx="200" cy="120" r="5" fill="#E5C384"/>
          <!-- 4 Blooming Petals (Kenanga) -->
          <path d="M200 65V80 M200 160V175 M150 120H165 M235 120H250"/>
        </g>
        <g fill="#48CAE4" opacity="0.7">
          <circle cx="140" cy="85" r="3"/>
          <circle cx="260" cy="85" r="3"/>
          <circle cx="140" cy="155" r="3"/>
          <circle cx="260" cy="155" r="3"/>
        </g>
      </svg>
    `,

    "maker-bengkulu": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="bkl-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#141E15"/>
            <stop offset="60%" stop-color="#1E3823"/>
            <stop offset="100%" stop-color="#0E160F"/>
          </linearGradient>
          <radialGradient id="raf-petal" cx="200" cy="120" r="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#FF5A36"/>
            <stop offset="70%" stop-color="#B22204"/>
            <stop offset="100%" stop-color="#5E1102"/>
          </radialGradient>
        </defs>
        <rect width="400" height="240" fill="url(#bkl-bg)"/>
        <!-- Arabic Calligraphic Swirls (Besurek strokes) in background -->
        <g stroke="#C9A567" stroke-opacity="0.2" stroke-width="2" fill="none">
          <path d="M50 70C90 50 110 100 150 70C170 55 180 60 200 50"/>
          <path d="M220 50C250 65 280 40 320 65C340 75 360 60 380 70"/>
          <path d="M50 180C100 200 130 170 170 190"/>
          <path d="M230 190C270 170 300 200 350 180"/>
        </g>
        <!-- Rafflesia Arnoldii Flower (5 Large Petals with white warts) -->
        <g>
          <!-- 5 Petals -->
          <circle cx="200" cy="75" r="32" fill="url(#raf-petal)"/>
          <circle cx="240" cy="105" r="32" fill="url(#raf-petal)"/>
          <circle cx="225" cy="155" r="32" fill="url(#raf-petal)"/>
          <circle cx="175" cy="155" r="32" fill="url(#raf-petal)"/>
          <circle cx="160" cy="105" r="32" fill="url(#raf-petal)"/>
          <!-- Central Bowl (Perigone Disc) -->
          <circle cx="200" cy="120" r="30" fill="#3D0B02" stroke="#E5C384" stroke-width="1.5"/>
          <circle cx="200" cy="120" r="16" fill="#8C1803"/>
          <circle cx="200" cy="120" r="6" fill="#FFC300"/>
          <!-- White wart spots on petals -->
          <g fill="#FFF3D6" opacity="0.75">
            <circle cx="200" cy="65" r="3"/><circle cx="195" cy="80" r="2.5"/><circle cx="208" cy="72" r="2"/>
            <circle cx="245" cy="100" r="3"/><circle cx="250" cy="115" r="2.5"/><circle cx="235" cy="108" r="2"/>
            <circle cx="230" cy="160" r="3"/><circle cx="215" cy="165" r="2"/><circle cx="232" cy="148" r="2"/>
            <circle cx="170" cy="160" r="3"/><circle cx="185" cy="165" r="2"/><circle cx="168" cy="148" r="2"/>
            <circle cx="155" cy="100" r="3"/><circle cx="150" cy="115" r="2.5"/><circle cx="165" cy="108" r="2"/>
          </g>
        </g>
      </svg>
    `,

    "maker-lampung": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="lmp-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#0A111E"/>
            <stop offset="60%" stop-color="#14223A"/>
            <stop offset="100%" stop-color="#080D18"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#lmp-bg)"/>
        <!-- Tapis Ground Striped Weave (Dark Indigo & Madder Stripes) -->
        <g opacity="0.25">
          <rect x="0" y="40" width="400" height="15" fill="#8B2635"/>
          <rect x="0" y="80" width="400" height="15" fill="#8B2635"/>
          <rect x="0" y="145" width="400" height="15" fill="#8B2635"/>
          <rect x="0" y="185" width="400" height="15" fill="#8B2635"/>
        </g>
        <!-- Sacred Ship of Souls (Kapal Jung Melinting) Gold Couched Embroidery -->
        <!-- Curved Hull with Dragon Prow & Stern -->
        <path d="M70 150C100 185 300 185 330 150C290 165 110 165 70 150Z" fill="#C9A567" stroke="#FFF" stroke-width="1.5"/>
        <path d="M70 150C60 135 55 120 65 105C72 115 78 135 70 150Z" fill="#C9A567"/>
        <path d="M330 150C340 135 345 120 335 105C328 115 322 135 330 150Z" fill="#C9A567"/>
        <!-- Central Tree of Life / Mast -->
        <line x1="200" y1="165" x2="200" y2="60" stroke="#E5C384" stroke-width="3"/>
        <polygon points="200,50 208,65 192,65" fill="#E5C384"/>
        <!-- Ancestor Figures with Feathers on the Deck -->
        <g fill="#E5C384">
          <circle cx="160" cy="130" r="5"/><path d="M155 145L160 135L165 145Z"/>
          <circle cx="200" cy="120" r="6"/><path d="M194 138L200 126L206 138Z"/>
          <circle cx="240" cy="130" r="5"/><path d="M235 145L240 135L245 145Z"/>
        </g>
        <!-- Horizontal Gold Embroidery Rows -->
        <path d="M110 162H290" stroke="#FFF" stroke-width="1.5" stroke-dasharray="4 2"/>
      </svg>
    `,

    "maker-dki-jakarta": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="jkt-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1A0D11"/>
            <stop offset="60%" stop-color="#2D1217"/>
            <stop offset="100%" stop-color="#120A0C"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#jkt-bg)"/>
        <!-- Gigi Balang Roof Eaves Triangles across top -->
        <g fill="#F4A261" opacity="0.3">
          <polygon points="20,0 35,25 50,0"/>
          <polygon points="50,0 65,25 80,0"/>
          <polygon points="80,0 95,25 110,0"/>
          <polygon points="290,0 305,25 320,0"/>
          <polygon points="320,0 335,25 350,0"/>
          <polygon points="350,0 365,25 380,0"/>
        </g>
        <!-- Kembang Kelapa Coconut Fronds (Radiating Golden Spikes) -->
        <g stroke="#E76F51" stroke-width="1.5">
          <line x1="200" y1="60" x2="160" y2="20"/><circle cx="160" cy="20" r="3" fill="#E9C46A"/>
          <line x1="200" y1="60" x2="180" y2="15"/><circle cx="180" cy="15" r="3" fill="#2A9D8F"/>
          <line x1="200" y1="60" x2="200" y2="10"/><circle cx="200" cy="10" r="3" fill="#E76F51"/>
          <line x1="200" y1="60" x2="220" y2="15"/><circle cx="220" cy="15" r="3" fill="#2A9D8F"/>
          <line x1="200" y1="60" x2="240" y2="20"/><circle cx="240" cy="20" r="3" fill="#E9C46A"/>
        </g>
        <!-- Ondel-Ondel Male Mask (Red Face, Golden Crown, Big Eyes) -->
        <!-- Crown / Topong -->
        <path d="M165 75L200 55L235 75L230 85H170L165 75Z" fill="#C9A567" stroke="#FFF" stroke-width="1"/>
        <!-- Face Oval -->
        <ellipse cx="200" cy="130" rx="42" ry="52" fill="#D62828" stroke="#8F1414" stroke-width="2"/>
        <!-- Big Round Eyes -->
        <circle cx="185" cy="120" r="9" fill="#FFF"/>
        <circle cx="185" cy="120" r="4.5" fill="#111"/>
        <circle cx="215" cy="120" r="9" fill="#FFF"/>
        <circle cx="215" cy="120" r="4.5" fill="#111"/>
        <!-- Thick Mustache -->
        <path d="M175 145C185 140 195 145 200 148C205 145 215 140 225 145C220 155 205 152 200 150C195 152 180 155 175 145Z" fill="#111"/>
        <!-- Wide Grinning Mouth -->
        <path d="M185 160C195 168 205 168 215 160" stroke="#FFF" stroke-width="3" stroke-linecap="round"/>
        <!-- Collar & Robe (Baju Sadariah) -->
        <path d="M150 200L175 180H225L250 200V240H150V200Z" fill="#1D3557" stroke="#C9A567" stroke-width="1.5"/>
      </svg>
    `,

    "maker-jawa-barat": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="jb-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#131F14"/>
            <stop offset="60%" stop-color="#1B3820"/>
            <stop offset="100%" stop-color="#0F180F"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#jb-bg)"/>
        <!-- Parahyangan Mountain Ridges in Background -->
        <path d="M0 160L80 110L160 150L240 100L330 160L400 120V240H0Z" fill="#122515" opacity="0.4"/>
        <!-- Wayang Golek Cepot Profile / Puppet Character -->
        <!-- Carved Wood Headdress / Blangkon Sunda -->
        <path d="M180 70C185 50 215 50 225 70C235 75 235 90 220 95H180V70Z" fill="#C9A567" stroke="#3D2614" stroke-width="1"/>
        <!-- Wooden Carved Head (Face) -->
        <path d="M180 85H215C225 85 230 95 225 105C220 115 225 125 215 130H185C175 125 175 95 180 85Z" fill="#F4A261" stroke="#8E5B18" stroke-width="1.5"/>
        <!-- Eye and Expressive Features -->
        <ellipse cx="210" cy="100" rx="4" ry="5" fill="#111"/>
        <path d="M215 118C222 118 225 125 218 126" stroke="#D62828" stroke-width="2"/>
        <!-- Wooden Neck & Joint Rod (Tuding Wayang) -->
        <rect x="195" y="130" width="10" height="30" fill="#8E5B18"/>
        <!-- Batik Kain Sarung Robe -->
        <path d="M160 160C180 150 220 150 240 160L250 230H150L160 160Z" fill="#3D2010" stroke="#C9A567" stroke-width="1.5"/>
        <g stroke="#E5C384" stroke-width="1" opacity="0.6">
          <line x1="160" y1="180" x2="240" y2="180"/>
          <line x1="155" y1="200" x2="245" y2="200"/>
        </g>
        <!-- Wooden Control Sticks (Cempurit Bambu) -->
        <line x1="150" y1="180" x2="120" y2="240" stroke="#C9A567" stroke-width="2"/>
        <line x1="250" y1="180" x2="280" y2="240" stroke="#C9A567" stroke-width="2"/>
      </svg>
    `,

    "maker-banten": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="btn-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#0F1014"/>
            <stop offset="60%" stop-color="#1B1E28"/>
            <stop offset="100%" stop-color="#0B0C10"/>
          </linearGradient>
          <linearGradient id="btn-steel" x1="100" y1="90" x2="280" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="40%" stop-color="#BAC4CC"/>
            <stop offset="80%" stop-color="#697782"/>
            <stop offset="100%" stop-color="#2D3740"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#btn-bg)"/>
        <!-- Baduy Tree-Bark Woven Koja Bag Mesh (Right Side) -->
        <g stroke="#C49A6C" stroke-width="1.5" stroke-opacity="0.3">
          <path d="M260 80C300 80 340 100 350 160C355 200 320 220 280 220C240 220 220 180 230 140C235 110 245 80 260 80Z" fill="#1C1814" fill-opacity="0.5"/>
          <!-- Mesh Weave Lines -->
          <line x1="240" y1="120" x2="340" y2="120" stroke-dasharray="3 3"/>
          <line x1="240" y1="150" x2="345" y2="150" stroke-dasharray="3 3"/>
          <line x1="250" y1="180" x2="335" y2="180" stroke-dasharray="3 3"/>
          <line x1="270" y1="90" x2="270" y2="210" stroke-dasharray="3 3"/>
          <line x1="310" y1="90" x2="310" y2="210" stroke-dasharray="3 3"/>
        </g>
        <!-- Forged Golok Ciomas Blade (Heavy Chopping Spine & Pamor) -->
        <!-- Carved Horn Handle (Gagang Tanduk Ukir) -->
        <path d="M80 150C70 140 70 120 85 115C95 112 110 120 120 125L135 132L130 148L105 142C95 155 85 155 80 150Z" fill="#2B1E16" stroke="#C9A567" stroke-width="1.5"/>
        <!-- Heavy Blade with Belly & Taper -->
        <path d="M135 132L245 110C270 105 295 108 300 115C295 130 260 148 220 152L130 148L135 132Z" fill="url(#btn-steel)" stroke="#FFF" stroke-width="1.5"/>
        <!-- Pamor Sulangkar wavy etch lines -->
        <path d="M145 138C175 132 215 135 255 125" stroke="#FFF" stroke-opacity="0.8" stroke-width="1"/>
        <path d="M155 142C185 138 225 140 265 130" stroke="#485966" stroke-width="1"/>
      </svg>
    `,

    "maker-jawa-tengah": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="jt-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1A120B"/>
            <stop offset="60%" stop-color="#2D1D12"/>
            <stop offset="100%" stop-color="#140D07"/>
          </linearGradient>
          <linearGradient id="jt-pamor" x1="150" y1="40" x2="250" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="30%" stop-color="#D4AF37"/>
            <stop offset="70%" stop-color="#70531E"/>
            <stop offset="100%" stop-color="#2A1B0A"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#jt-bg)"/>
        <!-- Sunburst Radiance from Center (Tuah & Pamor) -->
        <circle cx="200" cy="120" r="90" fill="#C9A567" fill-opacity="0.08"/>
        <!-- Sinar Pamor Radiating Lines -->
        <g stroke="#C9A567" stroke-opacity="0.2" stroke-width="1">
          <line x1="200" y1="30" x2="200" y2="210"/>
          <line x1="110" y1="120" x2="290" y2="120"/>
          <line x1="135" y1="55" x2="265" y2="185"/>
          <line x1="265" y1="55" x2="135" y2="185"/>
        </g>
        <!-- Keris Luk 5 (Five Waves Sinous Blade) -->
        <g>
          <!-- Blade Path with 5 distinct Luk waves -->
          <path d="M196 210C190 190 210 180 205 160C195 140 215 130 205 110C195 90 215 80 205 60C198 45 204 35 200 25C196 35 202 45 195 60C185 80 205 90 195 110C185 130 205 140 195 160C190 180 210 190 204 210H196Z" fill="url(#jt-pamor)" stroke="#FFE8B5" stroke-width="1.5"/>
          <!-- Pamor Wos Wutah (Grains of spilled rice damascus swirls) -->
          <path d="M200 45C203 70 197 100 203 130C197 160 203 185 200 205" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="1.2"/>
        </g>
        <!-- Gandik & Pelet Deder / Hulu Keris (Surakarta Style) -->
        <!-- Mendak Ring with Gem Accents -->
        <rect x="190" y="210" width="20" height="6" rx="2" fill="#FFD700" stroke="#FFF" stroke-width="0.8"/>
        <!-- Hulu Tayuman Wood Carved Figural Grip -->
        <path d="M195 216C190 220 185 228 190 235C195 240 205 240 210 235C215 228 210 220 205 216Z" fill="#3E2713" stroke="#C9A567" stroke-width="1"/>
      </svg>
    `,

    "maker-di-yogyakarta": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="jogja-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#16100B"/>
            <stop offset="60%" stop-color="#2D1F16"/>
            <stop offset="100%" stop-color="#120D08"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#jogja-bg)"/>
        <!-- Soga Brown Batik Fabric Panel with Nitik Dotted Grid -->
        <rect x="100" y="50" width="200" height="140" rx="6" fill="#3D2619" stroke="#C9A567" stroke-opacity="0.4"/>
        <!-- Precise Dotted Nitik Grid Pattern (Simulating Weave in Wax) -->
        <g fill="#E5C384" opacity="0.8">
          <!-- Row 1 -->
          <rect x="130" y="80" width="8" height="3" rx="1"/><rect x="145" y="80" width="8" height="3" rx="1"/><rect x="160" y="80" width="8" height="3" rx="1"/>
          <rect x="230" y="80" width="8" height="3" rx="1"/><rect x="245" y="80" width="8" height="3" rx="1"/><rect x="260" y="80" width="8" height="3" rx="1"/>
          <!-- Row 2 -->
          <rect x="135" y="95" width="8" height="3" rx="1"/><rect x="150" y="95" width="8" height="3" rx="1"/>
          <rect x="235" y="95" width="8" height="3" rx="1"/><rect x="250" y="95" width="8" height="3" rx="1"/>
          <!-- Central Ceplok Mandala -->
          <circle cx="200" cy="120" r="28" stroke="#E5C384" stroke-width="1.5" fill="none"/>
          <circle cx="200" cy="120" r="18" stroke="#E5C384" stroke-width="1" stroke-dasharray="2 2" fill="none"/>
          <circle cx="200" cy="120" r="5" fill="#E5C384"/>
          <!-- 4 Petal Dots -->
          <circle cx="200" cy="100" r="3"/><circle cx="200" cy="140" r="3"/>
          <circle cx="180" cy="120" r="3"/><circle cx="220" cy="120" r="3"/>
        </g>
        <!-- Fine Tulis Canting in Action -->
        <path d="M280 60L310 40L320 45L295 70Z" fill="#C9A567" stroke="#FFF" stroke-width="1"/>
        <path d="M280 60C265 65 250 80 240 95" stroke="#C9A567" stroke-width="2" fill="none"/>
        <circle cx="240" cy="97" r="2" fill="#FFC300"/>
      </svg>
    `,

    "maker-jawa-timur": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="jatim-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1A0D0F"/>
            <stop offset="60%" stop-color="#2D1318"/>
            <stop offset="100%" stop-color="#120A0B"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#jatim-bg)"/>
        <!-- Huge Bronze Gong Rim Outline on Left Backdrop -->
        <circle cx="130" cy="120" r="75" stroke="#C9A567" stroke-opacity="0.3" stroke-width="3" fill="#241910" fill-opacity="0.4"/>
        <circle cx="130" cy="120" r="20" fill="#3D2914" stroke="#C9A567" stroke-width="2"/>
        <circle cx="130" cy="120" r="8" fill="#FFD700"/>
        <!-- Topeng Malangan (Panji Asmoro Bangun Character on Right) -->
        <!-- Carved Wood Headdress (Jamang floral crown) -->
        <path d="M220 70C235 50 275 50 290 70L280 85H230L220 70Z" fill="#C9A567" stroke="#FFF" stroke-width="1"/>
        <circle cx="255" cy="65" r="4" fill="#D62828"/>
        <!-- Face Mask Shape (Greenish / Golden Panji Mask) -->
        <ellipse cx="255" cy="125" rx="36" ry="46" fill="#2A9D8F" stroke="#C9A567" stroke-width="1.8"/>
        <!-- Delicate Almond Shaped Eyes -->
        <path d="M235 115C240 110 248 110 250 115C245 120 238 120 235 115Z" fill="#FFF" stroke="#111" stroke-width="0.8"/>
        <path d="M260 115C265 110 273 110 275 115C270 120 263 120 260 115Z" fill="#FFF" stroke="#111" stroke-width="0.8"/>
        <!-- Sharp Noble Nose & Gold Mustache -->
        <path d="M255 110V135L250 137" stroke="#111" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M242 142C250 138 260 138 268 142" stroke="#111" stroke-width="1.5"/>
        <!-- Serene Mouth -->
        <path d="M246 150C252 154 258 154 264 150" stroke="#D62828" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `,

    "maker-bali": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="bali-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#14110E"/>
            <stop offset="60%" stop-color="#2D2114"/>
            <stop offset="100%" stop-color="#100E0B"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#bali-bg)"/>
        <!-- Balinese Candi Bentar (Split Gate) Symmetrical Silhouette -->
        <g stroke="#C9A567" stroke-opacity="0.3" stroke-width="1.5" fill="none">
          <!-- Left Pillar -->
          <path d="M120 220V120H135V90H145V60L160 35V220"/>
          <!-- Right Pillar -->
          <path d="M280 220V120H265V90H255V60L240 35V220"/>
        </g>
        <!-- Carved Sandalwood Statue (Arca Dewi / Garuda) in Center -->
        <ellipse cx="200" cy="80" rx="16" ry="20" fill="#C88A3F" stroke="#E5C384" stroke-width="1.5"/>
        <!-- Crown / Gelungan -->
        <polygon points="200,45 208,65 192,65" fill="#E5C384"/>
        <path d="M188 100C180 120 180 150 185 180H215C220 150 220 120 212 100Z" fill="#996025" stroke="#E5C384" stroke-width="1.5"/>
        <!-- Intricate Floral Carving Flairs (Ukir Patra Punggel) -->
        <path d="M180 120C165 110 160 125 170 135C180 145 185 130 180 120Z" fill="#C88A3F" stroke="#E5C384" stroke-width="1"/>
        <path d="M220 120C235 110 240 125 230 135C220 145 215 130 220 120Z" fill="#C88A3F" stroke="#E5C384" stroke-width="1"/>
        <!-- Wood Chisel Tool (Pahat Ukir) -->
        <line x1="260" y1="180" x2="225" y2="155" stroke="#FFFFFF" stroke-width="2"/>
        <rect x="255" y="175" width="25" height="6" rx="2" fill="#5A3A25" transform="rotate(35 255 175)"/>
        <!-- Frangipani (Kamboja) Blossom Accent -->
        <circle cx="200" cy="205" r="5" fill="#FFF"/>
        <circle cx="200" cy="205" r="2" fill="#FFD166"/>
      </svg>
    `,

    "maker-nusa-tenggara-barat": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="ntb-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1A0F0B"/>
            <stop offset="60%" stop-color="#331A12"/>
            <stop offset="100%" stop-color="#140B07"/>
          </linearGradient>
          <radialGradient id="ntb-pot" cx="200" cy="140" r="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#E07A5F"/>
            <stop offset="70%" stop-color="#A8422B"/>
            <stop offset="100%" stop-color="#5E2214"/>
          </radialGradient>
        </defs>
        <rect width="400" height="240" fill="url(#ntb-bg)"/>
        <!-- Sasak Traditional Barn (Lumbung / Bale Tani) Curved Silhouette -->
        <path d="M120 130C150 70 250 70 280 130L260 170H140L120 130Z" stroke="#C9A567" stroke-opacity="0.2" stroke-width="1.5" fill="none"/>
        <!-- Traditional Earthenware Water Vessel (Kendi Banyumulek) -->
        <g>
          <!-- Vessel Body -->
          <circle cx="200" cy="145" r="45" fill="url(#ntb-pot)" stroke="#C9A567" stroke-width="1.5"/>
          <!-- Neck & Rim -->
          <path d="M188 105C188 95 192 80 185 75H215C208 80 212 95 212 105Z" fill="#A8422B" stroke="#C9A567" stroke-width="1.5"/>
          <ellipse cx="200" cy="75" rx="15" ry="4" fill="#E07A5F" stroke="#C9A567" stroke-width="1"/>
          <!-- Spout (Corong Kendi) -->
          <path d="M165 125L135 110C132 108 132 104 135 102C138 100 142 102 145 105L170 120Z" fill="#A8422B" stroke="#C9A567" stroke-width="1"/>
          <!-- Incised Spiral Geometric Motifs -->
          <path d="M180 145C190 135 210 135 220 145C210 155 190 155 180 145Z" stroke="#E5C384" stroke-width="1.5" fill="none"/>
          <circle cx="200" cy="145" r="3" fill="#E5C384"/>
        </g>
        <!-- Straw-fire Hearth Smoke wisps -->
        <path d="M160 210C170 195 180 200 190 195 M210 210C220 195 230 200 240 195" stroke="#FFD166" stroke-opacity="0.3" stroke-width="1.5"/>
      </svg>
    `,

    "maker-nusa-tenggara-timur": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="ntt-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#140C14"/>
            <stop offset="60%" stop-color="#281423"/>
            <stop offset="100%" stop-color="#0E080E"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#ntt-bg)"/>
        <!-- Sumba Ikat Tapestry Panel with Authentic Indigo & Morinda Red bands -->
        <rect x="90" y="45" width="220" height="150" rx="4" fill="#3D1225" stroke="#C9A567" stroke-width="1.5"/>
        <rect x="90" y="70" width="220" height="20" fill="#14213D"/>
        <rect x="90" y="150" width="220" height="20" fill="#14213D"/>
        <!-- Sacred Mamuli Gold Pendant (Fertility symbol in center top) -->
        <path d="M200 50C190 50 185 60 190 68C195 72 205 72 210 68C215 60 210 50 200 50Z" fill="#FFD166" stroke="#C9A567" stroke-width="1"/>
        <ellipse cx="200" cy="58" rx="4" ry="5" fill="#3D1225"/>
        <!-- Sumba Horse (Kuda Sumba) Geometric Ikat Weave Profile in Center -->
        <g fill="#E5C384">
          <!-- Head & Mane -->
          <polygon points="170,105 185,95 185,115 175,120"/>
          <!-- Neck & Body -->
          <rect x="185" y="105" width="40" height="22" rx="2"/>
          <!-- Legs -->
          <rect x="188" y="127" width="5" height="18"/>
          <rect x="198" y="127" width="5" height="18"/>
          <rect x="212" y="127" width="5" height="18"/>
          <rect x="220" y="127" width="5" height="18"/>
          <!-- Tail -->
          <path d="M225 110C235 115 240 125 235 135" stroke="#E5C384" stroke-width="2.5" fill="none"/>
        </g>
        <!-- Fringe Tassels (Rambu Tenun) -->
        <g stroke="#C9A567" stroke-width="1.5" stroke-dasharray="3 3">
          <line x1="90" y1="195" x2="90" y2="215"/>
          <line x1="130" y1="195" x2="130" y2="215"/>
          <line x1="170" y1="195" x2="170" y2="215"/>
          <line x1="200" y1="195" x2="200" y2="215"/>
          <line x1="230" y1="195" x2="230" y2="215"/>
          <line x1="270" y1="195" x2="270" y2="215"/>
          <line x1="310" y1="195" x2="310" y2="215"/>
        </g>
      </svg>
    `,

    "maker-kalimantan-barat": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="kb-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#0F1A12"/>
            <stop offset="60%" stop-color="#193321"/>
            <stop offset="100%" stop-color="#0A120C"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#kb-bg)"/>
        <!-- Dayak Longhouse (Rumah Betang) Timber Beams Backdrop -->
        <line x1="40" y1="60" x2="360" y2="60" stroke="#C9A567" stroke-opacity="0.2" stroke-width="3"/>
        <line x1="80" y1="60" x2="80" y2="220" stroke="#C9A567" stroke-opacity="0.2" stroke-width="2"/>
        <line x1="320" y1="60" x2="320" y2="220" stroke="#C9A567" stroke-opacity="0.2" stroke-width="2"/>
        <!-- Dayak Iban Ensarun (Water Dragon / Serpent Motif) -->
        <g stroke="#E5C384" stroke-width="2" fill="none">
          <!-- Hooked Spirals (Ukiran Dayak) -->
          <path d="M160 120C160 95 180 80 200 80C220 80 240 95 240 120C240 145 220 160 200 160C180 160 170 145 175 135C180 125 190 125 195 130"/>
          <path d="M130 120C130 75 165 55 200 55C235 55 270 75 270 120C270 165 235 185 200 185"/>
        </g>
        <polygon points="200,75 206,85 194,85" fill="#E5C384"/>
        <polygon points="200,165 206,155 194,155" fill="#E5C384"/>
        <!-- Bone Pickers / Shuttle (Pelari Tenun Iban) -->
        <rect x="140" y="115" width="120" height="10" rx="3" fill="#D9C5B2" stroke="#3D2918" stroke-width="1.5"/>
      </svg>
    `,

    "maker-kalimantan-tengah": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="kt-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1A1208"/>
            <stop offset="60%" stop-color="#30200C"/>
            <stop offset="100%" stop-color="#120C05"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#kt-bg)"/>
        <!-- Hornbill (Burung Enggang / Tingang) Wings Outspread Silhouette -->
        <path d="M200 70C150 40 80 50 40 80C90 90 150 85 200 95C250 85 310 90 360 80C320 50 250 40 200 70Z" fill="#C9A567" fill-opacity="0.25"/>
        <!-- Tingang Beak & Casque -->
        <path d="M200 70C205 60 215 55 225 55C215 70 205 85 200 95Z" fill="#E07A5F"/>
        <!-- Traditional Woven Rattan Backpack (Tas Anjat Rotan) -->
        <path d="M165 105C170 100 230 100 235 105L245 200C245 210 235 215 200 215C165 215 155 210 155 200L165 105Z" fill="#5E3E18" stroke="#E5C384" stroke-width="1.5"/>
        <!-- Hexagonal Rattan Weave Mesh Pattern -->
        <g stroke="#E5C384" stroke-width="1" stroke-opacity="0.6">
          <line x1="162" y1="125" x2="238" y2="125"/>
          <line x1="160" y1="145" x2="240" y2="145"/>
          <line x1="158" y1="165" x2="242" y2="165"/>
          <line x1="156" y1="185" x2="244" y2="185"/>
          <!-- Diagonals -->
          <line x1="180" y1="105" x2="235" y2="210"/>
          <line x1="220" y1="105" x2="165" y2="210"/>
        </g>
      </svg>
    `,

    "maker-kalimantan-selatan": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="ks-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1F1506"/>
            <stop offset="60%" stop-color="#3D2908"/>
            <stop offset="100%" stop-color="#140D04"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#ks-bg)"/>
        <!-- River Ripples (Sungai Martapura Pasar Terapung) -->
        <path d="M0 60C100 80 150 40 250 60C350 80 380 50 400 60" stroke="#C9A567" stroke-opacity="0.2" stroke-width="2"/>
        <path d="M0 190C100 210 150 170 250 190C350 210 380 180 400 190" stroke="#C9A567" stroke-opacity="0.2" stroke-width="2"/>
        <!-- Sasirangan Fabric Panel (Drip-dye Resist Stitch Lines) -->
        <rect x="100" y="50" width="200" height="140" rx="6" fill="#1C3854" stroke="#E5C384" stroke-width="1.5"/>
        <!-- Gigi Haruan (Snakehead Fish Teeth) Zigzag Motif -->
        <g stroke="#E5C384" stroke-width="2.5" fill="none">
          <path d="M120 120L135 100L150 120L165 100L180 120L195 100L210 120L225 100L240 120L255 100L270 120"/>
          <path d="M120 140L135 120L150 140L165 120L180 140L195 120L210 140L225 120L240 140L255 120L270 140"/>
        </g>
        <!-- Basting Knot Stitches (Jelujur Dots) -->
        <g fill="#FFD166">
          <circle cx="135" cy="100" r="3"/><circle cx="165" cy="100" r="3"/><circle cx="195" cy="100" r="3"/><circle cx="225" cy="100" r="3"/><circle cx="255" cy="100" r="3"/>
          <circle cx="150" cy="140" r="3"/><circle cx="180" cy="140" r="3"/><circle cx="210" cy="140" r="3"/><circle cx="240" cy="140" r="3"/>
        </g>
      </svg>
    `,

    "maker-kalimantan-timur": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="ktim-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#140E0A"/>
            <stop offset="60%" stop-color="#281A12"/>
            <stop offset="100%" stop-color="#0E0A07"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#ktim-bg)"/>
        <!-- Ulap Doyo Woven Leaf Fiber Strip (Warm Sand Textured Ground) -->
        <rect x="90" y="45" width="220" height="150" rx="4" fill="#3D2918" stroke="#C9A567" stroke-width="1.5"/>
        <!-- Dayak Kenyah Aso Motif (Mythical Dragon-Dog in Primary Beads) -->
        <g>
          <!-- Eye & Snout -->
          <circle cx="200" cy="110" r="16" fill="#D62828" stroke="#FFD166" stroke-width="3"/>
          <circle cx="200" cy="110" r="7" fill="#003049"/>
          <!-- Curling Horns / Swirls (Beaded paths) -->
          <path d="M184 110C160 110 140 90 150 70C160 50 190 70 190 85" stroke="#FFD166" stroke-width="4" stroke-linecap="round" fill="none"/>
          <path d="M216 110C240 110 260 90 250 70C240 50 210 70 210 85" stroke="#FFD166" stroke-width="4" stroke-linecap="round" fill="none"/>
          <!-- Lower Jaw Swirls -->
          <path d="M185 125C165 140 175 165 195 160" stroke="#003049" stroke-width="3.5" fill="none"/>
          <path d="M215 125C235 140 225 165 205 160" stroke="#003049" stroke-width="3.5" fill="none"/>
        </g>
        <!-- Colorful Glass Seed Beads Array -->
        <circle cx="140" cy="150" r="3.5" fill="#E63946"/>
        <circle cx="150" cy="150" r="3.5" fill="#FFD166"/>
        <circle cx="160" cy="150" r="3.5" fill="#2A9D8F"/>
        <circle cx="240" cy="150" r="3.5" fill="#2A9D8F"/>
        <circle cx="250" cy="150" r="3.5" fill="#FFD166"/>
        <circle cx="260" cy="150" r="3.5" fill="#E63946"/>
      </svg>
    `,

    "maker-kalimantan-utara": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="ku-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#12170F"/>
            <stop offset="60%" stop-color="#202A1C"/>
            <stop offset="100%" stop-color="#0D110B"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#ku-bg)"/>
        <!-- Wide Conical Dayak Sun Hat (Topi Saung / Seraung) Top View -->
        <circle cx="200" cy="120" r="70" fill="#6B512F" stroke="#E5C384" stroke-width="2"/>
        <circle cx="200" cy="120" r="48" stroke="#E5C384" stroke-width="1.5" stroke-dasharray="3 3"/>
        <circle cx="200" cy="120" r="26" stroke="#E5C384" stroke-width="1.5"/>
        <circle cx="200" cy="120" r="8" fill="#D62828" stroke="#FFD166" stroke-width="1.5"/>
        <!-- Radiating Palm Leaf Ribs (Anyaman Daun Lalis) -->
        <g stroke="#E5C384" stroke-width="1" opacity="0.6">
          <line x1="200" y1="50" x2="200" y2="190"/>
          <line x1="130" y1="120" x2="270" y2="120"/>
          <line x1="150" y1="70" x2="250" y2="170"/>
          <line x1="250" y1="70" x2="150" y2="170"/>
        </g>
        <!-- Lundayeh Ancient Carnelian Bead Necklace Silhouette -->
        <path d="M150 185C170 205 230 205 250 185" stroke="#E76F51" stroke-width="4" stroke-dasharray="5 3"/>
      </svg>
    `,

    "maker-sulawesi-utara": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="sulut-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1A0D0D"/>
            <stop offset="60%" stop-color="#301515"/>
            <stop offset="100%" stop-color="#140808"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#sulut-bg)"/>
        <!-- Lokon Volcano Silhouette Backdrop -->
        <polygon points="40,160 140,80 240,160" fill="#1C1414" opacity="0.4"/>
        <polygon points="180,160 270,90 360,160" fill="#1C1414" opacity="0.3"/>
        <!-- Bentenan Woven Textile Panel (Pinatikan / Kaiwu Patola) -->
        <rect x="100" y="55" width="200" height="130" rx="4" fill="#4A1616" stroke="#E5C384" stroke-width="1.5"/>
        <!-- Kaiwu Patola Diamond & Chevron Weave -->
        <g stroke="#E5C384" stroke-width="1.8" fill="none">
          <polygon points="200,75 225,100 200,125 175,100"/>
          <polygon points="200,115 225,140 200,165 175,140"/>
          <line x1="100" y1="100" x2="300" y2="100"/>
          <line x1="100" y1="140" x2="300" y2="140"/>
        </g>
        <circle cx="200" cy="100" r="4" fill="#E5C384"/>
        <circle cx="200" cy="140" r="4" fill="#E5C384"/>
      </svg>
    `,

    "maker-gorontalo": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="gt-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1C1014"/>
            <stop offset="60%" stop-color="#301B22"/>
            <stop offset="100%" stop-color="#140B0E"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#gt-bg)"/>
        <!-- Drawn-Thread Openwork Grid (Cabut Benang Mesh) -->
        <g stroke="#E5C384" stroke-opacity="0.3" stroke-width="1">
          <line x1="110" y1="70" x2="290" y2="70"/>
          <line x1="110" y1="90" x2="290" y2="90"/>
          <line x1="110" y1="110" x2="290" y2="110"/>
          <line x1="110" y1="130" x2="290" y2="130"/>
          <line x1="110" y1="150" x2="290" y2="150"/>
          <line x1="110" y1="170" x2="290" y2="170"/>
          <!-- Verticals -->
          <line x1="130" y1="50" x2="130" y2="190"/>
          <line x1="150" y1="50" x2="150" y2="190"/>
          <line x1="170" y1="50" x2="170" y2="190"/>
          <line x1="190" y1="50" x2="190" y2="190"/>
          <line x1="210" y1="50" x2="210" y2="190"/>
          <line x1="230" y1="50" x2="230" y2="190"/>
          <line x1="250" y1="50" x2="250" y2="190"/>
          <line x1="270" y1="50" x2="270" y2="190"/>
        </g>
        <!-- Embroidered Floral Karawo Motif Woven into Grid -->
        <g fill="#E5C384">
          <rect x="170" y="110" width="20" height="20" rx="2"/>
          <rect x="210" y="110" width="20" height="20" rx="2"/>
          <rect x="190" y="90" width="20" height="20" rx="2"/>
          <rect x="190" y="130" width="20" height="20" rx="2"/>
          <circle cx="200" cy="120" r="5" fill="#D62828"/>
        </g>
        <!-- Delicate Embroidery Needle -->
        <line x1="270" y1="65" x2="215" y2="115" stroke="#FFFFFF" stroke-width="1.5"/>
        <circle cx="272" cy="63" r="2" fill="#E5C384"/>
      </svg>
    `,

    "maker-sulawesi-tengah": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="st-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#141411"/>
            <stop offset="60%" stop-color="#24211A"/>
            <stop offset="100%" stop-color="#0E0D0B"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#st-bg)"/>
        <!-- Lore Lindu Megalithic Stone Statue Silhouette on Left -->
        <path d="M70 200V120C70 90 90 70 110 70C130 70 150 90 150 120V200Z" fill="#1B1C1A" stroke="#C9A567" stroke-opacity="0.3" stroke-width="1.5"/>
        <circle cx="95" cy="100" r="6" fill="#0D0E0D"/>
        <circle cx="125" cy="100" r="6" fill="#0D0E0D"/>
        <!-- Textured Fuya Tree-Bark Cloth Sheet -->
        <rect x="160" y="65" width="160" height="120" rx="6" fill="#8C6D53" stroke="#C9A567" stroke-width="1.5"/>
        <!-- Bark Fiber Beaten Textures (Halus Serat Beringin) -->
        <g stroke="#3D2918" stroke-width="1.5" opacity="0.6">
          <line x1="170" y1="85" x2="310" y2="85"/>
          <line x1="175" y1="105" x2="305" y2="105"/>
          <line x1="170" y1="125" x2="310" y2="125"/>
          <line x1="175" y1="145" x2="305" y2="145"/>
          <line x1="170" y1="165" x2="310" y2="165"/>
        </g>
        <!-- Traditional Beater Stone (Batu Ike) -->
        <ellipse cx="270" cy="160" rx="22" ry="14" fill="#4A4E51" stroke="#FFF" stroke-width="1"/>
        <line x1="255" y1="160" x2="285" y2="160" stroke="#111" stroke-width="2"/>
      </svg>
    `,

    "maker-sulawesi-barat": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="sbar-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#0E1624"/>
            <stop offset="60%" stop-color="#18273D"/>
            <stop offset="100%" stop-color="#090E17"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#sbar-bg)"/>
        <!-- Sureq Plaid Checkered Silk Sarong Panel -->
        <rect x="100" y="50" width="200" height="140" rx="4" fill="#0C356A" stroke="#E5C384" stroke-width="1.5"/>
        <!-- Sureq Geometric Grid in Contrasting Crimson & Gold Stripes -->
        <g stroke="#D62828" stroke-width="3">
          <line x1="140" y1="50" x2="140" y2="190"/>
          <line x1="200" y1="50" x2="200" y2="190"/>
          <line x1="260" y1="50" x2="260" y2="190"/>
          <line x1="100" y1="85" x2="300" y2="85"/>
          <line x1="100" y1="120" x2="300" y2="120"/>
          <line x1="100" y1="155" x2="300" y2="155"/>
        </g>
        <g stroke="#FFD166" stroke-width="1.5">
          <line x1="145" y1="50" x2="145" y2="190"/>
          <line x1="205" y1="50" x2="205" y2="190"/>
          <line x1="265" y1="50" x2="265" y2="190"/>
          <line x1="100" y1="90" x2="300" y2="90"/>
          <line x1="100" y1="125" x2="300" y2="125"/>
          <line x1="100" y1="160" x2="300" y2="160"/>
        </g>
        <!-- Wooden Shuttle (Teropong Tenun Mandar) -->
        <path d="M120 175C160 168 240 168 280 175C240 182 160 182 120 175Z" fill="#3D2010" stroke="#FFF" stroke-width="1"/>
      </svg>
    `,

    "maker-sulawesi-selatan": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="ss-bg-pinisi" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#171C26"/>
            <stop offset="50%" stop-color="#2B1F1C"/>
            <stop offset="100%" stop-color="#0F1117"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#ss-bg-pinisi)"/>
        <!-- Ocean Horizon & Sunset Glow -->
        <path d="M0 175C100 170 300 170 400 175V240H0V175Z" fill="#0C2030"/>
        <line x1="0" y1="175" x2="400" y2="175" stroke="#E07A5F" stroke-width="1.5" stroke-opacity="0.5"/>
        <!-- Grand Pinisi Schooner Silhouette -->
        <!-- Curved Ironwood Hull (Lunas Kayu Bitti / Ulin) -->
        <path d="M70 170C110 200 290 200 340 165C300 180 120 180 70 170Z" fill="#3E2413" stroke="#C9A567" stroke-width="1.8"/>
        <!-- 2 Tall Masts (Anjong & Tiang Layar) -->
        <line x1="165" y1="175" x2="165" y2="50" stroke="#C9A567" stroke-width="2.5"/>
        <line x1="245" y1="175" x2="245" y2="65" stroke="#C9A567" stroke-width="2.5"/>
        <line x1="70" y1="170" x2="120" y2="135" stroke="#C9A567" stroke-width="2"/>
        <!-- 7 Billowing Sails (Tujuh Helai Layar Pinisi) -->
        <!-- Jib Sails in Front -->
        <polygon points="120,135 165,80 165,130" fill="#EAE2B7" fill-opacity="0.75" stroke="#FFF" stroke-width="0.8"/>
        <polygon points="90,150 165,95 165,145" fill="#EAE2B7" fill-opacity="0.65" stroke="#FFF" stroke-width="0.8"/>
        <!-- Main Sails -->
        <polygon points="165,60 215,75 210,135 165,135" fill="#FDF0D5" fill-opacity="0.85" stroke="#C9A567" stroke-width="1"/>
        <polygon points="245,75 295,90 290,145 245,145" fill="#FDF0D5" fill-opacity="0.85" stroke="#C9A567" stroke-width="1"/>
      </svg>
    `,

    "maker-sulawesi-tenggara": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="sultra-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#180A1A"/>
            <stop offset="60%" stop-color="#2D1230"/>
            <stop offset="100%" stop-color="#120614"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#sultra-bg)"/>
        <!-- Buton Wolio Palace Fortress Stone Wall Backdrop -->
        <path d="M40 90H100V75H130V90H170V75H200V90H240V75H270V90H310V75H340V90H360" stroke="#C9A567" stroke-opacity="0.25" stroke-width="2" fill="none"/>
        <!-- Royal Purple Masiri Woven Textile Panel -->
        <rect x="110" y="70" width="180" height="120" rx="4" fill="#3D1240" stroke="#E0E0E0" stroke-width="1.5"/>
        <!-- Silver Diamond Masiri Patterns -->
        <g stroke="#E0E0E0" stroke-width="1.8" fill="none">
          <polygon points="200,90 220,110 200,130 180,110"/>
          <polygon points="200,120 220,140 200,160 180,140"/>
          <circle cx="200" cy="110" r="3" fill="#E0E0E0"/>
          <circle cx="200" cy="140" r="3" fill="#E0E0E0"/>
        </g>
        <!-- Filigree Sterling Silver Wire Lotus (Kriya Perak Muna) -->
        <circle cx="200" cy="125" r="14" stroke="#FFF" stroke-width="1" stroke-dasharray="2 2" fill="none"/>
      </svg>
    `,

    "maker-maluku": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="mal-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1A110D"/>
            <stop offset="60%" stop-color="#301E15"/>
            <stop offset="100%" stop-color="#120A07"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#mal-bg)"/>
        <!-- Soundwave Resonance Circles -->
        <circle cx="180" cy="120" r="85" stroke="#C9A567" stroke-opacity="0.15" stroke-width="1.5" stroke-dasharray="4 4"/>
        <!-- Authentic Carved Tifa Drum (Hourglass Shape) -->
        <g>
          <!-- Drum Body -->
          <path d="M150 65H210C205 105 190 115 190 120C190 125 205 135 210 185H150C155 135 170 125 170 120C170 115 155 105 150 65Z" fill="#4A2511" stroke="#C9A567" stroke-width="1.8"/>
          <!-- Deer skin head (Membran Kulit Rusa) -->
          <ellipse cx="180" cy="65" rx="30" ry="7" fill="#E5C384" stroke="#FFF" stroke-width="1"/>
          <ellipse cx="180" cy="185" rx="30" ry="7" fill="#331A0C" stroke="#C9A567" stroke-width="1"/>
          <!-- Rattan Lacing Cord (Tali Rotan Pasak) -->
          <g stroke="#C9A567" stroke-width="1.2">
            <line x1="155" y1="68" x2="180" y2="120"/>
            <line x1="205" y1="68" x2="180" y2="120"/>
            <line x1="180" y1="120" x2="155" y2="182"/>
            <line x1="180" y1="120" x2="205" y2="182"/>
          </g>
          <!-- Handle (Gagang Tifa) -->
          <path d="M145 95C130 105 130 135 145 145" stroke="#C9A567" stroke-width="3" fill="none"/>
        </g>
        <!-- Spiral Nautilus Shell (Kulit Kerang Bia) on Right -->
        <path d="M260 150C250 120 270 90 300 95C325 100 335 130 320 155C305 180 270 180 260 150Z" fill="#F8F9FA" stroke="#C9A567" stroke-width="1.5"/>
        <path d="M275 140C270 130 280 115 295 120C305 125 305 140 295 148C285 155 278 150 275 140Z" fill="#EAE2B7" stroke="#C9A567" stroke-width="1"/>
      </svg>
    `,

    "maker-maluku-utara": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="mu-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#0F131A"/>
            <stop offset="60%" stop-color="#192333"/>
            <stop offset="100%" stop-color="#0A0D12"/>
          </linearGradient>
          <linearGradient id="mu-silver" x1="120" y1="80" x2="280" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="50%" stop-color="#D8DEE9"/>
            <stop offset="100%" stop-color="#8892B0"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#mu-bg)"/>
        <!-- Volcano Mount Gamalama Outline in Background -->
        <polygon points="120,170 200,90 280,170" fill="#121824" stroke="#C9A567" stroke-opacity="0.2" stroke-width="1.5"/>
        <!-- Crossed Polished White-Iron Blade & Bracelet (Besi Putih Morotai) -->
        <!-- Curved Blade (Parang Salawaku Morotai) -->
        <path d="M120 165L260 90C275 80 290 85 285 95L150 175C135 185 120 180 120 165Z" fill="url(#mu-silver)" stroke="#FFF" stroke-width="1.5"/>
        <!-- Shimmering White-Iron Bracelet (Gelang Besi Putih) -->
        <circle cx="200" cy="130" r="38" stroke="url(#mu-silver)" stroke-width="6" fill="none"/>
        <circle cx="200" cy="130" r="34" stroke="#192333" stroke-width="1" fill="none"/>
        <circle cx="200" cy="130" r="42" stroke="#FFF" stroke-width="0.8" stroke-dasharray="2 4" fill="none"/>
        <!-- Sparkle Highlights -->
        <polygon points="200,85 203,92 210,92 204,96 206,103 200,99 194,103 196,96 190,92 197,92" fill="#FFF"/>
      </svg>
    `,

    "maker-papua": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="pap-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#140E0A"/>
            <stop offset="60%" stop-color="#281A10"/>
            <stop offset="100%" stop-color="#0E0A07"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#pap-bg)"/>
        <!-- Sacred Asmat Ancestor Spirit Pole (Tiang Mbitoro) Central Openwork Carving -->
        <g stroke="#C9A567" stroke-width="2" fill="none">
          <!-- Main Vertical Timber -->
          <line x1="200" y1="30" x2="200" y2="220" stroke="#3D2010" stroke-width="14"/>
          <!-- Asmat Dynamic Ancestor Spirals (C-shapes & Hornbill Beaks) -->
          <path d="M200 50C165 40 150 70 170 85C185 95 200 80 200 65"/>
          <path d="M200 85C235 75 250 105 230 120C215 130 200 115 200 100"/>
          <path d="M200 120C165 110 150 140 170 155C185 165 200 150 200 135"/>
          <path d="M200 155C235 145 250 175 230 190C215 200 200 185 200 170"/>
        </g>
        <!-- Natural Mineral Pigments: Red Ocher & White Lime Accents -->
        <g fill="#D62828">
          <circle cx="170" cy="75" r="4"/>
          <circle cx="230" cy="110" r="4"/>
          <circle cx="170" cy="145" r="4"/>
          <circle cx="230" cy="180" r="4"/>
        </g>
        <g fill="#FFFFFF" opacity="0.8">
          <circle cx="175" cy="80" r="2.5"/>
          <circle cx="225" cy="115" r="2.5"/>
          <circle cx="175" cy="150" r="2.5"/>
          <circle cx="225" cy="185" r="2.5"/>
        </g>
        <!-- Bone Chisel Tool (Pahat Tulang Kasuari) -->
        <polygon points="120,180 135,160 140,165 125,185" fill="#EAE2B7" stroke="#3D2010" stroke-width="1"/>
      </svg>
    `,

    "maker-papua-barat": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="pb-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#0A181C"/>
            <stop offset="60%" stop-color="#142C33"/>
            <stop offset="100%" stop-color="#071216"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#pb-bg)"/>
        <!-- Mansinam Island Coastal Wave Lines & Cross Monument Silhouette -->
        <path d="M0 180C100 170 300 170 400 180" stroke="#168AAD" stroke-opacity="0.3" stroke-width="2"/>
        <!-- Monument Silhouette in Distance -->
        <path d="M80 170V130H70V120H80V100H90V120H100V130H90V170Z" fill="#C9A567" opacity="0.3"/>
        <!-- Woven Wild Grass Mat (Kain Rumput Mansinam) -->
        <rect x="115" y="60" width="170" height="120" rx="4" fill="#3A3826" stroke="#C9A567" stroke-width="1.5"/>
        <!-- Woven Grass Texture Lines -->
        <g stroke="#C2A649" stroke-width="1.5" stroke-opacity="0.7">
          <line x1="125" y1="80" x2="275" y2="80"/>
          <line x1="125" y1="100" x2="275" y2="100"/>
          <line x1="125" y1="120" x2="275" y2="120"/>
          <line x1="125" y1="140" x2="275" y2="140"/>
          <line x1="125" y1="160" x2="275" y2="160"/>
        </g>
        <!-- Cowrie Shell Border (Kulit Kerang Kulit Manis) -->
        <g fill="#F8F9FA">
          <ellipse cx="130" cy="70" rx="4" ry="6"/><ellipse cx="150" cy="70" rx="4" ry="6"/>
          <ellipse cx="170" cy="70" rx="4" ry="6"/><ellipse cx="190" cy="70" rx="4" ry="6"/>
          <ellipse cx="210" cy="70" rx="4" ry="6"/><ellipse cx="230" cy="70" rx="4" ry="6"/>
          <ellipse cx="250" cy="70" rx="4" ry="6"/><ellipse cx="270" cy="70" rx="4" ry="6"/>
        </g>
      </svg>
    `,

    "maker-papua-selatan": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="ps-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1A0D08"/>
            <stop offset="60%" stop-color="#30160C"/>
            <stop offset="100%" stop-color="#120805"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#ps-bg)"/>
        <!-- Savannah Grassland Reeds & Ant-hill Silhouette Backdrop -->
        <path d="M60 210L70 170L80 210 M320 210L330 160L340 210" stroke="#C9A567" stroke-opacity="0.3" stroke-width="2"/>
        <!-- Tall Hourglass Marind-Anim Wooden War Shield -->
        <g>
          <!-- Shield Body (Carved Hardwood) -->
          <path d="M165 40C190 35 210 35 235 40L230 115C225 125 225 135 230 145L235 210C210 215 190 215 165 210L170 145C175 135 175 125 170 115Z" fill="#3E1A0C" stroke="#C9A567" stroke-width="2"/>
          <!-- Deep-carved Ancestor Eye & Solar Spirals -->
          <g stroke="#FFFFFF" stroke-width="2" fill="none">
            <circle cx="200" cy="75" r="14"/>
            <circle cx="200" cy="75" r="6" fill="#D62828"/>
            <circle cx="200" cy="175" r="14"/>
            <circle cx="200" cy="175" r="6" fill="#D62828"/>
            <!-- Symmetrical Chevron Notches -->
            <path d="M185 110L200 125L215 110 M185 140L200 125L215 140"/>
          </g>
          <!-- Cassowary Feathers on Shield Top -->
          <g stroke="#C9A567" stroke-width="1.5">
            <line x1="200" y1="35" x2="200" y2="15"/>
            <line x1="190" y1="35" x2="180" y2="18"/>
            <line x1="210" y1="35" x2="220" y2="18"/>
          </g>
        </g>
      </svg>
    `,

    "maker-papua-tengah": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="pt-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#17140B"/>
            <stop offset="60%" stop-color="#2B2512"/>
            <stop offset="100%" stop-color="#120F08"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#pt-bg)"/>
        <!-- Misty Baliem Mountain Valley Curves in Background -->
        <path d="M0 130C80 90 140 120 200 100C260 80 320 110 400 80V240H0Z" fill="#1C2114" opacity="0.35"/>
        <!-- Authentic Noken String Bag (Knotless Netting / Anggrek Kuning) -->
        <!-- Strap (Tali Noken to Forehead) -->
        <path d="M150 45C170 30 230 30 250 45L230 110H170L150 45Z" stroke="#E5C384" stroke-width="2.5" fill="none"/>
        <!-- Bag Pouch (Kantung Anyam Serat Anggrek Emas) -->
        <path d="M160 110C150 150 160 195 200 195C240 195 250 150 240 110Z" fill="#99701A" stroke="#FFD166" stroke-width="2"/>
        <!-- Looped Mesh Pattern (Knotless Netting Textures) -->
        <g stroke="#FFD166" stroke-width="1.2" opacity="0.8">
          <path d="M165 125C180 135 220 135 235 125"/>
          <path d="M163 145C180 155 220 155 237 145"/>
          <path d="M165 165C180 175 220 175 235 165"/>
          <!-- Vertical Interlocks -->
          <line x1="180" y1="110" x2="180" y2="185" stroke-dasharray="2 3"/>
          <line x1="200" y1="110" x2="200" y2="192" stroke-dasharray="2 3"/>
          <line x1="220" y1="110" x2="220" y2="185" stroke-dasharray="2 3"/>
        </g>
        <!-- Wild Orchid (Anggrek Hutan) Golden Blossom Accent -->
        <g fill="#FFD166">
          <circle cx="200" cy="95" r="4"/><circle cx="193" cy="92" r="3"/><circle cx="207" cy="92" r="3"/>
        </g>
      </svg>
    `,

    "maker-papua-pegunungan": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="pp-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#141712"/>
            <stop offset="60%" stop-color="#1E2A1E"/>
            <stop offset="100%" stop-color="#0E120D"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#pp-bg)"/>
        <!-- Snow-capped Peak of Jayawijaya (Puncak Jaya) in Silhouette -->
        <polygon points="120,150 200,60 280,150" fill="#18241B" stroke="#C9A567" stroke-opacity="0.3" stroke-width="1.5"/>
        <polygon points="180,82 200,60 220,82 210,88 200,82 190,88" fill="#FFFFFF" opacity="0.8"/>
        <!-- Wamena Head-borne Noken with Indigenous Forest Bark Threads -->
        <path d="M140 80C170 65 230 65 260 80L240 145C230 190 170 190 160 145Z" fill="#4A341E" stroke="#C9A567" stroke-width="1.8"/>
        <!-- Layered Loop Stitches -->
        <g stroke="#E5C384" stroke-width="1.2" opacity="0.75">
          <path d="M165 100C180 110 220 110 235 100"/>
          <path d="M162 120C180 130 220 130 238 120"/>
          <path d="M162 140C180 150 220 150 238 140"/>
          <path d="M168 160C180 170 220 170 232 160"/>
        </g>
        <!-- Dani Honai Hut Silhouette on Left -->
        <path d="M60 180C60 155 80 140 100 140C120 140 140 155 140 180Z" fill="#3D2914" stroke="#C9A567" stroke-width="1"/>
        <rect x="65" y="180" width="70" height="25" fill="#24190D"/>
      </svg>
    `,

    "maker-papua-barat-daya": `
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover">
        <defs>
          <linearGradient id="pbd-bg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#081A1C"/>
            <stop offset="60%" stop-color="#10363A"/>
            <stop offset="100%" stop-color="#061214"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#pbd-bg)"/>
        <!-- Iconic Karst Mushroom Islands of Wayag & Misool (Raja Ampat) -->
        <path d="M60 140C50 110 80 90 100 90C120 90 150 110 140 140C130 148 70 148 60 140Z" fill="#0C2528" stroke="#168AAD" stroke-width="1.5"/>
        <path d="M260 140C250 110 280 90 300 90C320 90 350 110 340 140C330 148 270 148 260 140Z" fill="#0C2528" stroke="#168AAD" stroke-width="1.5"/>
        <!-- Clear Lagoon Water -->
        <path d="M0 155C100 150 300 150 400 155V240H0V155Z" fill="#0E4148" opacity="0.6"/>
        <!-- Woven Sea-Pandanus Floor Mat (Tikar Pandan Laut Raja Ampat) in Foreground -->
        <polygon points="120,110 280,110 320,205 80,205" fill="#755E38" stroke="#E5C384" stroke-width="1.8"/>
        <!-- Zigzag Diamond Diagonal Weave Pattern -->
        <g stroke="#FFD166" stroke-width="1.4" opacity="0.75">
          <line x1="140" y1="110" x2="260" y2="205"/>
          <line x1="180" y1="110" x2="300" y2="205"/>
          <line x1="220" y1="110" x2="100" y2="205"/>
          <line x1="260" y1="110" x2="140" y2="205"/>
        </g>
        <!-- Fluid Manta Ray Silhouette Swimming through Lagoon -->
        <path d="M185 180C170 165 140 168 150 178C160 185 185 185 200 182C215 185 240 185 250 178C260 168 230 165 215 180C210 195 200 215 200 215C200 215 190 195 185 180Z" fill="#061214" stroke="#52B788" stroke-width="1"/>
      </svg>
    `
  };

  window.MAKER_ILLUSTRATIONS = illustrations;

  window.getMakerIllustrationSvg = function (makerId) {
    if (!makerId) return illustrations["maker-aceh"];
    const id = String(makerId).trim();
    if (illustrations[id]) return illustrations[id];

    const prefixed = "maker-" + id.replace(/^maker-/, "");
    if (illustrations[prefixed]) return illustrations[prefixed];

    return illustrations["maker-aceh"];
  };

  console.log("WARISARA: 38 Maker Illustrations loaded successfully.");
})();
