import uploadS3Bucket from '../../../utils/upload-S3-bucket.utils';

const uploadTransactionFile = async (
  file,
  { fileName, publicFile = false }
) => {
  try {
    const name = `transactions/${fileName}-${Date.now()}.csv`;
    const uploads = await uploadS3Bucket(file, name, publicFile);

    return uploads;
  } catch (err) {
    return err;
  }
};

export default uploadTransactionFile;
