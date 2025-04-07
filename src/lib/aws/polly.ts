import AWS from 'aws-sdk';
import { Readable } from 'stream';

// Initialize Polly client
const polly = new AWS.Polly({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

/**
 * Convert text to speech using Amazon Polly
 */
export async function textToSpeech(text: string): Promise<Buffer> {
  try {
    const params = {
      Text: text,
      OutputFormat: 'mp3',
      VoiceId: 'Matthew', // You can change the voice as needed
      Engine: 'neural',   // Using the neural engine for better quality
    };

    const data = await polly.synthesizeSpeech(params).promise();
    
    if (data.AudioStream instanceof Buffer) {
      return data.AudioStream;
    } else if (data.AudioStream instanceof Readable) {
      // Convert stream to buffer if necessary
      return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        data.AudioStream.on('data', (chunk) => chunks.push(chunk));
        data.AudioStream.on('end', () => resolve(Buffer.concat(chunks)));
        data.AudioStream.on('error', reject);
      });
    } else {
      throw new Error('Invalid AudioStream format');
    }
  } catch (error) {
    console.error('Error in text-to-speech conversion:', error);
    throw error;
  }
}
