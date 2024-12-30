import React from 'react'
import Navbar from "../src/components/Navbar";
import Home from '../src/components/Home'
import Login from './pages/Login';
import Register from './pages/register';
import Profile from './pages/profile';
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from './context/AuthProvider';
//import { Toaster } from "react-hot-toast";
function App() {
  const location = useLocation();
  const hideNavbar = ["/Profile", "/Login", "/Register"].includes(location.pathname);
  const { blogs} = useAuth();
  console.log(blogs)
  return(
    <div>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route
          exact
          path="/"
          element={<Home/>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Profile />} />

       
      </Routes>

    </div>
  )
}

export default App