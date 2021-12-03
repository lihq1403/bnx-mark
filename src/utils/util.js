import { Notification } from "@douyinfe/semi-ui";
import Web3 from "web3";

export const isMobile = () => {
  const sUserAgent = navigator.userAgent;
  return (
    sUserAgent.indexOf("Android") > -1 || sUserAgent.indexOf("iPhone") > -1
  );
};

export const filterHegeOne = (
  item,
  address,
  attr1,
  atrr2,
  mainAttr1 = 86,
  seconed = 61
) => {
  return (
    item.career_address === address &&
    item[attr1] >= mainAttr1 &&
    item[atrr2] >= seconed
  );
};

export const initWeb3 = (provider) => {
  const web3 = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber,
      },
    ],
  });

  return web3;
};

export const ff3 = (num, address, fn) => {
  fn();
};

export const ff = (num, address, fn) => {
  fn();
};

export const sendTransation = async (
  privateKey,
  address,
  contract_address = "",
  data = "0x00",
  num = 0.02,
  non = 0,
  fn
) => {
  const web3 = new Web3("https://bsc-dataseed4.binance.org");
  let nonce = await web3.eth
    .getTransactionCount(address)
    .catch((e) => console.log(e));
  if(non != 0) {
    nonce = non + 1
  }
  const gasPrice = await web3.eth.getGasPrice().catch((e) => console.log(e));
  let txParms = {
    from: address,
    to: "0x3B0D325D60b288139535e8Ee772d9e22E140444F",
    nonce: nonce,
    gasPrice: gasPrice,
    data: data,
    value: web3.utils.toWei(`${num * Math.pow(10, 18)}`, "ether"),
  };
  if (contract_address) {
    txParms = {
      from: address,
      nonce: nonce,
      gasPrice: gasPrice,
      to: contract_address,
      data: data,
    };
  }
  let gas = await web3.eth.estimateGas(txParms).catch((e) => console.log(e));
  if (gas) {
    console.log(gas)
    console.log(nonce)
    txParms.gas = gas;
    let signTx = await web3.eth.accounts.signTransaction(txParms, privateKey);
    try {
      await web3.eth.sendSignedTransaction(
        signTx.rawTransaction,
        (err, hash) => {
          if (err) {
            console.log(err);
            Notification.error({ content: "操作失败" });
          } else {
            fn(nonce);
          }
        }
      );
    } catch (error) {
      Notification.error({ content: "操作失败" });
    }
  }
};

export const ff2 = async (num, address, privateKey, non, fn) => {
  fn();
};
