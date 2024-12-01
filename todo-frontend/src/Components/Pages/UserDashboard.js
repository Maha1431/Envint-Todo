// src/pages/UserDashboard.js
import React from 'react';
import TodoForm from '../../Components/Todo/TodoForm';
import TodoList from '../../Components/Todo/TodoList';

const UserDashboard = () => (
  <div>
    <h1>My Tasks</h1>
    <TodoForm />
    <TodoList />
  </div>
);

export default UserDashboard;
