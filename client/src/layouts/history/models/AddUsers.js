import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, IconButton, Icon, TextField } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import '../../../assets/css/AddUser.css';

const AddUserPopup = ({ isOpenAdd, onClose, onSubmit, isEditable, editItem }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [altPhone,  setAltPhone] = useState('');
  const[carNumber,setCarNumber] = useState('');
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
    "Name" : name,
    "Phone" :phone,
    "Email" :email,
    "Address":address,
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
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card sx={{ height: 'auto', overflowY: 'auto', margin: 3, padding: 0, width: '450px', backgroundColor: '#fff' }}>
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
            <h1 className='title'>Name</h1>
            <TextField
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{ placeholder: 'Enter your name' }}
            />
            <h1 className='title'>Phone</h1>
            <TextField
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{ placeholder: 'Enter your Phone' }}
            />
            <h1 className='title'>Email</h1>
            <TextField
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{ placeholder: 'Enter your email' }}
            />
            <h1 className='title'>Adderss</h1>
            <TextField
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{ placeholder: 'Enter your Address' }}
            />
            <h1 className='title'>Alt Phone</h1>
            <TextField
              variant="outlined"
              value={altPhone}
              onChange={(e) => setAltPhone(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{ placeholder: 'Enter your Alt Number' }}
            />
             
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                {!isEditable ? 'Add Entry' : 'Update'}
              </Button>
              <Button variant="contained" color="primary" onClick={onClose}>
                Cancel
              </Button>
            </Box>
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
