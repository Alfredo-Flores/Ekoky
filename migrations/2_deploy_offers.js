const EkokyContract = artifacts.require("EkokyContract.sol");

module.exports = function (deployer) {
  deployer.deploy(EkokyContract);
};
