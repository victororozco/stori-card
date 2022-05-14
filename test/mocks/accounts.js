import { ObjectId } from 'bson';

export default {
  insert: [
    {
      _id: new ObjectId('627e82e22d58ad3ec3f3e9f2'),
      firstName: 'Victor',
      lastName: 'Orozco',
      email: 'vorozco.dev@gmail.com',
      currency: 'usd',
      balance: 1500,
      createdAt: '2022-05-13T16:10:10.037Z',
      updatedAt: '2022-05-13T16:10:10.037Z'
    },
    {
      _id: new ObjectId('627e8f7284265e78461948c4'),
      firstName: 'Erika',
      lastName: 'Placencio',
      email: 'enplacencio@gmaill.com',
      currency: 'usd',
      balance: 2000,
      createdAt: '2022-05-13T17:03:46.009Z',
      updatedAt: '2022-05-13T17:03:46.009Z'
    }
  ],
  create: {
    _id: new ObjectId('627e82e22d58ad3ec3f3e9f8'),
    firstName: 'Victor',
    lastName: 'Orozco',
    email: 'vorozco.dev@getnada.com',
    currency: 'usd',
    balance: 1500
  }
};
