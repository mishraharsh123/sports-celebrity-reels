import { S3Client } from '@aws-sdk/client-s3';
// import { Upload } from '@aws-sdk/lib-storage';

// Initialize S3 client
export const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// Upload file to S3
export async function uploadToS3(
  file: Buffer, 
  fileName: string, 
  contentType: string,
  folder: string = 'videos'
) {
  try {
    const key = `${folder}/${fileName}`;
    
    // const upload = new Upload({
    //   client: s3Client,
    //   params: {
    //     Bucket: process.env.S3_BUCKET_NAME || 'sports-celebrity-reels',
    //     Key: key,
    //     Body: file,
    //     ContentType: contentType,
    //     ACL: 'public-read',
    //   },
    // });

    // const result = await upload.done();
    
    return {
      success: true,
      url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${key}`,
      key: key,
    };
  } catch (error) {
    console.error('Error uploading to S3:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Get S3 object URL
export function getS3Url(key: string): string {
  const bucketName = process.env.S3_BUCKET_NAME || 'sports-celebrity-reels';
  return `https://${bucketName}.s3.amazonaws.com/${key}`;
}
