'use strict';

import AccountsModel from '../models/Accounts.model';

class Accounts {
  collection = 'accounts';

  constructor(provider, data = {}) {
    /** DB Provider */
    this.provider = provider;

    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.currency = data.currency;
    this.balance = data.balance;
    this.setter_collection = this.collection;
    this.setter_balance = this.balance;
  }

  /**
   * @param {string} collection
   */
  set setter_collection(collection) {
    this.provider.setCollection(collection);
  }

  /**
   * @param {number} balance
   */
  set setter_balance(balance) {
    this.balance = parseFloat(balance);
  }

  /**
   * @returns Mongo Collection
   */
  getCollectionModel = () => this.provider.getCollection();

  find = (query) => {
    return this.provider.find(query);
  };

  findOne = (query) => {
    return this.provider.findOne(query);
  };

  findById = (id) => {
    return this.provider.findById(id);
  };

  create = async () => {
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      currency: this.currency,
      balance: this.balance
    };

    return await this.provider.create(AccountsModel, data);
  };

  update = async (query, data) => {
    return await this.provider.update(query, data);
  };
}

export default Accounts;
