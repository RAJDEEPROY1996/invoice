const dygnifyInvoice = artifacts.require("dygnifyInvoice");

module.exports = function (deployer) {
  deployer.deploy(dygnifyInvoice);
};
