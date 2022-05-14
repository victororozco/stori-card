'use strict';
import AWS from 'aws-sdk';
import { BUCKET_BASE, BUCKET_KEY, BUCKET_SECRET } from '../config';

const downloadS3Bucket = async (nameFile, bucketName = BUCKET_BASE) => {
  try {
    let s3bucket = new AWS.S3({
      Bucket: bucketName,
      accessKeyId: BUCKET_KEY,
      secretAccessKey: BUCKET_SECRET
    });

    return new Promise(async (resolve, reject) => {
      const data = await s3bucket
        .getObject({ Bucket: bucketName, Key: nameFile })
        .createReadStream();
      resolve(data);
    });
  } catch (e) {
    return { error: e };
  }
};

export default downloadS3Bucket;
