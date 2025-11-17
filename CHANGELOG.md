# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-17

### Added
- Initial release
- crypto.getRandomValues() polyfill with secure random generation
- TextEncoder polyfill for UTF-8 encoding
- TextDecoder polyfill for UTF-8 decoding
- ReadableStream polyfill for AWS SDK compatibility
- Configuration system for customizing behavior
- Full TypeScript definitions
- Comprehensive test suite (35 tests)
- MIT License
- Complete documentation

### Features
- Zero native dependencies
- Lightweight implementation
- Compatible with AWS SDK v3
- Compatible with uuid and other crypto-dependent libraries
- Configurable logging and randomness strength
