'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var auth = require('../../dist/auth-a4110b95.cjs.prod.js');
var ethers = require('@thirdweb-dev/wallets/evm/wallets/ethers');
var ethers$1 = require('ethers');
var CredentialsProvider = require('next-auth/providers/credentials');
require('uuid');
require('zod');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var CredentialsProvider__default = /*#__PURE__*/_interopDefault(CredentialsProvider);

function ThirdwebAuthProvider(cfg) {
  const wallet = new ethers.EthersWallet(ethers$1.ethers.Wallet.createRandom());
  const auth$1 = new auth.ThirdwebAuth(wallet, cfg.domain);
  return CredentialsProvider__default["default"]({
    name: "Credentials",
    credentials: {
      payload: {
        label: "Payload",
        type: "text",
        placeholder: ""
      }
    },
    async authorize(_ref) {
      let {
        payload
      } = _ref;
      try {
        const parsedPayload = JSON.parse(payload);
        const verifyOptions = {
          statement: cfg.authOptions?.statement,
          uri: cfg.authOptions?.uri,
          version: cfg.authOptions?.version,
          chainId: cfg.authOptions?.chainId,
          resources: cfg.authOptions?.resources,
          validateNonce: async nonce => {
            if (cfg.authOptions?.validateNonce) {
              await cfg.authOptions?.validateNonce(nonce);
            }
          }
        };
        const address = await auth$1.verify(parsedPayload, verifyOptions);
        return {
          id: address
        };
      } catch (err) {
        return null;
      }
    }
  });
}
function authSession(params) {
  if (params.token.sub && ethers$1.ethers.utils.isAddress(params.token.sub)) {
    params.session.user = {
      ...params.session.user,
      address: params.token.sub
    };
  }
  return params.session;
}

exports.ThirdwebAuthProvider = ThirdwebAuthProvider;
exports.authSession = authSession;
