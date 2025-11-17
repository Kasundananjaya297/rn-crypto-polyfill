# Publishing Guide

## Prerequisites

1. Create an npm account at https://www.npmjs.com/signup
2. Login to npm: `npm login`
3. Verify you're logged in: `npm whoami`

## Before Publishing

1. Update version in `package.json` following [semver](https://semver.org/):
   - Patch (1.0.x): Bug fixes
   - Minor (1.x.0): New features, backward compatible
   - Major (x.0.0): Breaking changes

2. Run tests: `npm test`

3. Check what will be published: `npm pack --dry-run`

## Publishing to npm

### First Time Publishing

```bash
npm publish --access public
```

### Subsequent Updates

```bash
# Update version
npm version patch  # or minor, or major

# Publish
npm publish
```

## Publishing to GitHub Packages (Optional)

1. Create `.npmrc` in project root:
```
@binarywise:registry=https://npm.pkg.github.com
```

2. Publish:
```bash
npm publish
```

## Post-Publishing

1. Create a GitHub release with the version tag
2. Update README if needed
3. Announce in relevant communities

## Testing the Published Package

```bash
# Install in a test project
npm install @binarywise/rn-crypto-polyfill

# Or test specific version
npm install @binarywise/rn-crypto-polyfill@1.0.0
```

## Unpublishing (Use Cautiously)

```bash
# Unpublish specific version (within 72 hours)
npm unpublish @binarywise/rn-crypto-polyfill@1.0.0

# Unpublish entire package (within 72 hours)
npm unpublish @binarywise/rn-crypto-polyfill --force
```

⚠️ **Warning**: Unpublishing is discouraged. Use deprecate instead:
```bash
npm deprecate @binarywise/rn-crypto-polyfill@1.0.0 "Use version 1.0.1 instead"
```
