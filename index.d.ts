// TypeScript definitions
declare global {
  interface Crypto {
    getRandomValues<T extends ArrayBufferView>(array: T): T;
    subtle?: SubtleCrypto;
  }

  var crypto: Crypto;
  
  class TextEncoder {
    encode(input?: string): Uint8Array;
  }
  
  class TextDecoder {
    constructor(label?: string, options?: { fatal?: boolean; ignoreBOM?: boolean });
    decode(input?: ArrayBuffer | ArrayBufferView, options?: { stream?: boolean }): string;
  }
  
  class ReadableStream {
    constructor();
  }
}

export interface PolyfillConfig {
  enableLogging?: boolean;
  useSecureRandom?: boolean;
}

export function configure(config: PolyfillConfig): void;

export {};
