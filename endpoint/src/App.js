import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import Card from "./components/Card";
import Index from './pages/Admin/Index'
import Signup from './pages/Signup'
import Login from "./pages/Login";
import Users from "./pages/Users";
import Depts from "./pages/Depts";
import RequestInfo from "./components/RequestInfo";
import axios from "axios";



export default function App() {

  
  return (
    <div className="container-fluid">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/tutors" element={<Card />} />
          <Route path="/req" element={<RequestInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Index/>} />
          <Route path="/users" element={<Users />} />
          <Route path="/depts" element={<Depts />} />
        </Routes>
      </Router>
    </div>
  )
}


