// src/redux/slices/todoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

// In fetchTodos async thunk
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (token) => {
  console.log('Sending token:', token);  // Add a log to check token value
  try {
    const response = await axios.get('https://todo-backend-6c4q.onrender.com/api/todos', {
      headers: { Authorization: ` ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error.response ? error.response.data : error.message;
  }
});


export const createTodo = createAsyncThunk('todos/createTodo', async (todo, { getState }) => {
  const { token } = getState().auth;
  console.log("Token:", token); // Make sure token exists
  try {
    const response = await axios.post('https://todo-backend-6c4q.onrender.com/api/todos', todo, {
      headers: { Authorization: ` ${token}` },
    });
    console.log("response", response)
    return response.data; // return the created todo
  } catch (error) {
    console.error("Error creating todo:", error.message); // log error
    throw error.response ? error.response.data : error.message;
  }
});

// Update an existing todo (PUT)
export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, updatedTodo }, { getState }) => {
    const { token } = getState().auth;
    try {
      const response = await axios.put(`https://todo-backend-6c4q.onrender.com/api/todos/${id}`, updatedTodo, {
        headers: { Authorization: ` ${token}` },
      });
      return response.data; // returns the updated todo
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);

// Delete a todo (DELETE)
export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id, { getState }) => {
    const { token } = getState().auth;
    try {
      await axios.delete(`https://todo-backend-6c4q.onrender.com/api/todos/${id}`, {
        headers: { Authorization: ` ${token}` },
      });
      return id; // returns the id of the deleted todo
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload; // set the todos
        state.error = null; // clear any previous error
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // capture error message
      })

      // Create a new todo
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload); // add the new todo
        state.error = null; // clear any previous error
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.error = action.error.message; // capture error message
      })

      // Update an existing todo
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo._id === action.payload._id);
        if (index !== -1) {
          state.todos[index] = action.payload; // update the todo
        }
        state.error = null; // clear any previous error
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.error.message; // capture error message
      })

      // Delete a todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload); // remove the deleted todo
        state.error = null; // clear any previous error
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.error.message; // capture error message
      });
  },
});

export default todoSlice.reducer;
