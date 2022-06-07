document.addEventListener("DOMContentLoaded", () => {
    App.init();
});

/**
 * Offer Info Modal
 */

function openInfoModal(id) {
    App.getOffer(id);
}