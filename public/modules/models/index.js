const mongoose = require('mongoose');

const Users = require('./user');
const Jobs = require('./jobs');

const config = require('../core/config')

mongoose.connect(
  'mongodb+srv://WEBEE21:1234567890@test1.aguevyu.mongodb.net/?retryWrites=true&w=majority',
);

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB server!');
});

module.exports = {
  db,
  Users,
  Jobs,
};