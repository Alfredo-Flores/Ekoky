App = {
  contracts: {},
  init: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.renderOffers();
    await App.GetTransactions();
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
      const res = await fetch("EkokyContract.json");
      const offersContractJSON = await res.json();
      App.contracts.offersContract = TruffleContract(offersContractJSON);
      App.contracts.offersContract.setProvider(App.web3Provider);

      App.offersContract = await App.contracts.offersContract.deployed();
    } catch (error) {
      console.error(error);
    }
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
      const offerObjetive = offer[3];
      const offerLocation = offer[4];
      const offerEmail = offer[5];
      const offerPhone = offer[6];
      const offerCreatedAt = offer[7];

      // Creating a offer Card
      let offerElement = `<tr>
        <th scope="row">${offerId}</th>
        <td>${offerName}</td>
        <td>${offerObjetive}</td>
        <td>${new Date(
          offerCreatedAt * 1000
        ).toLocaleString()}</td>
      </tr>`;
      html += offerElement;
    }

    document.querySelector("#offersList").innerHTML = html;
  },
  GetTransactions: async function (){
    let events = App.offersContract.allEvents({fromBlock: 0, toBlock: 'latest'})
    console.log(events)
}
};
