import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from '../pages/Home.jsx';
import { SignUp } from '../pages/SignUp.jsx';
import { Login } from '../pages/Login.jsx';
import { ReviewList } from '../pages/ReviewList.jsx';

export const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/reviewlist" element={<ReviewList />} />
      </Routes>
    </BrowserRouter>
  );
};
