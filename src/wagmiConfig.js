import { http, createConfig } from 'wagmi';
import { berachain } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// Configuration Wagmi pour Berachain
export const config = createConfig({
  chains: [berachain],
  connectors: [
    injected(),
    // Vous pouvez ajouter WalletConnect si vous avez un projectId
    // walletConnect({ projectId: 'YOUR_PROJECT_ID' }),
  ],
  transports: {
    [berachain.id]: http(),
  },
});
