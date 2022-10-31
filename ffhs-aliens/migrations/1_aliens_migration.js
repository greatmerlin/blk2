const Aliens = artifacts.require("Aliens");

module.exports = function (deployer) {
  deployer.deploy(Aliens);
};