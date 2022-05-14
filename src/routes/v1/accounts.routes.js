'use strict';

import express from 'express';
import Debug from 'debug';

/** Utils */
import { handleErrorWithResponse } from '../../utils/handle-error.utils';

/** Handlers */
import { createAccount, findAccounts } from '../../handlers/v1/accounts';

const app = express.Router();
const debug = Debug('StoriCard:routes:v1:accounts');

app.post('/', async (req, res) => {
  try {
    debug('Create new account.');

    const create = await createAccount(req.body);

    return res.status(create.status).json({
      ...create.response
    });
  } catch (err) {
    console.error(err);
    return handleErrorWithResponse(
      {
        status: err.response.status || 500,
        message: err.response.message
          ? err.response.message
          : 'Error creating new Account',
        messageWithCode: err.response.messageWithCode
          ? err.response.messageWithCode
          : null,
        errorDetail: err.response.errorDetail ? err.response.errorDetail : null
      },
      {},
      res
    );
  }
});

app.get('/', async (req, res) => {
  try {
    debug('Get all accounts.');

    const find = await findAccounts();

    return res.status(find.status).json({
      ...find.response
    });
  } catch (err) {
    console.error(err);
    return handleErrorWithResponse(
      {
        status: err.response.status || 500,
        message: err.response.message
          ? err.response.message
          : 'Error obtaining accounts list',
        messageWithCode: err.response.messageWithCode
          ? err.response.messageWithCode
          : null,
        errorDetail: err.response.errorDetail ? err.response.errorDetail : null
      },
      {},
      res
    );
  }
});

export default app;
