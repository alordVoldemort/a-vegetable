import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, Typography, IconButton, Icon } from '@mui/material';
import VuiBox from "components/VuiBox";
import '../../../assets/css/CustomEntry.css';
import VuiTypography from 'components/VuiTypography';
import GradientBorder from 'controllers/GradientBorder';
import VuiInput from 'components/VuiInput'; // Ensure you have the correct path for VuiInput
import borders from 'assets/theme/base/borders';



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
        <VuiBox mb={3} mt={3}>         
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage="linear-gradient(180deg, rgba(255,255,255,0.2), rgba(0,0,0,0.2))"
          >
            <VuiInput
              type="text"
              placeholder="Enter City Name"
              fontWeight="500"
              value={cityName}
              sx={{ color: 'white !important'}}
              onChange={(e) => setCityName(e.target.value)}
            />
          </GradientBorder>
        </VuiBox>

        <VuiBox mb={3}>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage="linear-gradient(180deg, rgba(255,255,255,0.2), rgba(0,0,0,0.2))"
          >
            <VuiInput
              type="text"
              placeholder="Enter Taluka Name"
              fontWeight="500"
              value={talukaName}
              sx={{ color: 'white !important'}}
              onChange={(e) => setTalukaName(e.target.value)}
            />
          </GradientBorder>
        </VuiBox>

        <VuiBox mb={3}>         
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage="linear-gradient(180deg, rgba(255,255,255,0.2), rgba(0,0,0,0.2))"
          >
            <VuiInput
              type="text"
              placeholder="Enter Dist Name"
              fontWeight="500"
              sx={{ color: 'white !important'}}
              value={distName}
              onChange={(e) => setDistName(e.target.value)}
            />
          </GradientBorder>
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
