//connect to postgresql database
const {  Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
});

module.exports = function createUser (values) {
  const text = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *'
  return new Promise(function(resolve, reject) {
    pool.query(text, values, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res.rows[0])
      }
    });
  });
}

module.exports = function findAll () {
  const text = 'SELECT * FROM users'
  return new Promise(function(resolve, reject) {
    pool.query(text, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res.rows)
      }
    });
  });
}





