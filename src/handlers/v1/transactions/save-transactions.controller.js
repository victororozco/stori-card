import { ObjectId } from 'bson';
import dayjs from 'dayjs';
import { Accounts, Transactions } from '../../../classes';
import mongoProvider from '../../../providers/mongo.provider';
import { handleError } from '../../../utils/handle-error.utils';
import processTransactionFile from './get-file-and-parse.controller';
import sendTransactions from './send-transactions.controller';
import uploadTransactionFile from './upload-transaction-file.controller';

const saveTransactions = async ({ accountId }, file) => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = await new mongoProvider().getClient();

      const account = new Accounts(provider);
      const findAccount = await account.findOne({
        _id: new ObjectId(accountId)
      });

      if (!findAccount) {
        return reject(
          handleError({
            message: 'Account not found',
            errorCode: 'TRA002',
            statusCode: 400
          })
        );
      }

      if (!file) {
        return reject(
          handleError({
            message: 'You must attach the transaction file',
            errorCode: 'TRA003',
            statusCode: 400
          })
        );
      }

      const uploadFile = await uploadTransactionFile(
        file,
        'transaction',
        false
      );

      const parseData = await processTransactionFile({ uploadFile });

      let balance = findAccount.balance || 0;
      let debitAmount = 0;
      let creditAmount = 0;
      let monthBalance = {};
      const monthsShort = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ];

      if (Array.isArray(parseData)) {
        await Promise.all(
          parseData.map(async (data) => {
            const transaction = new Transactions(provider, data);
            const saveTransaction = await transaction.create();

            if (saveTransaction && saveTransaction._id) {
              /** Balance */
              balance += saveTransaction.amount;

              /** Month Transactions count */
              const monthNum = dayjs(saveTransaction.date).get('M');
              const month = monthsShort[monthNum];
              if (monthBalance[month]) {
                monthBalance[month] += 1;
              } else {
                monthBalance[month] = 1;
              }

              /** Credit and debit transactions */
              if (saveTransaction.amount > 0) {
                creditAmount += saveTransaction.amount;
              } else {
                debitAmount += saveTransaction.amount;
              }

              return saveTransaction;
            }

            return data;
          })
        );
      }

      /** Update Account balance */
      const acc = new Accounts(provider);
      await acc.update({ _id: new ObjectId(accountId) }, { balance: balance });
      const findAccountUpdated = await account.findOne({
        _id: new ObjectId(accountId)
      });

      const result = {
        account: findAccountUpdated,
        transactions: {
          creditAmount,
          debitAmount,
          balance,
          monthBalance
        }
      };
      console.info('result', result);

      await sendTransactions(result, uploadFile);

      return resolve({
        status: 201,
        response: {
          data: result
        }
      });
    } catch (err) {
      console.error(
        'src.handlers.v1.transactions.save-transactions.controller.err',
        err
      );
      return reject(
        handleError({
          message: 'Error creating new transactions',
          errorCode: 'TRA001',
          errorDetail: err.message,
          statusCode: 500
        })
      );
    }
  });
};

export default saveTransactions;
