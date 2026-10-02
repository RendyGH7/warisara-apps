/**
 * WARISARA — Pass It On (Closing Narrative & Web Share API)
 */

window.WARISARA_PASS_IT_ON = {
  init: function () {
    const shareBtn = document.getElementById("pass-it-on-share-btn");
    if (shareBtn) {
      shareBtn.addEventListener("click", () => {
        if (navigator.share) {
          navigator.share({
            title: "WARISARA — Yang diwariskan, yang kita teruskan.",
            text: "Jelajahi 38 provinsi dan warisan budaya Nusantara di WARISARA.",
            url: window.location.href
          }).catch(() => {});
        } else {
          navigator.clipboard.writeText(window.location.href);
          alert("Tautan berhasil disalin ke papan klip!");
        }
      });
    }
  }
};
