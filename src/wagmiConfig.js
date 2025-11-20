import { http, createConfig } from 'wagmi';
import { berachain } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [berachain],
  connectors: [
    injected(),
  ],
  transports: {
    [berachain.id]: http(),
  },
});
