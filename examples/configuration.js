/**
 * Example: Configuration options
 */

import { configure } from '@binarywise/rn-crypto-polyfill';

// Basic configuration
configure({
  enableLogging: __DEV__, // Enable logging in development
  useSecureRandom: true,  // Use more secure random generation
});

// Development mode configuration
if (__DEV__) {
  configure({
    enableLogging: true,
    useSecureRandom: true,
  });
}

// Production mode configuration
if (!__DEV__) {
  configure({
    enableLogging: false,
    useSecureRandom: true,
  });
}
