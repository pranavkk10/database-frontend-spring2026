import Card from "../components/Card";
import Footer from "../components/Footer";
import "../css/CardDatabase.css";
import { Link } from "react-router-dom";

function CardDatabase({ cards }) {
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

        <p className="count">Showing {cards.length} of {cards.length} cards</p>

        <section className="card-grid">
          {cards.map((card) => (
            <Link
              key={card._id}
              to={`/card/${card._id}`}
              state={{ card }}
              className="card-link"
              onClick={() => localStorage.setItem("lastCardId", card._id)}
            >
              <Card
                name={card.name}
                img={`https://demo-backend-nm5x.onrender.com/${card.img_name}`}
                brand={card.brand}
                year={card.year}
                cardNumber={card.card_number}
                sport={card.sport}
                grade={card.grade}
                price={card.price}
                description={card.description}
              />
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default CardDatabase;