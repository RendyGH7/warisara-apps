const fs = require('fs');
const content = fs.readFileSync('data/stories.js', 'utf8');
eval(content.replace('window.', 'global.'));

const stories = global.STORIES_DATA;

function cleanTTS(text) {
  return text
    .replace(/<br\s*[\/]?>/gi, ' ')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/\*/g, '')
    .replace(/_/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

let md = '# Panduan & Naskah Narator AI Text-to-Speech (WARISARA)\n\n';
md += 'Berikut adalah naskah narasi lengkap yang sudah dibersihkan dari tag HTML atau karakter markdown sehingga siap dicopy langsung ke AI Text-to-Speech (seperti ElevenLabs, OpenAI Audio, Google Cloud TTS, dsb).\n\n';
md += 'Standar format penyimpanan: `assets/audio/stories/{story-id}/page-{1..6}.mp3`\n\n---\n\n';

stories.forEach((s, idx) => {
  md += `## ${idx + 1}. ${s.title}\n`;
  md += `• **Wilayah Asal:** ${s.origin}\n`;
  md += `• **Kategori:** ${s.category}\n`;
  md += `• **Folder Target:** \`assets/audio/stories/${s.id}/\`\n\n`;

  s.pages.forEach((p) => {
    const cleanBody = cleanTTS(p.content);
    const fullScript = `${p.sectionTitle}. ${cleanBody}`;
    md += `### 📄 Halaman ${p.pageNumber}: ${p.sectionTitle}\n`;
    md += `• **Target File:** \`assets/audio/stories/${s.id}/page-${p.pageNumber}.mp3\`\n\n`;
    md += `**Teks Narasi (Copy teks ini ke TTS):**\n\`\`\`text\n${fullScript}\n\`\`\`\n\n`;
  });

  md += '---\n\n';
});

fs.writeFileSync('assets/audio/stories/NASKAH_NARRATOR_TTS.md', md, 'utf8');
console.log('Successfully generated assets/audio/stories/NASKAH_NARRATOR_TTS.md');
