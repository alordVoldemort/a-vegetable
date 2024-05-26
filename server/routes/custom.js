var express = require('express');
var router = express.Router();

 
module.exports = router;

// Get all records of city
router.get('/city', (req, res) => {
    const sql = 'SELECT * FROM cities';
    conn.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(result);
      }
    });
  });
  
  // Insert a new record  of city
  router.post('/city', (req, res) => {
    const record = req.body;
    const sql = 'INSERT INTO cities SET ?';
    conn.query(sql, record, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(201).json({ message: 'Record inserted successfully', id: result.insertId });
      }
    });
  });
  
  // Update a record  of city
  router.put('/city/:id', (req, res) => {
    const id = req.params.id;
    const record = req.body;
    const sql = 'UPDATE cities SET ? WHERE id = ?';
    conn.query(sql, [record, id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ message: 'Record updated successfully' });
      }
    });
  });
  
  // Delete a record  of city
  router.delete('/city/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM cities WHERE id = ?';
    conn.query(sql, id, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ message: 'Record deleted successfully' });
      }
    });
  });
  

/* ****************************************** DRIVER ***************************/

  // Get all records  of DRIVER
router.get('/drivers', (req, res) => {
  const sql = 'SELECT * FROM drivers';
  conn.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});

// Insert a new record  of DRIVER
router.post('/drivers', (req, res) => {
  const record = req.body;
  const sql = 'INSERT INTO drivers SET ?';
  conn.query(sql, record, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Record inserted successfully', id: result.insertId });
    }
  });
});

// Update a record  of DRIVER
router.put('/drivers/:id', (req, res) => {
  const id = req.params.id;
  const record = req.body;
  const sql = 'UPDATE drivers SET ? WHERE id = ?';
  conn.query(sql, [record, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

// Delete a record of DRIVER
router.delete('/drivers/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM drivers WHERE id = ?';
  conn.query(sql, id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});




/* ****************************************** Client ***************************/

  // Get all records  of Client
  router.get('/clients', (req, res) => {
    const sql = 'SELECT * FROM clients';
    conn.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(result);
      }
    });
  });
  
  // Insert a new record  of client
  router.post('/clients', (req, res) => {
    const record = req.body;
    const sql = 'INSERT INTO clients SET ?';
    conn.query(sql, record, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(201).json({ message: 'Record inserted successfully', id: result.insertId });
      }
    });
  });
  
  // Update a record  of client
  router.put('/clients/:id', (req, res) => {
    const id = req.params.id;
    const record = req.body;
    const sql = 'UPDATE clients SET ? WHERE id = ?';
    conn.query(sql, [record, id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ message: 'Record updated successfully' });
      }
    });
  });
  
  // Delete a record of client
  router.delete('/clients/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM clients WHERE id = ?';
    conn.query(sql, id, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ message: 'Record deleted successfully' });
      }
    });
  });