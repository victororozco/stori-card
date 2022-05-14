import { ObjectId } from 'bson';

export default {
  insert: [
    {
      _id: new ObjectId('627010480e64250af65ee3bb'),
      firstName: 'Victor',
      lastName: 'Orozco',
      email: 'victororozco2021@gmail.com',
      currency: 'usd',
      balance: 350,
      createdAt: '2022-05-13T16:11:30.373Z',
      updatedAt: '2022-05-13T16:11:30.373Z'
    },
    {
      _id: new ObjectId('627014852a62f63b157f6660'),
      firstName: 'Daniel',
      lastName: 'Orozco',
      email: 'vorozco07@icloud.com',
      currency: 'usd',
      balance: 150,
      createdAt: '2022-05-13T16:11:57.405Z',
      updatedAt: '2022-05-13T16:11:57.405Z'
    }
  ]
};
