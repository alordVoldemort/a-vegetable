
const mysql = require('mysql');

// Configure MySQL connection
const connection = mysql.createConnection({
    host: 'byfpzhdvlz7zqudwubbi-mysql.services.clever-cloud.com',
    user: 'ug78ruyy7wimxelp',
    password: 'AeFnIDcylyWPBUOGh65D',
    database: 'byfpzhdvlz7zqudwubbi',
    port: 3306
});
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'vegetable-app'
// });

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;