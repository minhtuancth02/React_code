import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages/index';

// const BrowserRouter = import("react-router-dom").BrowserRouter;

function App() {
	return (
    <AuthWrapper>
      <BrowserRouter>
        <Routes>
          <PrivateRoute path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;
