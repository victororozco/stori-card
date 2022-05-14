import mongoose from 'mongoose';
import { mongoUrl as MONGO_URL } from '../config';
/** MongoDB connection */
class MongoProvider {
  _mongoUrl;
  _mongoOptions;
  _client;
  _collection;

  constructor(collection, mongoUrl = MONGO_URL) {
    this._collection = collection;
    this._mongoUrl = mongoUrl;
    this._mongoOptions = {
      useNewUrlParser: true,
      keepAlive: true
    };
  }

  newClient = async () => {
    await mongoose
      .connect(this._mongoUrl, this._mongoOptions)
      .then((dbConnection) => {
        this._client = dbConnection;
      })
      .catch((err) => {
        console.error('src.providers.mongo.provider.newClient.err', err);
        setTimeout(this.newClient, 5000);
      });

    return this;
  };

  closeClient = () => {
    mongoose.connection.close();
  };

  getClient = async () => {
    if (!this._client) {
      await this.newClient();
    }

    return this;
  };

  setCollection = (name) => (this._collection = name);

  get collection() {
    return this._collection;
  }

  getCollection = () => {
    return mongoose.connection.db.collection(this._collection);
  };

  find = async (query) => {
    return this.getCollection().find(query).toArray();
  };

  findOne = async (query) => {
    return this.getCollection().findOne(query);
  };

  findById = async (id) => {
    return this.getCollection().findOne({
      _id: id
    });
  };

  create = async (Collection, data, options) => {
    const newData = new Collection(data, options);
    return await newData.save();
  };

  update = async (query, data) => {
    return await this.getCollection().updateOne(query, { $set: { ...data } });
  };

  insertMany = async (data, options) => {
    return this.getCollection().insertMany(data, options);
  };

  drop = async () => {
    return this.getCollection().drop();
  };
}

export default MongoProvider;
