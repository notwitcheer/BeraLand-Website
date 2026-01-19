/**
 * Environment variable validation utility
 */

// Define required environment variables
const REQUIRED_ENV_VARS = {
  // Optional: Widget key is only needed if widget is enabled
  VITE_HAIKU_WIDGET_KEY: false, // Not required since widget is disabled by default
};

// Define optional environment variables with defaults
const OPTIONAL_ENV_VARS = {
  NODE_ENV: 'development',
  DEV: true,
  PROD: false,
};

/**
 * Validate environment variables
 * @returns {Object} Validation result with errors and warnings
 */
export const validateEnvironment = () => {
  const errors = [];
  const warnings = [];
  const env = import.meta.env;

  // Check required variables
  Object.entries(REQUIRED_ENV_VARS).forEach(([key, isRequired]) => {
    if (isRequired && (!env[key] || env[key].trim() === '')) {
      errors.push({
        variable: key,
        message: `${key} is required but not set`,
        suggestion: `Add ${key}=your_value_here to your .env file`
      });
    }
  });

  // Check for potentially missing optional variables
  if (!env.VITE_HAIKU_WIDGET_KEY) {
    warnings.push({
      variable: 'VITE_HAIKU_WIDGET_KEY',
      message: 'Haiku widget key not configured',
      suggestion: 'If you plan to use the Haiku widget, set VITE_HAIKU_WIDGET_KEY in your .env file'
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    env: {
      isDevelopment: env.DEV,
      isProduction: env.PROD,
      mode: env.MODE,
    }
  };
};

/**
 * Get environment variable with fallback
 * @param {string} key - Environment variable key
 * @param {string} defaultValue - Default value if not set
 * @returns {string} Environment variable value or default
 */
export const getEnvVar = (key, defaultValue = '') => {
  const value = import.meta.env[key];
  return value !== undefined ? value : defaultValue;
};

/**
 * Check if a feature should be enabled based on environment
 * @param {string} featureKey - Feature key to check
 * @returns {boolean} Whether feature should be enabled
 */
export const isFeatureEnabled = (featureKey) => {
  const envKey = `VITE_ENABLE_${featureKey.toUpperCase()}`;
  const envValue = getEnvVar(envKey, 'false');
  return envValue.toLowerCase() === 'true';
};

/**
 * Log environment validation results
 */
export const logEnvironmentStatus = () => {
  const validation = validateEnvironment();

  if (validation.errors.length > 0) {
    console.error('❌ Environment Validation Errors:');
    validation.errors.forEach(error => {
      console.error(`  - ${error.message}`);
      console.error(`    Suggestion: ${error.suggestion}`);
    });
  }

  if (validation.warnings.length > 0 && validation.env.isDevelopment) {
    console.warn('⚠️  Environment Warnings:');
    validation.warnings.forEach(warning => {
      console.warn(`  - ${warning.message}`);
      console.warn(`    Suggestion: ${warning.suggestion}`);
    });
  }

  if (validation.env.isDevelopment) {
    console.info('🐻 Berachain Ecosystem - Environment Status:');
    console.info(`  Mode: ${validation.env.mode}`);
    console.info(`  Environment: ${validation.env.isDevelopment ? 'Development' : 'Production'}`);
  }

  return validation;
};