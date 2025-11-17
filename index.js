// Main entry point - imports all polyfills
require('./src/crypto');
require('./src/text-encoding');
require('./src/streams');

// Export configuration for advanced usage
const { configure } = require('./src/config');
module.exports = { configure };

// Log polyfill status
if (typeof __DEV__ !== 'undefined' && __DEV__) {
  console.log('[rn-crypto-polyfill] Loaded successfully');
}
