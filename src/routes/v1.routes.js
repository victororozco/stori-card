'use strict';
import express from 'express';
import { Accounts } from './v1/index.routes';
import { Transactions } from './v1/index.routes';

const VERSION_V1 = 'v1';

const routesV1 = () => {
  const app = express.Router({
    mergeParams: true
  });

  app.use(`/${VERSION_V1}/accounts`, Accounts);
  app.use(`/${VERSION_V1}/transactions`, Transactions);

  return app;
};

export default routesV1;
