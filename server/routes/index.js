var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', (req, res) => {
  console.log(req.body, 'req.body')
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  conn.query(
    'SELECT * FROM users WHERE username = ? AND password = ?', [username, password],
    (error, results, fields) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      const user = { id: results[0].id, username: results[0].username };
      const token = jwt.sign(user, secretKey);
      const users = results.map(result => {
        const { password, ...userWithoutPassword } = result;
        return userWithoutPassword;
      });
      res.json({ token, userDetails: users});
    }
  );
});

router.post('/register', (req, res) => {
  res.json({ body : req.body });
});


module.exports = router;
