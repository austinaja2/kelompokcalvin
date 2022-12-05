var express = require('express');
const config = require('./public/modules/core/config');
const app = require('./public/modules/core/server');

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log(`Server runs at port ${config.port}`);
  }
});

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const db = require('./public/modules/models/index');

const routes = require('./public/modules/routes');
app.use('/', routes);