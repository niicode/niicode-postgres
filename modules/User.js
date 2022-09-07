const createUser = require('./connection')
const findAll = require('./connection')
class User {
  static data;
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
  save() {
    const values = [this.username, this.email, this.password];
    createUser(values)
      .then((data) => {
        console.log(data);
      })
  }

  static findAll(res) {
    findAll()
      .then((data) => {
        res.json(data);
      })
  }
}
module.exports = User;