document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

/**
 * Form
 */
const offerForm = document.querySelector("#offerForm");

offerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = offerForm["name"].value;
  const objetive = offerForm["objective"].value;
  const location = offerForm["location"].value;
  const email = offerForm["email"].value;
  const phone = offerForm["phone"].value;
  App.createOffer(name, objetive, location, email, phone);
});
