import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Paper,
  TablePagination,
  Button,
} from '@mui/material';
// import { CSVLink } from 'react-csv';

const MyTable = ({ columns, rows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderColumns = columns.map(column => (
    <TableCell key={column.name}>{column.name}</TableCell>
  ));

  const renderRows = filteredRows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => (
      <TableRow key={index} style={{ backgroundColor: 'transparent', color: 'white' }}>
        {Object.values(row).map((cell, index) => (
          <TableCell style={{ backgroundColor: 'transparent', color: 'white'}} key={index}>{cell}</TableCell>
        ))}
      </TableRow>
    ));

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" style={{ marginBottom: '10px' }}>Export CSV
        {/* <CSVLink data={filteredRows} headers={columns} filename={"table_data.csv"}>Export CSV</CSVLink> */}
      </Button>
      <TableContainer component={Paper} style={{ backgroundColor: 'transparent'}}>
        <Table>
          <TableHead>
            <TableRow>{renderColumns}</TableRow>
          </TableHead>
          <TableBody>{renderRows}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default MyTable;