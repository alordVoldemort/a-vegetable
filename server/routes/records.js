var express = require('express');
var router = express.Router();


module.exports = router;

// Get all records
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM records';
  conn.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ code: 200, result });
    }
  });
});

// Insert a new record
router.post('/', (req, res) => {
  const record = req.body;
  const sql = 'INSERT INTO records SET ?';
  conn.query(sql, record, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const sql = 'SELECT * FROM records';
      conn.query(sql, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.status(200).json({ code: 200, message: 'Record inserted successfully', id: result.insertId, result });
        }
      });
    }
  });
});

// Update a record
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const record = req.body;
  const sql = 'UPDATE records SET ? WHERE id = ?';
  conn.query(sql, [record, id], (err, result) => {
    if (err)
      res.status(500).json({ error: 'Internal server error' });
    else {
      const _sql = 'SELECT * FROM records';
      conn.query(_sql, (err, result) => {
        if (err)
          return res.status(500).json({ error: 'Internal server error' });
        res.status(200).json({ code: 200, message: 'Records updated successfully', result });
      });
    }
  });
});

// Delete a record
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM records WHERE id = ?';
  conn.query(sql, id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});


router.post('/search', (req, res) => {
  const { client, driver, city, text } = req.body;
  let query = 'SELECT * FROM records WHERE 1=1';
  let queryParams = [];
  if (client !== undefined && client !== null && client !== "") {
    query += ' AND clientId = ?';
    queryParams.push(client);
  }

  if (driver !== undefined && driver !== null && driver !== "") {
    query += ' AND driverId = ?';
    queryParams.push(driver);
  }

  if (city !== undefined && city !== null) {
    query += ' AND cityTo = ?';
    queryParams.push(city);
  }

  if (text !== undefined && text !== null && text !== "") {
    query += ' AND name LIKE ?';
    queryParams.push(`%${text}%`);
  }
  conn.query(query, queryParams, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    // res.status(200).json(results);
    res.status(200).json({ code: 200, message: 'Record search successfully', result: results });
  });
});
//search 
