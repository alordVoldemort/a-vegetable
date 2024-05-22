import React, { useState } from 'react';
import { Box, Button, Card, TextField, Select, MenuItem, FormControl, InputLabel, Icon, IconButton,Typography } from '@mui/material';
import PropTypes from 'prop-types';
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import GradientBorder from "controllers/GradientBorder";
// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import rgba from "assets/theme/functions/rgba";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";


import '../../../assets/css/add-model.css'
const CreateEntry = ({ isOpen,  onClose, onSubmit }) => {
    isOpen 
    onClose = onClose || (() => { });
    onSubmit = onSubmit || (() => { });
    const [vegitableName, setVegitableName] = useState('');
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [driverName, setDriverName] = useState('');
    const [clientName, setClientName] = useState('');
    const [advance, setAdvance] = useState('');
    const [vegitableWeight, setVegitableWeight] = useState('');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            vegitableName,
            fromCity,
            toCity,
            driverName,
            clientName,
            advance,
            vegitableWeight,
            weightUnit,
            note,
        };
        onSubmit(formData);
        onClose();
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
            <Card sx={{ height:800 ,overflowY:"auto",margin:3, padding: 2, width: '400px', backgroundColor: '#fff' }}>
            <IconButton
                size="small"
                color="inherit"
                aria-haspopup="true"
                sx={{ color: 'red',marginLeft:40,cursor:'pointer'}}
                variant="contained"
                onClick={onClose} 

              >
            <Icon > close</Icon>
            </IconButton>
            <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                    <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    vegitable Name
                    </VuiTypography>
                </VuiBox>
                <GradientBorder
                    //   minWidth="100%"
                    borderRadius={borders.borderRadius.lg}
                    padding="1px"
                    backgroundImage={radialGradient(
                        palette.gradients.borderLight.main,
                        palette.gradients.borderLight.state,
                        palette.gradients.borderLight.angle
                    )}
                >
                    <VuiInput
                        placeholder="vegitable Name"
                        sx={({ typography: { size } }) => ({
                            fontSize: size.sm,fontSize: 'small', border: 'none', width: '100%', outline: 'none'
                        })}
                    />
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
        fontSize: size.sm,fontSize: 'small', border: 'none', width: '100%', outline: 'none', backgroundColor: 'transparent',    
        color: 'black'
      })}
    >
      <MenuItem value="" disabled>Select City</MenuItem>
      <MenuItem value="Pune">Pune</MenuItem>
      <MenuItem value="Nashik">Nashik</MenuItem>
      <MenuItem value="Nagar">Nagar</MenuItem>
    </Select>
  </GradientBorder>
</VuiBox>


<VuiBox mb={2}>
  <VuiBox mb={1} ml={0.5}>
    <Typography component="label" variant="button" color="white" fontWeight="medium">
     To City
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
        color: 'black'
      })}
    >
      <MenuItem value="" disabled>To City</MenuItem>
      <MenuItem value="Pune">Pune</MenuItem>
      <MenuItem value="Nashik">Nashik</MenuItem>
      <MenuItem value="Nagar">Nagar</MenuItem>
    </Select>
  </GradientBorder>
</VuiBox>

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
        color: 'black'
      })}
    >
      <MenuItem value="" disabled>Select Driver</MenuItem>
      <MenuItem value="Vishal">Vishal</MenuItem>
      <MenuItem value="Chotya">Chotya</MenuItem>
      <MenuItem value="Pratik">Pratik</MenuItem>
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
        color: 'black'
      })}
    >
      <MenuItem value="" disabled>Select Client</MenuItem>
      <MenuItem value="pune">Aniket 1</MenuItem>
      <MenuItem value="Nashik">Aniket 2</MenuItem>
      <MenuItem value="Nagar">Aniket3</MenuItem>
    </Select>
  </GradientBorder>
</VuiBox>


            <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                    <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Client Total Amount
                    </VuiTypography>
                </VuiBox>
                <GradientBorder
                    //   minWidth="100%"
                    borderRadius={borders.borderRadius.lg}
                    padding="1px"
                    backgroundImage={radialGradient(
                        palette.gradients.borderLight.main,
                        palette.gradients.borderLight.state,
                        palette.gradients.borderLight.angle
                    )}
                >
                    <VuiInput
                        placeholder="Client Total Amount"
                        sx={({ typography: { size } }) => ({
                            fontSize: size.sm,
                        })}
                    />
                </GradientBorder>
            </VuiBox>
            <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                    <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Advance From Client
                     </VuiTypography>
                </VuiBox>
                <GradientBorder
                    //   minWidth="100%"
                    borderRadius={borders.borderRadius.lg}
                    padding="1px"
                    backgroundImage={radialGradient(
                        palette.gradients.borderLight.main,
                        palette.gradients.borderLight.state,
                        palette.gradients.borderLight.angle
                    )}
                >
                    <VuiInput
                        placeholder="Advance From Client"
                        sx={({ typography: { size } }) => ({
                            fontSize: size.sm,
                        })}
                    />
                </GradientBorder>
            </VuiBox>
            <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                    <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Total weight of the vegetables
               </VuiTypography>
                </VuiBox>
                <GradientBorder
                    //   minWidth="100%"
                    borderRadius={borders.borderRadius.lg}
                    padding="1px"
                    backgroundImage={radialGradient(
                        palette.gradients.borderLight.main,
                        palette.gradients.borderLight.state,
                        palette.gradients.borderLight.angle
                    )}
                >
                    <VuiInput
                        placeholder="Total weight of the vegetables"
                        sx={({ typography: { size } }) => ({
                            fontSize: size.sm,
                        })}
                    />
                </GradientBorder>
            </VuiBox>
            <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                    <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    photo As Attachment 
               </VuiTypography>
                </VuiBox>
                <GradientBorder
                    //   minWidth="100%"
                    borderRadius={borders.borderRadius.lg}
                    padding="1px"
                    backgroundImage={radialGradient(
                        palette.gradients.borderLight.main,
                        palette.gradients.borderLight.state,
                        palette.gradients.borderLight.angle
                    )}
                >
                    <VuiInput
                        type='imgage'
                        placeholder="photo As Attachment "
                        sx={({ typography: { size } }) => ({
                            fontSize: size.sm,
                        })}
                    />
                </GradientBorder>
            </VuiBox>
            <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                    <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Note
               </VuiTypography>
                </VuiBox>
                <GradientBorder
                    //   minWidth="100%"
                    borderRadius={borders.borderRadius.lg}
                    padding="1px"
                    backgroundImage={radialGradient(
                        palette.gradients.borderLight.main,
                        palette.gradients.borderLight.state,
                        palette.gradients.borderLight.angle
                    )}
                >
                    <VuiInput
                        type='text-area'
                        placeholder="Note "
                        sx={({ typography: { size } }) => ({
                            fontSize: size.sm,
                        })}
                    />
                </GradientBorder>
            </VuiBox>
            <Box mt={2} display="flex" justifyContent="space-between">
                        <Button variant="contained" color="primary" type="submit">
                            Create
                        </Button>
                     
                    </Box>
            </Card>
        </Box>
    );
};
CreateEntry.defaultProps = {
    isOpen: false,
    onClose: () => {},
    onSubmit: () => {},
};


export default CreateEntry;
