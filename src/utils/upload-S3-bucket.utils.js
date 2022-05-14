'use strict';
import AWS from 'aws-sdk';
import { BUCKET_BASE, BUCKET_KEY, BUCKET_SECRET } from '../config';

const uploadS3Bucket = (
  file,
  nameFile,
  publicFile = false,
  bucketName = BUCKET_BASE
) => {
  try {
    let s3bucket = new AWS.S3({
      Bucket: `${bucketName}`,
      accessKeyId: BUCKET_KEY,
      secretAccessKey: BUCKET_SECRET
    });
    return new Promise(async (resolve, reject) => {
      s3bucket.createBucket(async function () {
        const params = {
          Bucket: `${bucketName}`,
          Key: `${nameFile}`,
          Body: file.data,
          ContentType: file.mimetype,
          ACL: publicFile === true ? 'public-read' : ''
        };

        s3bucket.upload(params, function (err, data) {
          if (err) reject(err);
          resolve(data.key || data.Key);
        });
      });
    });
  } catch (e) {
    return { error: e };
  }
};

export default uploadS3Bucket;
