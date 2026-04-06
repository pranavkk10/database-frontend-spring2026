import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import CardDetailMain from "../components/CardDetailMain";
import MiniCard from "../components/MiniCard";
import Footer from "../components/Footer";
import "../css/CardDetails.css";

function CardDetails() {
  const params = useParams();
const id = params.id || localStorage.getItem("lastCardId") || 1;
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [singleRes, allRes] = await Promise.all([
          axios.get(`https://demo-backend-nm5x.onrender.com/cards/${id}`),
          axios.get("https://demo-backend-nm5x.onrender.com/cards"),
        ]);

        setSelectedCard(singleRes.data);
        setCards(allRes.data);
      } catch (err) {
        console.error("Error fetching card data:", err);
      }
    }

    loadData();
  }, [id]);

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
    img: `https://demo-backend-nm5x.onrender.com/${selectedCard.img_name}`,
    cardNumber: selectedCard.card_number,
  };

  const moreCards = cards
    .filter((card) => card._id !== selectedCard._id)
    .filter((card) => card.sport === selectedCard.sport)
    .map((card) => ({
      ...card,
      img: `https://demo-backend-nm5x.onrender.com/${card.img_name}`,
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