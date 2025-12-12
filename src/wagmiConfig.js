import { http, createConfig } from 'wagmi';
import { berachain } from 'wagmi/chains';
import { injected, coinbaseWallet } from 'wagmi/connectors';

const connectors = [
  injected({
    shimDisconnect: true,
  }),
  coinbaseWallet({
    appName: 'Berachain Ecosystem by BeraLand',
  }),
];

export const config = createConfig({
  chains: [berachain],
  connectors,
  transports: {
    [berachain.id]: http(),
  },
});
