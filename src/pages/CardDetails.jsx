import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";

import CardDetailMain from "../components/CardDetailMain";
import MiniCard from "../components/MiniCard";
import Footer from "../components/Footer";
import "../css/CardDetails.css";

const API_BASE = "https://demo-backend-nm5x.onrender.com";

function CardDetails() {
  const { id } = useParams();
  const location = useLocation();

  const [selectedCard, setSelectedCard] = useState(null);
  const [allCards, setAllCards] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [singleRes, allRes] = await Promise.all([
          axios.get(`${API_BASE}/cards/${id}`),
          axios.get(`${API_BASE}/cards`)
        ]);

        setSelectedCard(singleRes.data);
        setAllCards(allRes.data);
        localStorage.setItem("lastCardId", id);
      } catch (err) {
        console.error("Error fetching card data:", err);
      }
    }

    if (id) {
      loadData();
    }
  }, [id, location.key]);

  if (!selectedCard) {
    return (
      <div className="card-details-page">
        <main className="container page-content">
          <Link to="/card-database" className="back-link">
            ← Back
          </Link>
          <p>Loading card details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedMainCard = {
    ...selectedCard,
    img: `${API_BASE}/${selectedCard.img_name}`,
    cardNumber: selectedCard.card_number,
  };

  const moreCards = allCards
    .filter((card) => String(card._id) !== String(selectedCard._id))
    .filter((card) => card.sport === selectedCard.sport)
    .map((card) => ({
      ...card,
      img: `${API_BASE}/${card.img_name}`,
      cardNumber: card.card_number,
    }));

  return (
    <div className="card-details-page">
      <main className="container page-content">
        <Link to="/card-database" className="back-link">
          ← Back
        </Link>

        <CardDetailMain card={formattedMainCard} />

        <section className="more-cards">
          <h2>More {selectedCard.sport} Cards</h2>

          <div className="cards-row">
            {moreCards.map((card) => (
              <Link
                key={card._id}
                to={`/card/${card._id}`}
                className="mini-card-link"
                onClick={() => localStorage.setItem("lastCardId", card._id)}
              >
                <MiniCard card={card} />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default CardDetails;