/**
 * Example: Using with AWS SDK S3
 */

// Import the polyfill FIRST
import '@binarywise/rn-crypto-polyfill';

// Then import AWS SDK
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Sha256 } from '@aws-crypto/sha256-js';
import RNFS from 'react-native-fs';

// Configure S3 client
const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'YOUR_ACCESS_KEY',
    secretAccessKey: 'YOUR_SECRET_KEY',
  },
  sha256: Sha256, // Required for React Native
});

// Upload a file
async function uploadFile(filePath, key) {
  try {
    const fileData = await RNFS.readFile(filePath, 'base64');
    const buffer = Buffer.from(fileData, 'base64');

    const command = new PutObjectCommand({
      Bucket: 'your-bucket-name',
      Key: key,
      Body: buffer,
      ContentType: 'image/jpeg',
    });

    const response = await s3Client.send(command);
    console.log('Upload successful:', response);
    return response;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}

// Download a file
async function downloadFile(key) {
  try {
    const command = new GetObjectCommand({
      Bucket: 'your-bucket-name',
      Key: key,
    });

    const response = await s3Client.send(command);
    console.log('Download successful');
    return response;
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
}

export { uploadFile, downloadFile };
