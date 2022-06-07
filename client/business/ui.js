document.addEventListener("DOMContentLoaded", () => {
    App.init();
});

/**
 * Offer Form
 */
const offerForm = document.querySelector("#offerForm");

offerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = offerForm["name"].value;
    const objective = offerForm["objective"].value;
    const description = offerForm["description"].value;
    const location = offerForm["location"].value;
    const email = offerForm["email"].value;
    const phone = offerForm["phone"].value;
    App.createOffer(name, objective, description, location, email, phone);
});

/**
 * Offer Info Modal
 */

function openInfoModal(id) {
    App.getOffer(id);
}