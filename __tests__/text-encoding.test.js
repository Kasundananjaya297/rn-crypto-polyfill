/**
 * Tests for TextEncoder and TextDecoder polyfills
 */

// Clear any existing polyfills
delete global.TextEncoder;
delete global.TextDecoder;

// Import the polyfill
require('../src/text-encoding');

describe('TextEncoder Polyfill', () => {
  it('should exist globally', () => {
    expect(global.TextEncoder).toBeDefined();
    expect(typeof global.TextEncoder).toBe('function');
  });

  it('should create TextEncoder instance', () => {
    const encoder = new TextEncoder();
    expect(encoder).toBeInstanceOf(TextEncoder);
    expect(encoder.encoding).toBe('utf-8');
  });

  it('should encode ASCII strings', () => {
    const encoder = new TextEncoder();
    const result = encoder.encode('Hello');
    
    expect(result).toBeInstanceOf(Uint8Array);
    expect(Array.from(result)).toEqual([72, 101, 108, 108, 111]);
  });

  it('should encode empty string', () => {
    const encoder = new TextEncoder();
    const result = encoder.encode('');
    
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.length).toBe(0);
  });

  it('should encode unicode strings', () => {
    const encoder = new TextEncoder();
    const result = encoder.encode('Hello 👋');
    
    expect(result).toBeInstanceOf(Uint8Array);
    // "Hello " = [72, 101, 108, 108, 111, 32]
    // "👋" (U+1F44B) = [240, 159, 145, 139]
    expect(result.length).toBeGreaterThan(6);
  });

  it('should encode special characters', () => {
    const encoder = new TextEncoder();
    const result = encoder.encode('café');
    
    expect(result).toBeInstanceOf(Uint8Array);
    // 'é' should be encoded as 2 bytes in UTF-8
    expect(result.length).toBe(5);
  });
});

describe('TextDecoder Polyfill', () => {
  it('should exist globally', () => {
    expect(global.TextDecoder).toBeDefined();
    expect(typeof global.TextDecoder).toBe('function');
  });

  it('should create TextDecoder instance', () => {
    const decoder = new TextDecoder();
    expect(decoder).toBeInstanceOf(TextDecoder);
    expect(decoder.encoding).toBe('utf-8');
  });

  it('should decode ASCII bytes', () => {
    const decoder = new TextDecoder();
    const bytes = new Uint8Array([72, 101, 108, 108, 111]);
    const result = decoder.decode(bytes);
    
    expect(result).toBe('Hello');
  });

  it('should decode empty array', () => {
    const decoder = new TextDecoder();
    const result = decoder.decode(new Uint8Array(0));
    
    expect(result).toBe('');
  });

  it('should decode without input', () => {
    const decoder = new TextDecoder();
    const result = decoder.decode();
    
    expect(result).toBe('');
  });

  it('should encode and decode round-trip', () => {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    
    const original = 'Hello, World! 🌍';
    const encoded = encoder.encode(original);
    const decoded = decoder.decode(encoded);
    
    expect(decoded).toBe(original);
  });

  it('should handle multi-byte characters', () => {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    
    const strings = [
      'café',
      'こんにちは',
      '你好',
      '🎉🎊🎈',
      'Ñoño',
    ];
    
    strings.forEach(str => {
      const encoded = encoder.encode(str);
      const decoded = decoder.decode(encoded);
      expect(decoded).toBe(str);
    });
  });
});
