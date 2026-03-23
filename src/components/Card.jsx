import "../css/Card.css";

function Card({ name, img, brand, year, cardNumber, sport, grade, price, description }) {
  return (
    <article className="card">
      <img src={img} alt={name} />
      <div className="card-body">
        <h2>{name}</h2>
        <p className="meta">
          {brand} {year} {cardNumber}
        </p>

        <div className="tags">
          <span className="tag sport">{sport}</span>
          <span className="tag grade">{grade}</span>
        </div>

        <p className="price">${price.toLocaleString()}</p>
        <p className="description">{description}</p>
      </div>
    </article>
  );
}

export default Card;