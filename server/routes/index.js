var express = require('express');
var router = express.Router();


/* GET users listing. */
router.post('/login', (req, res) => {
  res.set('Set-Cookie', 'SameSite=None; Secure');
  console.log(req.body, 'req.body')
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: 'username and password are required' });
  }
  conn.query(
    'SELECT * FROM users WHERE username = ? AND password = ?', [userName, password],
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
      res.cookie('token123', token,  {
        httpOnly: true,
        secure: false, // Set to false for development on localhost
      });
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
