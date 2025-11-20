# Configuration du Widget Haiku

## Installation ✅

Le widget Haiku a été installé avec toutes ses dépendances :
- `@haiku-trade/widget` - Le widget de trading Haiku
- `wagmi` & `@wagmi/core` - Gestion des connexions wallet
- `viem` - Librairie Ethereum
- `@tanstack/react-query` - Gestion des requêtes

## Configuration

### 1. Obtenir votre Widget Key

1. Contactez l'équipe Haiku via [leur documentation](https://docs.haiku.trade/haiku/api-and-integrations/developer-resources/widget)
2. Demandez une clé widget pour votre domaine
3. Pour le développement local (`localhost`), la clé fonctionne automatiquement
4. Pour la production, vous devrez faire whitelister votre domaine

### 2. Configurer la clé

Créez un fichier `.env` à la racine du projet :

```bash
cp .env.example .env
```

Puis éditez `.env` et ajoutez votre clé :

```
VITE_HAIKU_WIDGET_KEY=votre_cle_ici
```

## Utilisation

Le bouton "🔄 Trade on Haiku" apparaît dans le header de votre site.

En cliquant dessus, une modale s'ouvre avec le widget Haiku qui permet :
- De connecter son wallet (MetaMask, WalletConnect, etc.)
- D'échanger des tokens sur Berachain
- D'accéder aux protocoles DeFi (Uniswap, Aave, Curve, etc.)

## Personnalisation

### Modifier le thème

Éditez [src/components/HaikuWidgetWrapper.jsx](src/components/HaikuWidgetWrapper.jsx:10) :

```jsx
const widgetConfig = {
  theme: {
    mode: 'dark', // 'light', 'dark', ou 'auto'
  },
};
```

### Options avancées

Vous pouvez ajouter d'autres configurations :

```jsx
const widgetConfig = {
  theme: { mode: 'auto' },
  multiInput: true,              // Permet plusieurs tokens en entrée
  multiOutput: true,             // Permet plusieurs tokens en sortie
  hiddenChains: [1, 137],        // Masquer certaines blockchains
  hiddenProtocols: ['AAVE_V3'],  // Masquer certains protocoles
  preselectedInputs: {           // Pré-remplir des tokens
    'base:0x833589fcd6edb6e08f4c7c32d4f71b54bda02913': '100'
  }
};
```

## Configuration Wagmi

La configuration Wagmi est dans [src/wagmiConfig.js](src/wagmiConfig.js). Elle est actuellement configurée pour Berachain.

Pour ajouter d'autres chains ou connecteurs, modifiez ce fichier.

## Styles

Les styles du bouton et de la modale sont dans :
- [src/App.css](src/App.css) - Bouton "Trade on Haiku"
- [src/components/HaikuWidgetWrapper.css](src/components/HaikuWidgetWrapper.css) - Modale du widget

## Support

- Documentation Haiku: https://docs.haiku.trade/
- Supporte 19+ blockchains
- Intègre Uniswap, Aave, Curve, Balancer, Yearn Finance et plus
