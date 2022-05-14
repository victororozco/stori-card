import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const AccountsModel = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  currency: {
    type: String,
    required: true,
    default: 'usd',
    enum: ['usd', 'eur', 'cop', 'mxn']
  },
  balance: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

AccountsModel.pre('save', async function (next) {
  const account = this;
  account.createdAt = new Date();
  account.updatedAt = new Date();
  next();
});

AccountsModel.pre('update', function (next) {
  const account = this;
  const data = account.$set;
  data.updatedAt = new Date();
  next();
});

AccountsModel.pre('findOneAndUpdate', function (next) {
  const account = this.getUpdate();
  const data = account.$set;
  data.updatedAt = new Date();
  next();
});

export default mongoose.model('Accounts', AccountsModel);
