# rn-crypto-polyfill

[![npm version](https://img.shields.io/npm/v/rn-crypto-polyfill.svg)][npm]
[![license](https://img.shields.io/npm/l/rn-crypto-polyfill.svg)]

Comprehensive crypto polyfills for React Native applications. Provides implementations for `crypto.getRandomValues`, `TextEncoder`, `TextDecoder`, and `ReadableStream` that are required by AWS SDK and other libraries.

## 🚀 Features

- ✅ **crypto.getRandomValues()** - Secure random number generation
- ✅ **TextEncoder** - UTF-8 string encoding
- ✅ **TextDecoder** - UTF-8 string decoding
- ✅ **ReadableStream** - Stream API polyfill
- ✅ **TypeScript support** - Full type definitions included
- ✅ **Configurable** - Customize behavior via configuration
- ✅ **Lightweight** - No native dependencies
- ✅ **Battle-tested** - Used in production apps

## 📦 Installation

```bash
npm install rn-crypto-polyfill
```

or

```bash
yarn add rn-crypto-polyfill
```

## 🔧 Usage

### Basic Usage

Import the polyfill at the **very beginning** of your app's entry point (usually `index.js`):

```javascript
// index.js
import 'rn-crypto-polyfill';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

That's it! All polyfills are now available globally.

### Advanced Configuration

You can customize the behavior of the polyfills:

```javascript
import { configure } from 'rn-crypto-polyfill';

configure({
  enableLogging: true,      // Enable debug logging (default: false)
  useSecureRandom: true,    // Use more secure random generation (default: true)
});
```

## 🎯 Use Cases

### AWS SDK S3 Operations

```javascript
import 'rn-crypto-polyfill';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Sha256 } from '@aws-crypto/sha256-js';

const client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'YOUR_ACCESS_KEY',
    secretAccessKey: 'YOUR_SECRET_KEY',
  },
  sha256: Sha256, // Required for React Native
});

// Now you can use S3 operations!
```

### UUID Generation

```javascript
import 'rn-crypto-polyfill';
import { v4 as uuidv4 } from 'uuid';

const id = uuidv4(); // Works perfectly!
```

### Text Encoding/Decoding

```javascript
const encoder = new TextEncoder();
const bytes = encoder.encode('Hello, World!');
console.log(bytes); // Uint8Array

const decoder = new TextDecoder();
const text = decoder.decode(bytes);
console.log(text); // "Hello, World!"
```

## 📋 Requirements

- React Native >= 0.60.0
- Node.js >= 14.0.0

## 🔍 What's Polyfilled?

### crypto.getRandomValues()

Implements the Web Crypto API's `getRandomValues()` method. Uses a combination of `Math.random()` with XOR and timestamps for better entropy.

```javascript
const array = new Uint8Array(16);
crypto.getRandomValues(array);
```

### TextEncoder

Converts JavaScript strings to UTF-8 encoded Uint8Array.

```javascript
const encoder = new TextEncoder();
const encoded = encoder.encode('Hello 👋');
```

### TextDecoder

Converts UTF-8 encoded bytes back to JavaScript strings.

```javascript
const decoder = new TextDecoder();
const decoded = decoder.decode(uint8Array);
```

### ReadableStream

Minimal implementation of the Streams API ReadableStream. Primarily used for AWS SDK type checking.

```javascript
const stream = new ReadableStream();
```

## 🤝 Compatibility

This library is compatible with:

- ✅ AWS SDK v3 (@aws-sdk/client-s3, etc.)
- ✅ uuid
- ✅ crypto-js
- ✅ Any library requiring crypto.getRandomValues
- ✅ Any library requiring TextEncoder/TextDecoder

## 📝 API Reference

### configure(config)

Configure the polyfill behavior.

**Parameters:**
- `config.enableLogging` (boolean): Enable debug console logging
- `config.useSecureRandom` (boolean): Use enhanced random number generation

**Example:**
```javascript
import { configure } from 'rn-crypto-polyfill';

configure({
  enableLogging: __DEV__,
  useSecureRandom: true,
});
```

## 🐛 Troubleshooting

### Polyfill not working

Make sure the import is at the **very top** of your entry file, before any other imports that might use crypto APIs.

❌ Wrong:
```javascript
import { S3Client } from '@aws-sdk/client-s3';
import 'rn-crypto-polyfill'; // Too late!
```

✅ Correct:
```javascript
import 'rn-crypto-polyfill'; // First!
import { S3Client } from '@aws-sdk/client-s3';
```

### AWS SDK errors

For AWS SDK, make sure to also import the SHA256 implementation:

```javascript
import { Sha256 } from '@aws-crypto/sha256-js';

const client = new S3Client({
  // ... other config
  sha256: Sha256,
});
```

## 📄 License

MIT © Binarywise

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

Inspired by the React Native community's need for Web Crypto API compatibility.

## 📚 See Also

- [AWS SDK for JavaScript v3](https://github.com/aws/aws-sdk-js-v3)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [TextEncoder API](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder)

## 📦 Publishing to npm

Before publishing, make sure the package metadata in `package.json` is correct (name, version, description, repository, license, files). Quick checklist:

- Run the test suite: `npm test`
- Confirm `version` in `package.json` is the value you want to publish
- Confirm `files` includes the build/output files and `index.js`/`index.d.ts`
- Ensure `repository`, `bugs`, and `homepage` fields are set (for npm linking)

Example publish flow (from the project root):

```bash
# Log in to npm (only needed once per session)
npm login

# Bump the version (patch/minor/major) and tag the commit
npm version patch -m "Release %s"

# Publish the package to npm
npm publish
```

If you publish a scoped package (for example `@your-scope/your-package`) and want it public, use:

```bash
npm publish --access public
```

Notes:

- If you have CI that runs on tags, pushing the tag may trigger releases — choose your workflow accordingly.
- If you enable npm 2FA, follow npm's flow for generating one-time passwords when publishing.

[npm]: https://www.npmjs.com/package/rn-crypto-polyfill
