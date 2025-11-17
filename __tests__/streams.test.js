/**
 * Tests for ReadableStream polyfill
 */

// Clear any existing polyfills
delete global.ReadableStream;

// Import the polyfill
require('../src/streams');

describe('ReadableStream Polyfill', () => {
  it('should exist globally', () => {
    expect(global.ReadableStream).toBeDefined();
    expect(typeof global.ReadableStream).toBe('function');
  });

  it('should create ReadableStream instance', () => {
    const stream = new ReadableStream();
    expect(stream).toBeInstanceOf(ReadableStream);
  });

  it('should have locked property', () => {
    const stream = new ReadableStream();
    expect(stream.locked).toBe(false);
  });

  it('should have getReader method', () => {
    const stream = new ReadableStream();
    expect(typeof stream.getReader).toBe('function');
  });

  it('should have cancel method', () => {
    const stream = new ReadableStream();
    expect(typeof stream.cancel).toBe('function');
  });

  it('should return reader from getReader', () => {
    const stream = new ReadableStream();
    const reader = stream.getReader();
    
    expect(reader).toBeDefined();
    expect(typeof reader.read).toBe('function');
    expect(typeof reader.releaseLock).toBe('function');
  });

  it('should lock stream when getReader is called', () => {
    const stream = new ReadableStream();
    expect(stream.locked).toBe(false);
    
    stream.getReader();
    expect(stream.locked).toBe(true);
  });

  it('should throw error when getting reader on locked stream', () => {
    const stream = new ReadableStream();
    stream.getReader();
    
    expect(() => {
      stream.getReader();
    }).toThrow(TypeError);
  });

  it('should unlock stream when releaseLock is called', () => {
    const stream = new ReadableStream();
    const reader = stream.getReader();
    
    expect(stream.locked).toBe(true);
    reader.releaseLock();
    expect(stream.locked).toBe(false);
  });

  it('should return promise from cancel', async () => {
    const stream = new ReadableStream();
    const result = stream.cancel();
    
    expect(result).toBeInstanceOf(Promise);
    await expect(result).resolves.toBeUndefined();
  });

  it('should accept underlyingSource and strategy', () => {
    const underlyingSource = { start: () => {} };
    const strategy = { highWaterMark: 1 };
    
    const stream = new ReadableStream(underlyingSource, strategy);
    expect(stream).toBeInstanceOf(ReadableStream);
  });
});
