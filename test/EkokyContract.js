const EkokyContract = artifacts.require("EkokyContract");

contract("EkokyContract", (accounts) => {
  before(async () => {
    this.ekokyContract = await EkokyContract.deployed();
  });

  it("migrate deployed successfully", async () => {
    const address = await this.ekokyContract.address;

    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

  it("get offers List", async () => {
    const offersCounter = await this.ekokyContract.offersCounter();
    const offer = await this.ekokyContract.offers(offersCounter);

    assert.equal(offer.id.toNumber(), offersCounter.toNumber());
    assert.equal(offer.name, "Playa del carmen charity");
    assert.equal(offer.objective, "Collecting food for children");
    assert.equal(offersCounter, 1);
  });

  it("offer created successfully", async () => {
    const result = await this.ekokyContract.createOffer(2,"An institute", "for renewable energy from organic waste", "#1337 Mexico", "institute@gmail.com", "012 322 23 44");
    const offerEvent = result.logs[0].args;
    const offersCounter = await this.ekokyContract.offersCounter();

    assert.equal(offersCounter, 2);
    assert.equal(offerEvent.id.toNumber(), 2);
    assert.equal(offerEvent.name, "An institute");
    assert.equal(offerEvent.objective, "for renewable energy from organic waste");
  });
  
  it("create offer with one acc, ''claim'' it with another acc", async () => {
    const result = await this.ekokyContract.createOffer(0,"Durango Charity", "for farming industry", "durango #1337 Mexico", "durangoo@gmail.com", "012 322 23 44", {from: accounts[0]});
    const offerEvent = result.logs[0].args;
    const offersCounter = await this.ekokyContract.offersCounter();

    assert.equal(offersCounter, 3);
    assert.equal(offerEvent.id.toNumber(), 3);
    assert.equal(offerEvent.name, "Durango Charity");
    assert.equal(offerEvent.objective, "for farming industry");

    const resultIncrement = await this.ekokyContract.incrementInterested(3, {from: accounts[1]});
    const offerEventIncrement = resultIncrement.logs[0];

    assert.equal(offerEventIncrement.type, "mined");

  });
});
