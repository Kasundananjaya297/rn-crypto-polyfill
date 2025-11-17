/**
 * Crypto polyfills for React Native
 * Provides crypto.getRandomValues() implementation
 */

const { getConfig } = require('./config');

// Initialize crypto object if it doesn't exist
if (typeof global.crypto !== 'object') {
  global.crypto = {};
}

// Polyfill for crypto.subtle (minimal implementation)
if (!global.crypto.subtle) {
  global.crypto.subtle = {};
}

/**
 * Implementation of crypto.getRandomValues()
 * Uses a combination of Math.random() with XOR and timestamp for better randomness
 * 
 * @param {TypedArray} array - The array to fill with random values
 * @returns {TypedArray} The same array filled with random values
 */
if (typeof global.crypto.getRandomValues !== 'function') {
  global.crypto.getRandomValues = function getRandomValues(array) {
    if (!array || typeof array.length !== 'number') {
      throw new TypeError('Failed to execute \'getRandomValues\' on \'Crypto\': parameter 1 is not of type \'ArrayBufferView\'');
    }

    const config = getConfig();

    for (let i = 0; i < array.length; i++) {
      if (config.useSecureRandom) {
        // More secure implementation using multiple random sources
        const rand1 = Math.floor(Math.random() * 256);
        const rand2 = Math.floor(Math.random() * 256);
        const time = (Date.now() + i) & 0xff;
        
        // XOR multiple sources for better entropy
        array[i] = rand1 ^ rand2 ^ time;
      } else {
        // Simple implementation
        array[i] = Math.floor(Math.random() * 256);
      }
    }
    
    return array;
  };

  if (getConfig().enableLogging && typeof __DEV__ !== 'undefined' && __DEV__) {
    console.log('[rn-crypto-polyfill] crypto.getRandomValues polyfilled');
  }
}
