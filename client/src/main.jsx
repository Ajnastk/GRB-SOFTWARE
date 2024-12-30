

import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/index.css";
import Signup from "./components/admin/Signup.jsx";
import Login from "./components/admin/Login.jsx";
 import Rating from "./components/user/Rating.jsx";
import AdminPage from "./components/admin/AdminPage.jsx" 

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
    <Route path="/review-list" element={ <AdminPage/>}/>
    <Route path="/rating/:adminId" element={<Rating />} />
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login/>} />
    </Routes>
    
  </BrowserRouter>
)

