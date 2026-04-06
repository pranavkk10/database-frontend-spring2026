import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Layout from './Layout';
import Home from './pages/Homepage';
import CardDatabase from './pages/CardDatabase';
import CardDetails from "./pages/CardDetails";
import AddEditCards from "./pages/AddEditCards";
import About from './pages/AboutAndContact';

const CardDetailsGate = () => {
  const lastId = localStorage.getItem("lastCardId") || "1";
  return <Navigate to={`/card/${lastId}`} replace />;
};

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-contact" element={<About />} />
          <Route path="card-database" element={<CardDatabase />} />
          <Route path="card-details" element={<CardDetailsGate />} />
          <Route path="card/:id" element={<CardDetails />} />
          <Route path="add-edit-cards" element={<AddEditCards />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);