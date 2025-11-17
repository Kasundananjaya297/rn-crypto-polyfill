/**
 * Example: Using with UUID generation
 */

// Import the polyfill FIRST
import '@binarywise/rn-crypto-polyfill';

// Then import uuid
import { v4 as uuidv4 } from 'uuid';

// Generate unique IDs
function generateUserId() {
  return uuidv4();
}

function generateTransactionId() {
  return uuidv4();
}

function generateSessionId() {
  return uuidv4();
}

// Example usage
console.log('User ID:', generateUserId());
console.log('Transaction ID:', generateTransactionId());
console.log('Session ID:', generateSessionId());

export { generateUserId, generateTransactionId, generateSessionId };
