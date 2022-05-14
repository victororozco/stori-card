'use strict';

import express from 'express';
import Debug from 'debug';
import fileUpload from 'express-fileupload';

/** Utils */
import { handleErrorWithResponse } from '../../utils/handle-error.utils';

/** Handlers */
import sendEmail from '../../utils/send-email';
import saveTransactions from '../../handlers/v1/transactions/save-transactions.controller';

const app = express.Router();
const debug = Debug('StoriCard:routes:v1:transactions');

app.use(fileUpload());

app.post('/:accountId', async (req, res) => {
  try {
    debug('Process transactions by CSV file.');
    const { accountId } = req.params;

    const result = await saveTransactions({ accountId }, req.files?.file);
    console.log('result', result);

    return res.status(result.status).json(result.response);
  } catch (err) {
    console.error(err);
    return handleErrorWithResponse(
      {
        status: err?.response?.status || 500,
        message: err?.response?.message
          ? err?.response?.message
          : 'Error processing transactions list',
        messageWithCode: err?.response?.messageWithCode
          ? err?.response?.messageWithCode
          : null,
        errorDetail: err?.response?.errorDetail
          ? err?.response?.errorDetail
          : null
      },
      {},
      res
    );
  }
});

export default app;
