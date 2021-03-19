require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const products_controller = require('./products_controller')
const { CONNECTION_STRING, SERVER_PORT } = process.env

app.use(express.json())

app.post('/api/products', products_controller.create);
app.get('/api/products', products_controller.getAll);
app.get('/api/products/:id', products_controller.getOne);
app.put('/api/products/:id', products_controller.update);
app.delete('/api/products/:id', products_controller.delete);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false }
}).then(dbInstance => {
  app.set('db', dbInstance)
  app.listen(SERVER_PORT, () => console.log(`We live in ${SERVER_PORT}`))
}).catch(error => console.log(error))
