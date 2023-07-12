import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Create from "../components/Create";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addressbooks/create" element={<Create />} />
    </Routes>
  </Router>
);