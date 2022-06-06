App = {
  contracts: {},
  init: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
    await App.renderOffers();
  },
  loadWeb3: async () => {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else if (web3) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log(
        "No ethereum browser is installed. Try it installing MetaMask "
      );
    }
  },
  loadAccount: async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    App.account = accounts[0];
  },
  loadContract: async () => {
    try {
      const res = await fetch("../EkokyContract.json");
      const offersContractJSON = await res.json();
      App.contracts.offersContract = TruffleContract(offersContractJSON);
      App.contracts.offersContract.setProvider(App.web3Provider);

      App.offersContract = await App.contracts.offersContract.deployed();
    } catch (error) {
      console.error(error);
    }
  },
  render: async () => {
    document.getElementById("account").innerText = App.account;
  },
  renderOffers: async () => {
    const offersCounter = await App.offersContract.offersCounter();
    const offerCounterNumber = offersCounter.toNumber();

    let html = "";

    for (let i = 1; i <= offerCounterNumber; i++) {
      const offer = await App.offersContract.offers(i);
      const offerId = offer[0].toNumber();
      const offerInterested = offer[1].toNumber();
      const offerName = offer[2];
      const offerObjective = offer[3];
      const offerLocation = offer[4];
      const offerEmail = offer[5];
      const offerPhone = offer[6];
      const offerCreatedAt = offer[7];

      // Creating a offer Card
      let offerElement = `<div class="col-6">
        <div class="card bg-light rounded-0 mb-2">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span>Institution: ${offerName}  at  ${new Date(
              offerCreatedAt * 1000
            ).toLocaleString()}</span>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Objective: ${offerObjective}</li>
            <li class="list-group-item">Location: ${offerLocation}</li>
          </ul>
        </div>
      </div>`;
      html += offerElement;
    }

    document.querySelector("#offersList").innerHTML = html;
  },
  createOffer: async (name, objective, location, email, phone) => {
    try {
      const result = await App.offersContract.createOffer(0, name, objective, location, email, phone, {
        from: App.account,
      });
      console.log(result.logs[0].args);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  },
};
