/**
 * ReadableStream polyfill for React Native
 * AWS SDK checks for ReadableStream to determine if payload is streaming
 * This is a minimal implementation just for type checking
 */

const { getConfig } = require('./config');

if (typeof global.ReadableStream === 'undefined') {
  global.ReadableStream = class ReadableStream {
    constructor(underlyingSource = {}, strategy = {}) {
      // Minimal implementation - just needs to exist for AWS SDK type checking
      this.locked = false;
      this._underlyingSource = underlyingSource;
      this._strategy = strategy;
    }

    getReader() {
      if (this.locked) {
        throw new TypeError('ReadableStream is locked');
      }
      this.locked = true;
      return {
        read: () => Promise.resolve({ done: true, value: undefined }),
        releaseLock: () => { this.locked = false; },
        closed: Promise.resolve(undefined),
      };
    }

    cancel(reason) {
      return Promise.resolve();
    }
  };

  if (getConfig().enableLogging && typeof __DEV__ !== 'undefined' && __DEV__) {
    console.log('[rn-crypto-polyfill] ReadableStream polyfilled');
  }
}
