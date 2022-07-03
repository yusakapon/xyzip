import web3 from "./web3";
import tokenABI from "./web3/dammy_abi";

const dammy_address = "0xdceaf1652a131F32a821468Dc03A92df0edd86Ea";
const dammy_abi = tokenABI;

export default new web3.eth.Contract(dammy_abi, dammy_address);
