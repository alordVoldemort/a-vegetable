import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, IconButton, Icon, TextField, Grid } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import '../../../assets/css/AddUser.css';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import GradientBorder from 'controllers/GradientBorder';
import borders from 'assets/theme/base/borders';
import palette from "assets/theme/base/colors";
import radialGradient from "assets/theme/functions/radialGradient";
import VuiInput from 'components/VuiInput';

const AddUserPopup = ({ isOpenAdd, onClose, onSubmit, isEditable, editItem }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (Object.keys(editItem).length > 0 && isEditable) {
      setName(editItem.name)
      setEmail(editItem.email)
      setPhone(editItem.phone)
      setAddress(editItem.address)
      setAltPhone(editItem.altPhone)

    }
  }, [editItem])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      "Name": name,
      "Phone": phone,
      "Email": email,
      "Address": address,
      "AltPhone": altPhone,

    };
    onSubmit(formData);
    onClose();
  };

  return isOpenAdd && (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      }}
    >
      <Card sx={{
        maxHeight: '80vh',
        overflowY: 'auto',
        margin: 3,
        padding: 4,
        width: '400px',
        backgroundColor: '#fff'
      }}>
         <VuiTypography component="label" variant="button" color="white" fontWeight="large">
          CREATE CLIENT ENTRY
        </VuiTypography>

        <IconButton
          size="small"
          color="inherit"
          aria-haspopup="true"
          sx={{ color: 'red', marginLeft: 45, cursor: 'pointer' }}
          variant="contained"
          onClick={onClose}
        >
          <Icon>close</Icon>
        </IconButton>
        <form onSubmit={handleSubmit}>
          
            <VuiBox mb={2} mt={2}>
              <Grid xs={12} lg={12} xl={12} container>
                <Grid item xs={4} lg={4} xl={4}>
                  <VuiTypography mt={1} component="label" variant="button" color="white" fontWeight="medium">
                    Name
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
                    <VuiInput type="text" sx={{ color: 'white !important' }} placeholder=" Name" fontWeight="500" value={name} onChange={(e) => setName(e.target.value)} />
                  </GradientBorder>
                </Grid>
              </Grid>
            </VuiBox>

            <VuiBox mb={2} >
              <Grid xs={12} lg={12} xl={12} container>
                <Grid item xs={4} lg={4} xl={4}>
                  <VuiTypography mt={1} component="label" variant="button" color="white" fontWeight="medium">
                    Phone
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
                    <VuiInput type="text" sx={{ color: 'white !important' }} placeholder=" Enter Phone No" fontWeight="500" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </GradientBorder>
                </Grid>
              </Grid>
            </VuiBox>
            <VuiBox mb={2} >
              <Grid xs={12} lg={12} xl={12} container>
                <Grid item xs={4} lg={4} xl={4}>
                  <VuiTypography mt={1} component="label" variant="button" color="white" fontWeight="medium">
                    Email
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
                    <VuiInput type="text" sx={{ color: 'white !important' }} placeholder=" Enter Mail" fontWeight="500" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </GradientBorder>
                </Grid>
              </Grid>
            </VuiBox>
            <VuiBox mb={2} mt={2}>
              <Grid xs={12} lg={12} xl={12} container>
                <Grid item xs={4} lg={4} xl={4}>
                  <VuiTypography mt={1} component="label" variant="button" color="white" fontWeight="medium">
                    Adderss
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
                    <VuiInput type="text" sx={{ color: 'white !important' }} placeholder=" Enter Adderss" fontWeight="500" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </GradientBorder>
                </Grid>
              </Grid>
            </VuiBox>

            <VuiBox mb={2} mt={2}>
              <Grid xs={12} lg={12} xl={12} container>
                <Grid item xs={4} lg={4} xl={4}>
                  <VuiTypography mt={1} component="label" variant="button" color="white" fontWeight="medium">
                    Alt Number
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
                    <VuiInput type="text" sx={{ color: 'white !important' }} placeholder=" Enter Alt Number" fontWeight="500" value={altPhone} onChange={(e) => setAltPhone(e.target.value)} />
                  </GradientBorder>
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

        </form>

      </Card>
    </Box>
  );
};

AddUserPopup.propTypes = {
  isOpenAdd: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  editItem: PropTypes.object,
  isEditable: PropTypes.bool,

};

export default AddUserPopup;
