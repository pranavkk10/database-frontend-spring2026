import "../css/CardDetails.css";

function MiniCard({ card }) {
    return (
      <article className="mini-card">
        <img src={card.img} alt={card.name} />
        <div className="mini-card-body">
          <h3>{card.name}</h3>
          <p>{card.year} {card.brand}</p>
          <strong>${Number(card.price).toLocaleString()}</strong>
        </div>
      </article>
    );
  }
  
  export default MiniCard;