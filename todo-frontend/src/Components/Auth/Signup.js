// src/components/Auth/Signup.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../redux/slices/authSlices';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Snackbar, Alert, MenuItem } from '@mui/material';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',  // Added role field
  });
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar visibility state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData))
      .then(() => {
        setSnackbarMessage('Signup successful!');
        setOpenSnackbar(true);
  
        // Wait for the snackbar to close before navigating
        setTimeout(() => {
          navigate('/dashboard');
        }, 6000); // Delay navigation until after snackbar auto-hides (6 seconds)
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error);
        setSnackbarMessage(error.response ? error.response.data.message : 'Signup failed! Please try again.');
        setOpenSnackbar(true);
      });
  };
  
  const handleSnackbarClose = () => {
    setOpenSnackbar(false); // Close snackbar when clicked outside
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 400,
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        label="username"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      {/* Add the Role Field */}
      <TextField
        label="Role"
        name="role"
        select
        value={formData.role}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      >
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </TextField>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: '1rem' }}
      >
        Sign Up
      </Button>

      {/* Snackbar for success/failure message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes('failed') ? 'error' : 'success'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Signup;
