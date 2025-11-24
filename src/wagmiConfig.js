import { http, createConfig } from 'wagmi';
import { berachain } from 'wagmi/chains';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';

export const config = createConfig({
  chains: [berachain],
  connectors: [
    injected({
      target: 'metaMask',
      shimDisconnect: true,
    }),
    injected({
      target: 'rabby',
      shimDisconnect: true,
    }),
    coinbaseWallet({
      appName: 'Berachain Ecosystem by BeraLand',
    }),
    walletConnect({
      projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo',
      showQrModal: true,
    }),
  ],
  transports: {
    [berachain.id]: http(),
  },
});
