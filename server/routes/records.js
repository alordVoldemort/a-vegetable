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
        res.json(result);
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
        res.status(201).json({ message: 'Record inserted successfully', id: result.insertId });
      }
    });
  });
  
  // Update a record
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const record = req.body;
    const sql = 'UPDATE records SET ? WHERE id = ?';
    conn.query(sql, [record, id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ message: 'Record updated successfully' });
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
  