import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import Footer from "../components/Footer";
import "../css/CardDatabase.css";

const API_BASE = "https://demo-backend-nm5x.onrender.com";

function CardDatabase({ cards, setCards }) {
  const navigate = useNavigate();

  async function handleDelete(cardId) {
    try {
      const response = await axios.delete(`${API_BASE}/cards/${cardId}`);

      if (response.data.success) {
        setCards((prevCards) =>
          prevCards.filter((card) => card._id !== cardId)
        );
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  }

  function handleEdit(cardId) {
    navigate(`/add-edit-cards/${cardId}`);
  }

  return (
    <div id="content" className="card-database-page">
      <main className="container main-content">
        <h1>Card Database</h1>

        <section className="toolbar" aria-label="filters">
          <div className="control search-control">
            <input type="text" placeholder="Search by player, brand, or year..." />
          </div>

          <div className="control filter-control">
            <select>
              <option value="">All sports</option>
              <option>Basketball</option>
              <option>Baseball</option>
              <option>Football</option>
              <option>Hockey</option>
              <option>Soccer</option>
            </select>
          </div>

          <div className="control filter-control">
            <select>
              <option value="">All grades</option>
              <option>PSA 10</option>
              <option>PSA 9</option>
              <option>PSA 8</option>
            </select>
          </div>
        </section>

        <p className="count">
          Showing {cards.length} of {cards.length} cards
        </p>

        <section className="card-grid">
          {cards.map((card) => (
            <div key={card._id} className="card-item">
              <Link
                to={`/card/${card._id}`}
                state={{ card }}
                className="card-link"
                onClick={() => localStorage.setItem("lastCardId", card._id)}
              >
                <Card
                  name={card.name}
                  img={`${API_BASE}/${card.img_name}`}
                  brand={card.brand}
                  year={card.year}
                  cardNumber={card.card_number}
                  sport={card.sport}
                  grade={card.grade}
                  price={card.price}
                  description={card.description}
                />
              </Link>

              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(card._id)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(card._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default CardDatabase;