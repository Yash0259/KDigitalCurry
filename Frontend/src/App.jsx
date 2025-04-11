import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import LoginPage from './Pages/LoginPage';
import NewUser from './Pages/NewUser';
import AdminPage from './Pages/AdminPage';
import UserPage from './Pages/UserPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/newuser" element={<NewUser/>}/>
      <Route path="/adminpage" element={<AdminPage/>}/>
      <Route path="/userpage" element={<UserPage/>}/>
    </Routes>
  )
}

export default App
