//  eslint-disable
import React from "react";
import "./index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./sass/main.scss";

// components
import Navbar from "./components/Navbar/Navbar";

// pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Ouath from "./pages/Auth/Oauth2/Ouath2";
import Post from "./pages/Post/Post";
import AddPost from "./pages/EditPost/AddPost/AddPost";
import EditPost from "./pages/EditPost/EditPost/EditPost";
import Search from "./pages/Search/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth/kakao/callback" element={<Ouath />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/add" element={<AddPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
