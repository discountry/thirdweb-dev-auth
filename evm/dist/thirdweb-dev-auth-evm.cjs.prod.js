'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var auth = require('../../dist/auth-a4110b95.cjs.prod.js');
var ethers = require('@thirdweb-dev/wallets/evm/wallets/ethers');
var ethers$1 = require('ethers');
var privateKey = require('@thirdweb-dev/wallets/evm/wallets/private-key');
require('uuid');
require('zod');

const authMap = new Map();
let wallet;
async function verifyLogin(domain, payload, options) {
  wallet = wallet || new ethers.EthersWallet(ethers$1.ethers.Wallet.createRandom());
  let auth$1;
  if (!authMap.has(domain)) {
    auth$1 = new auth.ThirdwebAuth(wallet, domain);
    authMap.set(domain, auth$1);
  } else {
    auth$1 = authMap.get(domain);
  }
  try {
    const address = await auth$1.verify(payload, options);
    return {
      address,
      error: undefined
    };
  } catch (err) {
    return {
      address: undefined,
      error: err.message
    };
  }
}

Object.defineProperty(exports, 'PrivateKeyWallet', {
  enumerable: true,
  get: function () { return privateKey.PrivateKeyWallet; }
});
exports.verifyLogin = verifyLogin;
