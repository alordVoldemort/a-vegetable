var express = require('express');
var router = express.Router();


router.post('/register', (req, res) => {
    res.json({ body : req.body });
  });
  
  
module.exports = router;
