import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, IconButton, Icon, TextField } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import '../../../assets/css/AddUser.css';

const AddUserPopup = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState(null);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setEmail('');
      setPhone('');
      setPhoto(null);
      setPassword('');
    }
  }, [isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      phone,
      photo,
      password,
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
      <Card sx={{ height: 450, overflowY: 'auto', margin: 3, padding: 0, width: '450px', backgroundColor: '#fff' }}>
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
            <h1 className='title'>Email</h1>
            <TextField
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{ placeholder: 'Enter your email' }}
            />
            <h1 className='title'>Phone</h1>
            <TextField
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{ placeholder: 'Enter your phone number' }}
            />
            {/* <h1 className='title'>Photo</h1>
            <input
              accept="image/*"
              id="photo-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            /> */}
            {/* <label htmlFor="photo-upload">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            {photo && <img src={photo} alt="Selected" style={{ width: '100%', marginTop: '1rem' }} />}
            <h1 className='title'>Password</h1>
            <TextField
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{ placeholder: 'Enter your password' }}
            /> */}
            <Button variant="contained" color="primary" type="submit">
              Create User
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

AddUserPopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default AddUserPopup;
