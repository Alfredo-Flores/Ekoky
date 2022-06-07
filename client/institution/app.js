App = {
    contracts: {},
    init: async() => {
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        await App.render();
        await App.renderOffers();
    },
    loadWeb3: async() => {
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
    loadAccount: async() => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        App.account = accounts[0];
    },
    loadContract: async() => {
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
    render: async() => {
        document.getElementById("account").innerText = App.account;
    },
    renderOffers: async() => {
        const offersCounter = await App.offersContract.offersCounter();
        const offerCounterNumber = offersCounter.toNumber();

        let html = "";

        for (let i = 1; i <= offerCounterNumber; i++) {
            const offer = await App.offersContract.offers(i);
            const offerId = offer[0].toNumber();
            const offerInterested = offer[1].toNumber();
            const offerName = offer[2];
            const offerObjective = offer[3];
            const offerdescription = offer[4];
            const offerLocation = offer[5];
            const offerEmail = offer[6];
            const offerPhone = offer[7];
            const offerCreatedAt = offer[8];

            // Creating a offer Card
            let offerElement = `<div class="col-6">
      <div class="card bg-light mb-4 mx-2 clickable" onclick="openInfoModal(${offerId})">
        <div class="card-header text-center">
          <span>${offerName}</span>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" style="min-height: 150px;">${offerObjective}</li>
        </ul>
      </div>
    </div>`;
            html += offerElement;
        }

        document.querySelector("#offersList").innerHTML = html;
    },
    createOffer: async(name, objective, description, location, email, phone) => {
        try {
            const result = await App.offersContract.createOffer(
                0,
                name,
                objective,
                description,
                location,
                email,
                phone, {
                    from: App.account,
                }
            );
            console.log(result.logs[0].args);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    },
    getOffer: async(offerId) => {
        const offer = await App.offersContract.offers(offerId);

        let infoModal = new bootstrap.Modal(document.getElementById("infoModal"));

        const offerName = offer[2];
        const offerObjective = offer[3];
        const offerDescription = offer[4];
        const offerLocation = offer[5];
        const offerEmail = offer[6];
        const offerPhone = offer[7];
        const offerCreatedAt = offer[8];

        document.getElementById("infoModalLabel").innerText = offerName;
        document.getElementById("infoObjective").innerText = offerObjective;
        document.getElementById("infoDescription").innerText = offerDescription;
        document.getElementById("infoLocation").innerText = offerLocation;
        document.getElementById("infoEmail").innerText = offerEmail;
        document.getElementById("infoPhone").innerText = offerPhone;
        document.getElementById("infoCreatedAt").innerText = new Date(
            offerCreatedAt * 1000
        );

        infoModal.show();
    },
};