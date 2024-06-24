import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, Typography, IconButton, Icon ,Grid  } from '@mui/material';
import VuiBox from "components/VuiBox";
import '../../../assets/css/CustomEntry.css';
import VuiTypography from 'components/VuiTypography';
import GradientBorder from 'controllers/GradientBorder';
import VuiInput from 'components/VuiInput'; // Ensure you have the correct path for VuiInput
import borders from 'assets/theme/base/borders';
import palette from "assets/theme/base/colors";
import radialGradient from "assets/theme/functions/radialGradient";
import { setTransparentSidenav } from 'context';
import { useVisionUIController } from 'context';
import { setFixedNavbar } from 'context';




const CustomEntry = ({ isOpen, onClose, onSubmit, editItem, isEditable }) => {
  const [cityName, setCityName] = useState('');
  const [talukaName, setTalukaName] = useState('');
  const [distName, setDistName] = useState('');
 

  useEffect(() => {
    if (Object.keys(editItem).length > 0 && isEditable) {
      setCityName(editItem.name)
      setTalukaName(editItem.taluka)
      setDistName(editItem.dist)
    }
  }, [editItem])
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      "name": cityName,
      "taluka": talukaName,
      "dist": distName,
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
      <Card sx={{ height: 'auto', overflowY: "auto",  width: '400px', backgroundColor: '#fff' }}>
      <VuiTypography component="label" variant="button" color="white" fontWeight="large">
          CREATE CITY ENTRY
        </VuiTypography>
        <IconButton
          size="small"
          color="inherit"
          aria-haspopup="true"
          sx={{ color: 'red', position:'absolute', right:2, top:1, cursor: 'pointer' }}
          variant="contained"
          onClick={onClose}
        >
          <Icon>close</Icon>
        </IconButton>

        {/* City input */}
        <VuiBox mb={2} mt={2}>
              <Grid xs={12} lg={12} xl={12} container>
                <Grid item xs={4} lg={4} xl={4}>
                  <VuiTypography mt={1} component="label" variant="button" color="white" fontWeight="medium">
                   City Name
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
                    <VuiInput type="text" sx={{ color: 'white !important' }} placeholder=" Name" fontWeight="500" value={cityName} onChange={(e) => setCityName(e.target.value)} />
                  </GradientBorder>
                </Grid>
              </Grid>
            </VuiBox>

            <VuiBox mb={2} mt={2}>
              <Grid xs={12} lg={12} xl={12} container>
                <Grid item xs={4} lg={4} xl={4}>
                  <VuiTypography mt={1} component="label" variant="button" color="white" fontWeight="medium">
                   Taluka Name
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
                    <VuiInput type="text" sx={{ color: 'white !important' }} placeholder=" Name" fontWeight="500" value={talukaName} onChange={(e) => setTalukaName(e.target.value)} />
                  </GradientBorder>
                </Grid>
              </Grid>
            </VuiBox>

            <VuiBox mb={2} mt={2}>
              <Grid xs={12} lg={12} xl={12} container>
                <Grid item xs={4} lg={4} xl={4}>
                  <VuiTypography mt={1} component="label" variant="button" color="white" fontWeight="medium">
                   Dist Name
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
                    <VuiInput type="text" sx={{ color: 'white !important' }} placeholder=" Name" fontWeight="500" value={distName} onChange={(e) => setDistName(e.target.value)} />
                  </GradientBorder>
                </Grid>
              </Grid>
            </VuiBox>

        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}  sx={{ color: 'white !important', borderRadius: 1}}>
            {!isEditable ? 'Add Entry' : 'Update'}
          </Button>
          <Button variant="contained" color="primary" onClick={onClose}  sx={{ color: 'white !important', borderRadius: 1}}>
            Cancel
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
  editItem: PropTypes.object,
  isEditable: PropTypes.bool,
};

export default CustomEntry;
