// src/components/Layout/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => (
  <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        My App
      </Typography>
      <Box>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        <Button component={Link} to="/login" color="inherit">
          Login
        </Button>
        <Button component={Link} to="/signup" color="inherit">
          Signup
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;
