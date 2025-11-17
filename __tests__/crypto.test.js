/**
 * Tests for crypto polyfill
 */

// Clear any existing polyfills
delete global.crypto;

// Import the polyfill
require('../src/crypto');

describe('Crypto Polyfill', () => {
  describe('crypto object', () => {
    it('should create global crypto object', () => {
      expect(global.crypto).toBeDefined();
      expect(typeof global.crypto).toBe('object');
    });

    it('should have subtle property', () => {
      expect(global.crypto.subtle).toBeDefined();
    });
  });

  describe('crypto.getRandomValues', () => {
    it('should exist as a function', () => {
      expect(typeof global.crypto.getRandomValues).toBe('function');
    });

    it('should fill Uint8Array with random values', () => {
      const array = new Uint8Array(16);
      const result = global.crypto.getRandomValues(array);
      
      expect(result).toBe(array);
      expect(array.length).toBe(16);
      
      // Check that values are in valid range
      for (let i = 0; i < array.length; i++) {
        expect(array[i]).toBeGreaterThanOrEqual(0);
        expect(array[i]).toBeLessThanOrEqual(255);
      }
    });

    it('should fill different typed arrays', () => {
      const uint8 = new Uint8Array(8);
      const uint16 = new Uint16Array(8);
      const uint32 = new Uint32Array(8);
      
      global.crypto.getRandomValues(uint8);
      global.crypto.getRandomValues(uint16);
      global.crypto.getRandomValues(uint32);
      
      // Check that arrays are filled
      expect(uint8.some(v => v > 0)).toBeTruthy();
      expect(uint16.some(v => v > 0)).toBeTruthy();
      expect(uint32.some(v => v > 0)).toBeTruthy();
    });

    it('should generate different values on multiple calls', () => {
      const array1 = new Uint8Array(16);
      const array2 = new Uint8Array(16);
      
      global.crypto.getRandomValues(array1);
      global.crypto.getRandomValues(array2);
      
      // Arrays should be different (statistically very unlikely to be the same)
      const identical = array1.every((val, idx) => val === array2[idx]);
      expect(identical).toBeFalsy();
    });

    it('should throw error for invalid input', () => {
      expect(() => {
        global.crypto.getRandomValues(null);
      }).toThrow();
    });
  });
});
