const mongoose = require('mongoose');

const initMongoDb = async () => {
  try {
    await mongoose.connect('mongodb://0.0.0.0:27017/test');
    console.log('Connected To Mongodb');
  } catch (error) {
    console.log(error);
  }
};

module.exports = initMongoDb;
