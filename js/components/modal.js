window.WARISARA_MODAL = {
  open: function (contentHtml) {
    let modal = document.getElementById("global-modal");
    if (!modal) return;
    const container = document.getElementById("global-modal-content");
    if (container) container.innerHTML = contentHtml;
    modal.classList.remove("hidden");
  },

  close: function () {
    let modal = document.getElementById("global-modal");
    if (modal) modal.classList.add("hidden");
  }
};
