import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, IconButton, Icon, Typography, Select, MenuItem, TextField } from '@mui/material';
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

const CreateEntry = ({ isOpen, onClose, onSubmit, editItem, isEditable }) => {
  const [vegitableName, setVegitableName] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [driverName, setDriverName] = useState('');
  const [clientName, setClientName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const selectRef = useRef  (null);

  const { data: driversData, isLoading: isDriversLoading, isError: isDriversError } = useFetch('drivers');
  const { data: citiesData, isLoading: isCitiesLoading, isError: isCitiesError } = useFetch('city');
  const { data: clientsData, isLoading: isClientsLoading, isError: isClientsError } = useFetch('clients');

 
  useEffect(()=>{
  if(Object.keys(editItem).length > 0 && isEditable){
      setVegitableName(editItem.vegitableName)
      setFromCity(editItem.fromCity)
      setToCity(editItem.toCity)
      setDriverName(editItem.driverName)
      setClientName(editItem.clientName)
      setTotalAmount(editItem.totalAmount)

      console.log(editItem,'editItem', isEditable)
  }
  },[editItem])
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      // vegitableName,
      // fromCity,
      // toCity,
      // driverName,
      // clientName,
      // // vegitableWeight,
      // // weightUnit,
      // // imageFile,

      "name": vegitableName,
      "clientId": clientName,
      "driverId": driverName,         
      "cityFrom": fromCity,
      "cityTo": toCity,

      "totalAmt": 100,
      "advance": 50,
      "paymentType": 1, //phone pe gpay ntfc, others //dro   
      "weight": 11, //vegitableWeight
      "note": "",
      "status": 1
    };
    onSubmit(formData);
    onClose();
  };

  const handleClick = () => {
    // Open the dropdown when clicking on the empty area
    if (selectRef.current) {
      selectRef.current.click();
    }
  };

  return isOpen && (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Card sx={{ height: 'auto', overflowY: "auto", margin: 3, padding: 2, width: '400px', backgroundColor: '#fff' }}>
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
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Vegitable Name
            </VuiTypography>
          </VuiBox>
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
            <VuiInput type="email" placeholder="Your email..." fontWeight="500" value={vegitableName} onChange={(e)=> setVegitableName(e.target.value)}/>
          </GradientBorder>
        </VuiBox>

        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <Typography component="label" variant="button" color="white" fontWeight="medium">
              From City
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
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                    color: 'white'
                })}
                fullWidth
            >
                <MenuItem value="" disabled>Select City</MenuItem>
                {citiesData && citiesData.map(city => (
                    <MenuItem key={city.name} value={city.id}>{city.name}</MenuItem>
                ))}
            </Select>
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <Typography component="label" variant="button" color="white" fontWeight="medium">
              To CITY     
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
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
                color: 'white'
              })}
              
            >
                 <MenuItem value="" disabled>Select To City</MenuItem>
                {citiesData && citiesData.map(city => (
                    <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
                ))}
            </Select>
          </GradientBorder>
        </VuiBox>

{/* Driver Name */}
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <Typography component="label" variant="button" color="white" fontWeight="medium">
              Driver Name
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
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
                color: 'white'
              })}
            >   
             <MenuItem value="" disabled>Select Driver Name</MenuItem>
            {driversData && driversData.map(driver => (
                <MenuItem key={driver.name} value={driver.id}>{driver.name}</MenuItem>
            ))}
            </Select>
          </GradientBorder>
        </VuiBox>

        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <Typography component="label" variant="button" color="white" fontWeight="medium">
            Client Name
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
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
                color: 'white'
              })}
            >
               <MenuItem value="" disabled>Select Client</MenuItem>
            {clientsData && clientsData.map(client => (
                <MenuItem key={client.name} value={client.id}>{client.name}</MenuItem>
            ))}
            </Select>
          </GradientBorder>
        </VuiBox>

 <VuiBox mb={2}>
        <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Total Amount
            </VuiTypography>
          </VuiBox>
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
            <VuiInput type="int" placeholder="Total Amount" fontWeight="500" value={totalAmount} onChange={(e)=> setTotalAmount(e.target.value)}/>
          </GradientBorder>
        </VuiBox>
     
     
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
            {!isEditable ? 'Add Entry' : 'Update'}
          </Button>
          <Button variant="contained" color="primary"  onClick={onClose}>
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

export default CreateEntry;
