import csv from 'fast-csv';
import downloadS3Bucket from '../../../utils/download-S3-bucket.utils';

const processTransactionFile = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { fileName = 'transactions.csv' } = query;
      const fileStream = await downloadS3Bucket(fileName);
      const data = await parseData(fileStream);

      const parsed = await saveToDb(data);

      return resolve(parsed);
    } catch (err) {
      return reject(err);
    }
  });
};

const parseData = (fileStream) => {
  return new Promise(async function (resolve, reject) {
    let dataArr = [];
    let rowFlag = 0;
    try {
      csv
        .parseStream(fileStream, {
          headers: ['id', 'date', 'amount'],
          delimiter: ','
        })
        .on('data', async function (data) {
          rowFlag++;
          dataArr.push(data);
        })
        .on('end', function () {
          resolve(dataArr);
        })
        .on('error', function (e) {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};

const saveToDb = async (data) =>
  new Promise(async (resolve, reject) => {
    try {
      data = data.filter(
        (d) => (d.id.toLowerCase() !== 'id', d.date.toLowerCase() !== 'date')
      );
      const dataProcess = await Promise.all(
        data.map(async (value) => {
          const doc = {
            id: parseInt(value.id),
            date: value.date,
            amount: parseFloat(value.amount)
          };

          return doc;
        })
      );

      return resolve(dataProcess);
    } catch (err) {
      return reject(err);
    }
  });

export default processTransactionFile;
