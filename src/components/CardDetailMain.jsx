import "../css/CardDetails.css";

function CardDetailMain({ card }) {
  return (
    <section className="card-layout">
      <img className="hero-img" src={card.img} alt={card.name} />

      <div className="details-col">
        <div className="title-row">
          <div>
            <h1>{card.name}</h1>
            <p className="meta">{card.year}</p>
            <p className="meta">{card.brand}</p>
          </div>

          <button className="edit-btn">Search for more cards</button>
        </div>

        <div className="value-box">
          <div className="value-label">↗ Estimated Value</div>
          <div className="value-amount">
            ${Number(card.price).toLocaleString()}
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-label">🗓 Year</div>
            <div className="stat-value">{card.year}</div>
          </div>

          <div className="stat-box">
            <div className="stat-label"># Card Number</div>
            <div className="stat-value">{card.cardNumber}</div>
          </div>

          <div className="stat-box">
            <div className="stat-label">⌖ Sport</div>
            <div className="stat-value">{card.sport}</div>
          </div>

          <div className="stat-box">
            <div className="stat-label">⌖ Grade</div>
            <div className="stat-value">{card.grade}</div>
          </div>
        </div>

        <section className="card-details-box">
          <h2>Card Details</h2>

          <div className="row">
            <span>Brand</span>
            <strong>{card.brand}</strong>
          </div>

          <div className="row">
            <span>Player</span>
            <strong>{card.name}</strong>
          </div>

          <div className="row">
            <span>Sport</span>
            <strong>{card.sport}</strong>
          </div>

          <div className="row">
            <span>Year Released</span>
            <strong>{card.year}</strong>
          </div>
        </section>
      </div>
    </section>
  );
}

export default CardDetailMain;