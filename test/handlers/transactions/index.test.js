import { expect } from 'chai';
import fs from 'fs';
import { mongoUrl } from '../../../src/config';
/** Controller */
import saveTransactions from '../../../src/handlers/v1/transactions/save-transactions.controller';
/** Mongo Provider */
import mongoProvider from '../../../src/providers/mongo.provider';
/** Mocks */
import accountsMocks from '../../mocks/accounts-for-transactions';

describe('Test Transactions handlers', async function () {
  const provider = new mongoProvider('accounts', mongoUrl);
  let fileToUpload;

  before(async () => {
    await provider.newClient();
    await provider.insertMany(accountsMocks.insert, {
      upsert: true
    });

    fileToUpload = {
      data: fs.readFileSync('./docs/transactions-example-file.csv'),
      mimetype: 'text/csv'
    };
  });

  after(async () => {
    await provider.drop();

    await provider.closeClient();
  });

  /** Transactions */
  it('Check save transactions returned Ok', async function () {
    await saveTransactions(
      { accountId: accountsMocks.insert[0]._id },
      fileToUpload
    ).then((result) => {
      expect(result, 'result should be object').to.be.a('object');
      expect(result.status, 'result.status should be 201').to.equal(201);
      expect(result.response, 'result should be object').to.be.a('object');
      expect(
        result.response.data,
        'result.response.data should be array'
      ).to.be.a('object');
      expect(
        result.response.data.account,
        'result.response.data should be array'
      ).to.be.a('object');
      expect(
        result.response.data.account._id.toString(),
        `result.response.data.account._id is equal to ${accountsMocks.insert[0]._id.toString()}`
      ).to.equal(accountsMocks.insert[0]._id.toString());
    });
  }).catch((err) => console.error(err));
});
