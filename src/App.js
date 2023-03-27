import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route , Navigate  } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  
  return (
    <BrowserRouter>
      <Container maxWidth= "xl">
        <Navbar />
        <Routes>
        <Route path="/" Component={() => <Navigate replace to="/posts" />} />
        <Route path="/posts" element={ <Home/>} />
        <Route path="/posts/search" element={<Home/>} />
        <Route path="/auth" Component={() => (!user ? <Auth /> : <Navigate replace to="/posts" />)} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
