import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


import Signup from './pages/Signup'
import Login from "./pages/Login";
import axios from "axios";
export default function App() {


  return (
    <div className="container-fluid">
      <Signup />
      <Login />
    </div>
  )
}


