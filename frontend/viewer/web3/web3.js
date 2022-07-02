import Web3 from "web3";

let currentWeb3;

// MetaMask ver0.5以降
if (window.ethereum) {
  let instance = new Web3(window.ethereum);
  try {
    // アカウントへのアクセスを要求
    window.ethereum.enable();
    currentWeb3 = instance;
  } catch (error) {
    // アクセスできない時のエラー
    alert("MetaMaskにアクセスできません！");
  }
} else if (window.web3) {
  currentWeb3 = new Web3(window.web3.currentProvider);
} else {
  console.log(
    "Non-Ethereum browser detected. You should consider trying MetaMask!"
  );
}

export default currentWeb3;
