import { T as ThirdwebAuth } from '../../dist/auth-d9d94dbd.browser.esm.js';
import { EthersWallet } from '@thirdweb-dev/wallets/evm/wallets/ethers';
import { ethers } from 'ethers';
import CredentialsProvider from 'next-auth/providers/credentials';
import 'uuid';
import 'zod';

function ThirdwebAuthProvider(cfg) {
  const wallet = new EthersWallet(ethers.Wallet.createRandom());
  const auth = new ThirdwebAuth(wallet, cfg.domain);
  return CredentialsProvider({
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
        const address = await auth.verify(parsedPayload, verifyOptions);
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
  if (params.token.sub && ethers.utils.isAddress(params.token.sub)) {
    params.session.user = {
      ...params.session.user,
      address: params.token.sub
    };
  }
  return params.session;
}

export { ThirdwebAuthProvider, authSession };
