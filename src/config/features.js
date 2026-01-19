/**
 * Feature flags and configuration constants
 */

export const FEATURES = {
  // Toggle Haiku Widget functionality
  HAIKU_WIDGET: false,

  // Toggle Wallet Connect functionality
  WALLET_CONNECT: false,
};

// Environment-specific overrides
if (import.meta.env.DEV) {
  // Development environment overrides can go here
}

// Application constants
export const APP_CONFIG = {
  // Maximum search term length
  MAX_SEARCH_LENGTH: 100,

  // Results per page for pagination (future use)
  RESULTS_PER_PAGE: 20,

  // Application metadata
  APP_NAME: 'Berachain Ecosystem by BeraLand',
  APP_DESCRIPTION: 'Explore projects building on Berachain',
};