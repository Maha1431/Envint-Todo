// src/components/Todos/TodoSearch.js
import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

const TodoSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        margin: '1rem auto',
        maxWidth: 400,
      }}
    >
      <TextField
        label="Search tasks..."
        variant="outlined"
        value={query}
        onChange={handleSearch}
        fullWidth
      />
    </Box>
  );
};

export default TodoSearch;
