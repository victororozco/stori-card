import transactionTemplate from '../../../templates/transactions-process.template';
import downloadS3Bucket from '../../../utils/download-S3-bucket.utils';
import sendEmail from '../../../utils/send-email';

const sendTransactions = async (data, fileName) => {
  try {
    const { account, transactions } = data;

    const template = transactionTemplate(account, transactions);

    const fileBucket = await downloadS3Bucket(fileName);

    const send = await sendEmail({
      to: account.email,
      subject: 'Transactions Status',
      html: template,
      attachments: [
        {
          filename: 'transactions.csv',
          content: fileBucket
        }
      ]
    });

    return send;
  } catch (err) {
    console.log(
      'src.handlers.v1.transactions.send-transactions.controller.err',
      err
    );

    return err;
  }
};

export default sendTransactions;
