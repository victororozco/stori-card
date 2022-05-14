'use strict';

import dayjs from 'dayjs';
import TransactionsModel from '../models/Transactions.model';

// import { isValidCustomerForm } from '../utils/index.utils';

class Transactions {
  collection = 'transactions';

  constructor(provider, data = {}) {
    /** DB Provider */
    this.provider = provider;

    this.id = data.id;
    this.date = data.date;
    this.amount = data.amount;
    this.setter_date = this.date;
    this.setter_amount = this.amount;
    this.setter_collection = this.collection;
  }

  /**
   * @param {string} collection
   */
  set setter_collection(collection) {
    this.provider.setCollection(collection);
  }

  /**
   * @param {number} amount
   */
  set setter_amount(amount) {
    this.amount = parseFloat(amount);
  }

  /**
   * @param {string} date
   */
  set setter_date(date) {
    const monthAndDay = date.split('/');
    const month = parseInt(monthAndDay[0] - 1);
    const day = parseInt(monthAndDay[1]);
    this.date = dayjs().month(month).date(day).locale('es-co').format();
  }

  getData = () => {
    return {
      id: this.id,
      date: this.date,
      amount: this.amount
    };
  };

  find = (query, options) => {
    return this.provider.find(query, options);
  };

  findById = (id) => {
    return this.provider.find(id);
  };

  create = async () => {
    const data = {
      id: this.id,
      date: this.date,
      amount: this.amount
    };

    return await this.provider.create(TransactionsModel, data);
  };

  getCollectionModel = () => this.provider.getCollection();
}

export default Transactions;
