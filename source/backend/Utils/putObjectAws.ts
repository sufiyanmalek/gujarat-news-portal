// Imports
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { randomUUID } from "crypto";

// Dotenv config
dotenv.config();

// Aws credentials

const client = new S3Client({
  region: process.env.region,
  credentials: {
    accessKeyId: process.env.aws_access_key_id as string,
    secretAccessKey: process.env.aws_secret_access_key as string,
  },
});

export const uploadOnS3 = async (fileName: string, Data: Buffer) => {
  const id = randomUUID();

  const command = new PutObjectCommand({
    Bucket: "gujarat-news",
    Key: `${id}-${fileName}`,
    Body: Data,
  });

  try {
    const response = await client.send(command);
    const url = new URL(
      `https://gujarat-news.s3.ap-south-1.amazonaws.com/${id}-${fileName}`
    );
    return url.href;
  } catch (err) {
    console.error(err);
  }
};
