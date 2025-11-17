/**
 * TextEncoder and TextDecoder polyfills for React Native
 * Required by AWS SDK and other libraries
 */

const { getConfig } = require('./config');

/**
 * TextEncoder polyfill
 * Converts strings to UTF-8 encoded Uint8Array
 */
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = class TextEncoder {
    constructor() {
      this.encoding = 'utf-8';
    }

    /**
     * Encode a string to UTF-8 bytes
     * @param {string} str - The string to encode
     * @returns {Uint8Array} UTF-8 encoded bytes
     */
    encode(str = '') {
      const utf8 = [];
      
      for (let i = 0; i < str.length; i++) {
        let charcode = str.charCodeAt(i);
        
        // 1-byte sequence (0x00-0x7F)
        if (charcode < 0x80) {
          utf8.push(charcode);
        }
        // 2-byte sequence (0x80-0x7FF)
        else if (charcode < 0x800) {
          utf8.push(
            0xc0 | (charcode >> 6),
            0x80 | (charcode & 0x3f)
          );
        }
        // 3-byte sequence or surrogate pair
        else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(
            0xe0 | (charcode >> 12),
            0x80 | ((charcode >> 6) & 0x3f),
            0x80 | (charcode & 0x3f)
          );
        }
        // 4-byte sequence (surrogate pair)
        else {
          i++;
          charcode = 0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
          utf8.push(
            0xf0 | (charcode >> 18),
            0x80 | ((charcode >> 12) & 0x3f),
            0x80 | ((charcode >> 6) & 0x3f),
            0x80 | (charcode & 0x3f)
          );
        }
      }
      
      return new Uint8Array(utf8);
    }
  };

  if (getConfig().enableLogging && typeof __DEV__ !== 'undefined' && __DEV__) {
    console.log('[rn-crypto-polyfill] TextEncoder polyfilled');
  }
}

/**
 * TextDecoder polyfill
 * Converts UTF-8 encoded bytes to strings
 */
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = class TextDecoder {
    constructor(label = 'utf-8', options = {}) {
      this.encoding = label;
      this.fatal = options.fatal || false;
      this.ignoreBOM = options.ignoreBOM || false;
    }

    /**
     * Decode UTF-8 bytes to a string
     * @param {Uint8Array} bytes - The bytes to decode
     * @returns {string} Decoded string
     */
    decode(bytes = new Uint8Array(0)) {
      // Handle different input types
      if (bytes.buffer) {
        bytes = new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      }

      let str = '';
      let i = 0;

      while (i < bytes.length) {
        const byte = bytes[i];

        // 1-byte sequence (0xxxxxxx)
        if (byte < 0x80) {
          str += String.fromCharCode(byte);
          i++;
        }
        // 2-byte sequence (110xxxxx 10xxxxxx)
        else if (byte < 0xe0) {
          str += String.fromCharCode(
            ((byte & 0x1f) << 6) |
            (bytes[i + 1] & 0x3f)
          );
          i += 2;
        }
        // 3-byte sequence (1110xxxx 10xxxxxx 10xxxxxx)
        else if (byte < 0xf0) {
          str += String.fromCharCode(
            ((byte & 0x0f) << 12) |
            ((bytes[i + 1] & 0x3f) << 6) |
            (bytes[i + 2] & 0x3f)
          );
          i += 3;
        }
        // 4-byte sequence (11110xxx 10xxxxxx 10xxxxxx 10xxxxxx)
        else {
          const codepoint = 
            ((byte & 0x07) << 18) |
            ((bytes[i + 1] & 0x3f) << 12) |
            ((bytes[i + 2] & 0x3f) << 6) |
            (bytes[i + 3] & 0x3f);
          
          // Convert to surrogate pair
          const surrogate = codepoint - 0x10000;
          str += String.fromCharCode(
            0xd800 + (surrogate >> 10),
            0xdc00 + (surrogate & 0x3ff)
          );
          i += 4;
        }
      }

      return str;
    }
  };

  if (getConfig().enableLogging && typeof __DEV__ !== 'undefined' && __DEV__) {
    console.log('[rn-crypto-polyfill] TextDecoder polyfilled');
  }
}
