import Footer from "../components/Footer";
import "../css/AddEditCards.css";

export default function AddEditCards() {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;

    const data = {
      player: form.player.value,
      year: form.year.value,
      sport: form.sport.value,
      brand: form.brand.value,
      cardNumber: form.cardNumber.value,
      grade: form.grade.value,
      value: form.value.value,
      image: form.image.value,
    };

    console.log("Submitted card:", data);
    form.reset();
  }

  return (
    <div className="add-edit-cards-page">

      <main className="content">
        <h2>+ Add New Card</h2>

        <section className="form-card" aria-label="Add new card form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="player">Player Name *</label>
            <input id="player" name="player" type="text" required />

            <div className="two-col">
              <div>
                <label htmlFor="year">Year *</label>
                <input id="year" name="year" type="number" required />
              </div>

              <div>
                <label htmlFor="sport">Sport *</label>
                <input id="sport" name="sport" type="text" required />
              </div>
            </div>

            <div className="two-col">
              <div>
                <label htmlFor="brand">Brand *</label>
                <input id="brand" name="brand" type="text" required />
              </div>

              <div>
                <label htmlFor="cardNumber">Card Number *</label>
                <input id="cardNumber" name="cardNumber" type="text" required />
              </div>
            </div>

            <div className="two-col">
              <div>
                <label htmlFor="grade">Grade</label>
                <input id="grade" name="grade" type="text" />
              </div>

              <div>
                <label htmlFor="value">Estimated Value *</label>
                <input id="value" name="value" type="number" required />
              </div>
            </div>

            <label htmlFor="image">Image URL *</label>
            <input id="image" name="image" type="url" required />

            <div className="actions">
              <button className="btn btn-primary" type="submit">
                💾 Add Card
              </button>
              <button className="btn btn-secondary" type="reset">
                Cancel
              </button>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}