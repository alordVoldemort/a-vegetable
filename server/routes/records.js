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

  if (city !== undefined && city !== null && city !== "") {
    query += ' AND cityTo = ?';
    queryParams.push(city);
  }

  if (text !== undefined && text !== null && text !== "") {
    query += ' AND name LIKE ?';
    queryParams.push(`%${text}%`);
  }

  if (queryParams.length === 0) {
    query = 'SELECT * FROM records';
  }
  conn.query(query, queryParams, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ code: 200, message: 'Record search successfully', result: results });
  });
});



// Helper function to execute SQL queries with promises
function queryPromise(conn, sql) {
  return new Promise((resolve, reject) => {
    conn.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

router.get('/stats', async (req, res) => {
  try {
    // Execute all queries concurrently using Promise.all
    const [
      totalResult,
      status0Result,
      status1Result,
      sumTotalAmtResult,
      sumPendingResult,
      totalDriversResult,
      totalClientsResult,
      totalCitiesResult
    ] = await Promise.all([
      queryPromise(conn, 'SELECT COUNT(*) AS totalCount FROM records'),
      queryPromise(conn, 'SELECT COUNT(*) AS status0Count FROM records WHERE status = 0'),
      queryPromise(conn, 'SELECT COUNT(*) AS status1Count FROM records WHERE status = 1'),
      queryPromise(conn, 'SELECT SUM(totalAmt) AS totalAmtSum FROM records'),
      queryPromise(conn, 'SELECT SUM(totalAmt - advance) AS pendingSum FROM records'),
      queryPromise(conn, 'SELECT COUNT(*) AS totalCount FROM drivers'),
      queryPromise(conn, 'SELECT COUNT(*) AS totalCount FROM clients'),
      queryPromise(conn, 'SELECT COUNT(*) AS totalCount FROM cities')
    ]);

    // Construct response object
    const stats = {
      records: {
        totalCount: totalResult[0].totalCount,
        complitedRide: status0Result[0].status0Count,
        pendingRide: status1Result[0].status1Count,
        totalAmtSum: sumTotalAmtResult[0].totalAmtSum || 0,
        pendingSum: sumPendingResult[0].pendingSum || 0,
        driversTotalCount: totalDriversResult[0].totalCount,
        clientsTotalCount: totalClientsResult[0].totalCount,
        citiesTotalCount: totalCitiesResult[0].totalCount
      }
    };
    res.status(200).json({ code: 200, message: 'Records fetched successfully', result: stats });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

