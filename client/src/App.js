import React from 'react'
import './app.css';
import Register from './components/Register';
import {isAuth} from './helpers/auth';

function App() {
  console.log('Auth',isAuth(),isAuth);
  return (
    // <Dashboard/>
    <Register/>
  )
}

export default App
