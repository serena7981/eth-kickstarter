const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "lottery lyrics bread mimic math time category muffin final shuffle distance hold",
  "https://rinkeby.infura.io/v3/d58e991929dd4db3bffc50cd3939a1ef"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] })
    .catch((err) => console.log(err));

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
