//  eslint-disable
import React, { useEffect } from "react";
import "./index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./sass/main.scss";

// pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Post from "./pages/Post/Post";
import AddPost from "./pages/EditPost/AddPost/AddPost";
import EditPost from "./pages/EditPost/EditPost/EditPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post" element={<AddPost />} />
        <Route path="/add" element={<AddPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
