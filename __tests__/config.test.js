/**
 * Tests for configuration
 */

const { configure, getConfig } = require('../src/config');

describe('Configuration', () => {
  beforeEach(() => {
    // Reset config to defaults
    configure({
      enableLogging: false,
      useSecureRandom: true,
    });
  });

  it('should have default configuration', () => {
    const config = getConfig();
    expect(config.enableLogging).toBe(false);
    expect(config.useSecureRandom).toBe(true);
  });

  it('should update configuration', () => {
    configure({
      enableLogging: true,
      useSecureRandom: false,
    });

    const config = getConfig();
    expect(config.enableLogging).toBe(true);
    expect(config.useSecureRandom).toBe(false);
  });

  it('should partially update configuration', () => {
    configure({ enableLogging: true });

    const config = getConfig();
    expect(config.enableLogging).toBe(true);
    expect(config.useSecureRandom).toBe(true);
  });

  it('should handle empty configuration', () => {
    const originalConfig = getConfig();
    configure({});
    const newConfig = getConfig();

    expect(newConfig).toEqual(originalConfig);
  });
});
