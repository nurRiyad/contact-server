const express = require('express');

const route = express.Router();

route.post('/', (req, res, next) => {
  res.send('Send all contract data');
});

route.get('/:contractId', (req, res, next) => {
  res.send('send a single contract');
});

route.post('/:contractId', (req, res, next) => {
  res.send('This is contract id api');
});

route.patch('/:contractId', (req, res, next) => {
  res.send('This is contract id api');
});

route.delete('/:contractId', (req, res, next) => {
  res.send('This is contract id api');
});

module.exports = route;
