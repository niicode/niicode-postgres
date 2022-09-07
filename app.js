const express = require('express');
const app = express();

app.use(express.json());

const User = require('./modules/User');

app.get('/', (req, res) => {
  res.send('Home Page');
});

//endpoint to create user in psqldb
app.post('/add_user', async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User(username,email, password);
  await user.save();
  res.json({ message: 'User created' });
});

//get all users
app.get('/users', async (req, res) => {
  User.findAll(res);
});

app.listen(8080, () => {
  console.log('app listening on port 8080!');
});

