'use strict';

import { Accounts } from '../../../classes';
import mongoProvider from '../../../providers/mongo.provider';
import { handleError } from '../../../utils/handle-error.utils';

const createController = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const provider = await new mongoProvider().getClient();
      const accounts = new Accounts(provider, data);

      const saveAccounts = await accounts.create();

      if (saveAccounts && saveAccounts._id) {
        return resolve({
          status: 201,
          response: {
            data: saveAccounts
          }
        });
      }

      return reject(
        handleError({
          message: 'Error creating new Account',
          errorCode: 'AC002',
          statusCode: 500
        })
      );
    } catch (err) {
      console.error('src.handlers.v1.account.create.error', err);
      return reject(
        handleError({
          message: 'Error creating new Account',
          errorCode: 'ACC001',
          errorDetail: err.message ? err.message : err,
          statusCode: 500
        })
      );
    }
  });

export default createController;
