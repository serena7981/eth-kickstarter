import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x913B0e7fb37e5857c9D079AC303f12B269B8f6bA"
);

export default instance;
