import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, Select, MenuItem, Typography, IconButton, Icon } from '@mui/material';
import VuiBox from "components/VuiBox";
import '../../../assets/css/CustomEntry.css';

const CustomEntry = ({ isOpen, onClose, onSubmit }) => {
  const [city, setCity] = useState('');
  const [client, setClient] = useState('');
  const [driver, setDriver] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      city,
      client,
      driver,
    };
    onSubmit(formData); // Send the form data to the parent component
    onClose(); // Close the CustomEntry form
  };

  return isOpen && (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card sx={{ height: 430, overflowY: "auto", margin: 4, padding: 4, width: '400px', backgroundColor: '#fff' }}>
        <IconButton
          size="small"
          color="inherit"
          aria-haspopup="true"
          sx={{ color: 'red', marginLeft: 40, cursor: 'pointer',marginBottom:4}}
          variant="contained"
          onClick={onClose}
        >
          <Icon>close</Icon>
        </IconButton>
        <VuiBox mb={3}>

          {/* City input */}
          <Select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'City' }}
          >
            <MenuItem value="">Select City</MenuItem>
            <MenuItem value="City1">City1</MenuItem>
            <MenuItem value="City2">City2</MenuItem>
            <MenuItem value="City3">City3</MenuItem>
          </Select>
        </VuiBox>
        <VuiBox mb={3}>
          <Select
            value={city}
            onChange={(e) => setClient(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'City' }}
          >
            <MenuItem value="">Select Client</MenuItem>
            <MenuItem value="City1">Aniket</MenuItem>
            <MenuItem value="City2">Aniket</MenuItem>
            <MenuItem value="City3">Aniket</MenuItem>
          </Select>
        </VuiBox>
        <VuiBox mb={3}>
          <Select
            value={city}
            onChange={(e) => setDriver(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'City' }}
          >
            <MenuItem value="">Select Driver</MenuItem>
            <MenuItem value="City1">Chotya</MenuItem>
            <MenuItem value="City2">Chotya</MenuItem>
            <MenuItem value="City3">Chotya</MenuItem>
          </Select>
        </VuiBox>
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Box>
      </Card>
    </Box>
  ); 
};

CustomEntry.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default CustomEntry;
