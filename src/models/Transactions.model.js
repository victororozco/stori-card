import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const TransactionsModel = new Schema({
  id: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

TransactionsModel.pre('save', async function (next) {
  const data = this;
  data.createdAt = new Date();
  next();
});

export default mongoose.model('Transactions', TransactionsModel);
