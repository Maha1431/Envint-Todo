import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, deleteTodo, updateTodo } from '../redux/slices/todoSlices';
import TodoSearch from './TodoSearch';
import { Box, List, ListItem, Typography, Paper, Button, Stack, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  const { token } = useSelector((state) => state.auth);
  const [filteredTodos, setFilteredTodos] = useState([]);
  
  // State for managing the edit dialog
  const [editTodo, setEditTodo] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  useEffect(() => {
    if (token) {
      dispatch(fetchTodos(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  const handleSearch = (query) => {
    setFilteredTodos(
      todos.filter((todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdateClick = (todo) => {
    // Open the dialog and pre-fill the data
    setEditTodo(todo);
    setUpdatedTitle(todo.title);
    setUpdatedDescription(todo.description);
  };

  const handleUpdate = () => {
    const updatedData = {
      ...editTodo,
      title: updatedTitle,
      description: updatedDescription,
    };
    dispatch(updateTodo({ id: editTodo._id, updatedTodo: updatedData }));
    setEditTodo(null); // Close the dialog
  };

  const handleCloseDialog = () => {
    setEditTodo(null); // Close the dialog without saving
  };

  return (
    <Box sx={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <TodoSearch onSearch={handleSearch} />
      <Paper sx={{ padding: '1rem' }}>
        <List>
          {filteredTodos.map((todo) => (
            <ListItem key={todo._id} sx={{ borderBottom: '1px solid #ccc', padding: '1rem 0' }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {todo.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {todo.description}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ marginTop: '1rem' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateClick(todo)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Update Todo Dialog */}
      <Dialog open={Boolean(editTodo)} onClose={handleCloseDialog}>
        <DialogTitle>Update Todo</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TodoList;
