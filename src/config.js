/**
 * Configuration for the polyfill library
 */

let config = {
  enableLogging: false,
  useSecureRandom: true,
};

/**
 * Get current configuration
 * @returns {Object} Current configuration
 */
function getConfig() {
  return config;
}

/**
 * Configure the polyfill library
 * @param {Object} newConfig - Configuration options
 * @param {boolean} newConfig.enableLogging - Enable console logging
 * @param {boolean} newConfig.useSecureRandom - Use more secure random number generation
 */
function configure(newConfig = {}) {
  config = {
    ...config,
    ...newConfig,
  };
  
  if (config.enableLogging && typeof __DEV__ !== 'undefined' && __DEV__) {
    console.log('[rn-crypto-polyfill] Configuration updated:', config);
  }
}

module.exports = { getConfig, configure };
