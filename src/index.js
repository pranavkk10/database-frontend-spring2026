import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import Layout from './Layout';
import Home from './pages/Homepage';
import CardDatabase from './pages/CardDatabase';
import CardDetails from "./pages/CardDetails";
import AddEditCards from "./pages/AddEditCards";
import About from './pages/AboutAndContact';

const API_BASE = "https://demo-backend-nm5x.onrender.com";

const CardDetailsGate = () => {
  const lastId = localStorage.getItem("lastCardId");

  if (!lastId) {
    return <Navigate to="/card-database" replace />;
  }

  return <Navigate to={`/card/${lastId}`} replace />;
};

const App = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/cards`)
      .then((res) => setCards(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-contact" element={<About />} />
          <Route
            path="card-database"
            element={<CardDatabase cards={cards} setCards={setCards} />}
          />
          <Route path="card-details" element={<CardDetailsGate />} />
          <Route path="card/:id" element={<CardDetails cards={cards} setCards={setCards} />} />
          <Route
            path="add-edit-cards"
            element={<AddEditCards cards={cards} setCards={setCards} />}
          />
          <Route
            path="add-edit-cards/:id"
            element={<AddEditCards cards={cards} setCards={setCards} />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);