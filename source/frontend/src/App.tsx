import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import LoginPage from "./pages/LoginPage";
import VerifyOtp from "./pages/VerifyOtp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news/:id" element={<NewsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verifyotp" element={<VerifyOtp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
