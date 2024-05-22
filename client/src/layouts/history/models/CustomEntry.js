import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, Select, MenuItem, Typography, IconButton, Icon } from '@mui/material';
import VuiBox from "components/VuiBox";
import GradientBorder from "controllers/GradientBorder";
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

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
    onSubmit(formData);
    onClose();
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
      <Card sx={{ height: 430, overflowY: "auto", margin: 3, padding: 2, width: '400px', backgroundColor: '#fff' }}>
        <IconButton
          size="small"
          color="inherit"
          aria-haspopup="true"
          sx={{ color: 'red', marginLeft: 40, cursor: 'pointer' }}
          variant="contained"
          onClick={onClose}
        >
          <Icon>close</Icon>
        </IconButton>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <Typography component="label" variant="button" color="white" fontWeight="medium">
              Add City
            </Typography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
                color: 'white'
              })}
            >
              <MenuItem value="" disabled>Select City</MenuItem>
              <MenuItem value="City1">City1</MenuItem>
              <MenuItem value="City2">City2</MenuItem>
              <MenuItem value="City3">City3</MenuItem>
            </Select>
          </GradientBorder>
        </VuiBox>

        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <Typography component="label" variant="button" color="white" fontWeight="medium">
              Add Client
            </Typography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <Select
              value={client}
              onChange={(e) => setClient(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
                color: 'white'
              })}
            >
              <MenuItem value="" disabled>Select Client</MenuItem>
              <MenuItem value="Client1">Client1</MenuItem>
              <MenuItem value="Client2">Client2</MenuItem>
              <MenuItem value="Client3">Client3</MenuItem>
            </Select>
          </GradientBorder>
        </VuiBox>

        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <Typography component="label" variant="button" color="white" fontWeight="medium">
              Add Driver
            </Typography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <Select
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
                color: 'white'
              })}
            >
              <MenuItem value="" disabled>Select Driver</MenuItem>
              <MenuItem value="Driver1">Driver1</MenuItem>
              <MenuItem value="Driver2">Driver2</MenuItem>
              <MenuItem value="Driver3">Driver3</MenuItem>
            </Select>
          </GradientBorder>
        </VuiBox>

        <Box mt={2} display="flex" justifyContent="space-between">
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
