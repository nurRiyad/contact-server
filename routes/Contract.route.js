const express = require('express');
const User = require('../model/user');

const route = express.Router();

route.get('/', async (req, res, next) => {
  const users = await User.find();
  res.send(users);
});

route.get('/:contractId', (req, res, next) => {
  res.send('send a single contract');
});

route.post('/:contractId', async (req, res, next) => {
  try {
    const riyad = new User({ username: 'riyad' });
    const data = await riyad.save();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

route.patch('/:contractId', (req, res, next) => {
  res.send('This is contract id api');
});

route.delete('/:contractId', (req, res, next) => {
  res.send('This is contract id api');
});

module.exports = route;
