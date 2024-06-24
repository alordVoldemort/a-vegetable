import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, IconButton, Icon, Typography, Select, MenuItem, TextField, Grid, InputAdornment } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import VuiBox from "components/VuiBox";
import GradientBorder from "controllers/GradientBorder";
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import 'assets/css/add-model.css';
import VuiTypography from 'components/VuiTypography';
import VuiInput from 'components/VuiInput';
import { useFetch } from 'service/api';
import './model.module.css';
import { makeStyles } from '@mui/styles';

const CreateEntry = ({ isOpen, onClose, onSubmit, editItem, isEditable }) => {
  const [vegitableName, setVegitableName] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [driverName, setDriverName] = useState('');
  const [clientName, setClientName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [amountInWords, setAmountInWords] = useState('');
  const [vegetableWeight, setVegetableWeight] = useState('');
  const [advance, setAdvance] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const selectRef = useRef(null);

  const { data: driversData, isLoading: isDriversLoading, isError: isDriversError } = useFetch('drivers');
  const { data: citiesData, isLoading: isCitiesLoading, isError: isCitiesError } = useFetch('city');
  const { data: clientsData, isLoading: isClientsLoading, isError: isClientsError } = useFetch('clients');

  useEffect(() => {
    if (Object.keys(editItem).length > 0 && isEditable) {
      setVegitableName(editItem.name);
      setFromCity(editItem.cityFrom);
      setToCity(editItem.cityTo);
      setDriverName(editItem.driverId);
      setClientName(editItem.clientId);
      setTotalAmount(editItem.totalAmt);
      setVegetableWeight(editItem.weight);
      setAdvance(editItem.advance);
    }
  }, [editItem, isEditable]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: vegitableName,
      clientId: clientName,
      driverId: driverName,
      cityFrom: fromCity,
      cityTo: toCity,
      weight: vegetableWeight,
      totalAmt: totalAmount,
      advance: advance,
      paymentType: 1,
      note: "",
      status: 1
    };
    onSubmit(formData);
    onClose();
  };

  const handleClick = () => {
    if (selectRef.current) {
      selectRef.current.click();
    }
  };

  const numberToWords = (num) => {
    const ones = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
      'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
    ];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
    if (isNaN(num)) return '';
    if (num === 0) return 'Zero';
  
    let word = '';
    let scaleIndex = 0;
  
    const chunkToWords = (chunk) => {
      let chunkInWords = '';
      let hundreds = Math.floor(chunk / 100);
      chunk %= 100;
  
      if (hundreds) {
        chunkInWords += ones[hundreds] + ' Hundred ';
      }
  
      if (chunk < 20) {
        chunkInWords += ones[chunk] + ' ';
      } else {
        let tensValue = Math.floor(chunk / 10);
        let onesValue = chunk % 10;
        chunkInWords += tens[tensValue] + ' ' + ones[onesValue] + ' ';
      }
  
      return chunkInWords.trim();
    };
  
    if (num >= 10000000) { // Crore
      let crore = Math.floor(num / 10000000);
      word += chunkToWords(crore) + ' Crore ';
      num %= 10000000;
    }
  
    if (num >= 100000) { // Lakh
      let lakh = Math.floor(num / 100000);
      word += chunkToWords(lakh) + ' Lakh ';
      num %= 100000;
    }
  
    if (num >= 1000) { // Thousand
      let thousand = Math.floor(num / 1000);
      word += chunkToWords(thousand) + ' Thousand ';
      num %= 1000;
    }
  
    word += chunkToWords(num);
  
    return word.trim();
  };

  const handleTotalAmountChange = (e) => {
    const value = e.target.value;
    setTotalAmount(value);
    setAmountInWords(numberToWords(Number(value)));
  };

  const classes = useStyles();

  return isOpen && (
    <Box style={{}} sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Card sx={{ maxHeight: '80vh', overflowY: "auto", margin: 3, padding: 4, width: '400px', backgroundColor: '#fff' }}>
        <VuiTypography component="label" variant="button" color="white" fontWeight="large">
          CREATE NEW ENTRY
        </VuiTypography>
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

        <VuiBox mb={2} mt={2}>
          <Grid xs={12} lg={12} xl={12} container>
            <Grid item xs={4} lg={4} xl={4}>
              <VuiTypography mt={1} component="label" variant="button" color="white" fontWeight="medium">
                Vegitable Name
              </VuiTypography>
            </Grid>
            <Grid item xs={8} lg={8} xl={8}>
              <GradientBorder
                minWidth="100%"
                padding="1px"
                borderRadius={borders.borderRadius.lg}
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput type="text" sx={{ color: 'white !important' }} placeholder="Vegitable Name" fontWeight="500" value={vegitableName} onChange={(e) => setVegitableName(e.target.value)} />
              </GradientBorder>
            </Grid>
          </Grid>
        </VuiBox>

        <VuiBox mb={2}>
          <Grid xs={12} lg={12} xl={12} container>
            <Grid item xs={4} lg={4} xl={4}>
              <VuiTypography mt={1} component="label" variant="button" color="white" fontWeight="medium">
                Select City
              </VuiTypography>
            </Grid>
            <Grid item xs={8} lg={8} xl={8}>
              <GradientBorder
                minWidth="100%"
                padding="1px"
                borderRadius={borders.borderRadius.lg}
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <Select
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={({ typography: { size } }) => ({
                    backgroundColor: '#0f1535 !important',
                    fontSize: size.sm,
                    color: fromCity ? 'white !important' : ''
                  })}
                >
                  <MenuItem value="" disabled>Select City</MenuItem>
                  {citiesData && citiesData.map(city => (
                    <MenuItem key={city.name} value={city.id}>{city.name}</MenuItem>
                  ))}
                </Select>
              </GradientBorder>
            </Grid>
          </Grid>
        </VuiBox>

        <VuiBox mb={2} mt={2}>
          <Grid xs={12} lg={12} xl={12} container>
            <Grid item xs={4} lg={4} xl={4}>
              <VuiTypography mt={1} component="label" variant="button" color="white" fontWeight="medium">
                To City
              </VuiTypography>
            </Grid>
            <Grid item xs={8} lg={8} xl={8}>
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
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={({ typography: { size } }) => ({
                    backgroundColor: '#0f1535 !important',
                    fontSize: size.sm,
                    color: toCity ? 'white !important' : ''
                  })}
                >
                  <MenuItem value="" disabled>Select To City</MenuItem>
                  {citiesData && citiesData.map(city => (
                    <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
                  ))}
                </Select>
              </GradientBorder>
            </Grid>
          </Grid>
        </VuiBox>

        {/* Driver Name */}
        <VuiBox mb={2} mt={2}>
          <Grid xs={12} lg={12} xl={12} container>
            <Grid item xs={4} lg={4} xl={4}>
              <VuiTypography mt={1} component="label" variant="button" color="white" fontWeight="medium">
                Select Driver
              </VuiTypography>
            </Grid>
            <Grid item xs={8} lg={8} xl={8}>
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
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={({ typography: { size } }) => ({
                    backgroundColor: '#0f1535 !important',
                    fontSize: size.sm,
                    color: driverName ? 'white !important' : ''
                  })}
                >
                  <MenuItem value="" disabled>Select Driver Name</MenuItem>
                  {driversData && driversData.map(driver => (
                    <MenuItem key={driver.name} value={driver.id}>{driver.name}</MenuItem>
                  ))}
                </Select>
              </GradientBorder>
            </Grid>
          </Grid>
        </VuiBox>

        <VuiBox mb={2} mt={2}>
          <Grid xs={12} lg={12} xl={12} container>
            <Grid item xs={4} lg={4} xl={4}>
              <VuiTypography mt={1} component="label" variant="button" color="white" fontWeight="medium">
                Select Client
              </VuiTypography>
            </Grid>
            <Grid item xs={8} lg={8} xl={8}>
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
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={({ typography: { size } }) => ({
                    backgroundColor: '#0f1535 !important',
                    fontSize: size.sm,
                    color: clientName ? 'white !important' : ''
                  })}
                >
                  <MenuItem value="" disabled>Select Client</MenuItem>
                  {clientsData && clientsData.map(client => (
                    <MenuItem key={client.name} value={client.id}>{client.name}</MenuItem>
                  ))}
                </Select>
              </GradientBorder>
            </Grid>
          </Grid>
        </VuiBox>

        <VuiBox mb={2} mt={2}>
          <Grid xs={12} lg={12} xl={12} container>
            <Grid item xs={4} lg={4} xl={4}>
              <VuiTypography mt={1} component="label" variant="button" color="white" fontWeight="medium">
                Total Amount
              </VuiTypography>
            </Grid>
            <Grid item xs={8} lg={8} xl={8}>
              <GradientBorder
                type="number"
                minWidth="100%"
                padding="1px"
                borderRadius={borders.borderRadius.lg}
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput
                  type="number"
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  }}
                  sx={{ color: 'white !important' , paddingLeft:3}}
                  placeholder="Enter Total Amount"
                  fontWeight="500"
                  value={totalAmount}
                  onChange={handleTotalAmountChange}
                  
                  startAdornment={totalAmount ? <InputAdornment position="start" style={{position:'absolute', left:0, marginLeft:5}}>₹</InputAdornment>: ''}
                />
              </GradientBorder>
              <Typography mt={1} color="white" fontWeight="small" fontSize={10}>
                {totalAmount && numberToWords(Number(totalAmount))}
              </Typography>
            </Grid>
          </Grid>
        </VuiBox>
        
        <VuiBox mb={2} mt={2}>  
          <Grid xs={12} lg={12} xl={12} container>
            <Grid item xs={4} lg={4} xl={4}>
              <VuiTypography mt={1} component="label" variant="button" color="white" fontWeight="medium">
                Vegetable weight
              </VuiTypography>
            </Grid>
            <Grid item xs={8} lg={8} xl={8}>
              <GradientBorder
                minWidth="100%"
                padding="1px"
                borderRadius={borders.borderRadius.lg}
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput
                  type="number"
                  sx={{ color: 'white !important' }}
                  placeholder="Vegetable weight..."
                  fontWeight="500"
                  value={vegetableWeight}
                  onChange={(e) => setVegetableWeight(e.target.value)}
                />
              </GradientBorder>
            </Grid>
          </Grid>
        </VuiBox>

        <VuiBox mb={2} mt={2}>
          <Grid xs={12} lg={12} xl={12} container>
            <Grid item xs={4} lg={4} xl={4}>
              <VuiTypography mt={1} component="label" variant="button" color="white" fontWeight="medium">
                Advance
              </VuiTypography>
            </Grid>
            <Grid item xs={8} lg={8} xl={8}>
              <GradientBorder
                minWidth="100%"
                padding="1px"
                borderRadius={borders.borderRadius.lg}
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput
                  type="number"
                  sx={{ color: 'white !important', paddingLeft:3 }}
                  placeholder="Advance Amount"
                  fontWeight="500"
                  value={advance}
                
                  onChange={(e) => setAdvance(e.target.value)}
                  startAdornment={advance ? <InputAdornment position="start" style={{position:'absolute', left:0, marginLeft:5}}>₹</InputAdornment>: ''}
                />
              </GradientBorder>
              <Typography mt={1} color="white" fontWeight="small" fontSize={10}>
              {advance && numberToWords(Number(advance))}
              </Typography>
           
            </Grid>
          </Grid>
        </VuiBox>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
            {!isEditable ? 'Add Entry' : 'Update'}
          </Button>
          <Button variant="contained" color="primary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

CreateEntry.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  editItem: PropTypes.object,
  isEditable: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  selectRoot: {
    backgroundColor: 'transparent',
    color: 'black',
  },
  selectSelect: {
    '&:focus': {
      backgroundColor: 'transparent !important',
    },
  },
}));

export default CreateEntry;
