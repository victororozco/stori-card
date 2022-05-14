import { expect } from 'chai';
import { mongoUrl } from '../../../../src/config';
import {
  createAccount,
  findAccounts
} from '../../../../src/handlers/v1/accounts';
/** Controller */
/** Mongo Provider */
import mongoProvider from '../../../../src/providers/mongo.provider';
/** Mocks */
import AccountsMocks from '../../../mocks/accounts';

describe('Test Account Types handlers', async function () {
  const provider = new mongoProvider('accounts', mongoUrl);

  before(async () => {
    await provider.newClient();
    await provider.insertMany(AccountsMocks.insert, {
      upsert: true
    });
  });

  after(async () => {
    await provider.closeClient();
  });

  /** Find a Account */
  it('Check the findAccounts data returned is valid ', async function () {
    await findAccounts().then((result) => {
      expect(result, 'result should be object').to.be.a('object');
      expect(result.status, 'result.status should be 200').to.equal(200);
      expect(result.response, 'result.response should be object').to.be.a(
        'object'
      );
      expect(
        result.response.data,
        'result.response.data should be array'
      ).to.be.a('array');
      expect(
        result.response.data,
        'result.response.data length should be 1'
      ).to.length.greaterThan(0);
    });
  });

  /** Create a Accounts */
  it('Check the createAccount returned Ok', async function () {
    await createAccount(AccountsMocks.create).then((result) => {
      expect(result, 'result should be object').to.be.a('object');
      expect(result.status, 'result.status should be 200').to.equal(201);
      expect(result.response, 'result should be object').to.be.a('object');
      expect(
        result.response.data,
        'result.response.data should be object'
      ).to.be.a('object');
      expect(
        result.response.data.firstName,
        `result.response.data.firstName should be ${AccountsMocks.create.firstName}`
      ).to.equal(AccountsMocks.create.firstName);
    });
  });
});
