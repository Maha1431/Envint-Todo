import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo } from '../redux/slices/todoSlices';
import { Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const TodoForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,  // This will be the dropdown field (true/false)
  });
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Check if form data is correct
    if (token) {
      dispatch(createTodo(formData));
      setFormData({ title: '', description: '', completed: false }); // reset form
    }
  };
  
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 500,
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Create Todo
      </Typography>
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        multiline
        rows={4}
      />
      
      {/* Completed dropdown */}
      <FormControl fullWidth required margin="normal">
        <InputLabel>Completed</InputLabel>
        <Select
          name="completed"
          value={formData.completed}
          onChange={handleChange}
        >
          <MenuItem value="true">True</MenuItem>
          <MenuItem value="false">False</MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: '1rem' }}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default TodoForm;
