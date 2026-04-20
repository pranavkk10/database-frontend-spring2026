import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import "../css/AddEditCards.css";

const API_BASE = "https://demo-backend-nm5x.onrender.com";

export default function AddEditCards({ cards, setCards }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: "",
    year: "",
    sport: "",
    brand: "",
    card_number: "",
    grade: "",
    price: "",
    description: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!isEditing) return;

    const existingCard = cards?.find((card) => String(card._id) === String(id));

    if (existingCard) {
      setFormData({
        name: existingCard.name || "",
        year: existingCard.year || "",
        sport: existingCard.sport || "",
        brand: existingCard.brand || "",
        card_number: existingCard.card_number || "",
        grade: existingCard.grade || "",
        price: existingCard.price || "",
        description: existingCard.description || "",
      });
    } else {
      axios
        .get(`${API_BASE}/cards/${id}`)
        .then((res) => {
          const card = res.data;
          setFormData({
            name: card.name || "",
            year: card.year || "",
            sport: card.sport || "",
            brand: card.brand || "",
            card_number: card.card_number || "",
            grade: card.grade || "",
            price: card.price || "",
            description: card.description || "",
          });
        })
        .catch((err) => console.error("Error loading card:", err));
    }
  }, [id, isEditing, cards]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setSelectedFile(file);
  }

  function validate() {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Player name must be at least 2 characters.";
    }

    if (!formData.year || Number(formData.year) < 1800 || Number(formData.year) > 2100) {
      newErrors.year = "Year must be between 1800 and 2100.";
    }

    if (!formData.sport.trim() || formData.sport.trim().length < 2) {
      newErrors.sport = "Sport must be at least 2 characters.";
    }

    if (!formData.brand.trim() || formData.brand.trim().length < 2) {
      newErrors.brand = "Brand must be at least 2 characters.";
    }

    if (!formData.card_number.trim()) {
      newErrors.card_number = "Card number is required.";
    }

    if (!formData.grade.trim()) {
      newErrors.grade = "Grade is required.";
    }

    if (formData.price === "" || Number(formData.price) < 0) {
      newErrors.price = "Estimated value must be 0 or more.";
    }

    if (!formData.description.trim() || formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }

    if (!isEditing && !selectedFile) {
      newErrors.image = "Please choose an image file.";
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    setSuccessMessage("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("year", formData.year);
    submitData.append("sport", formData.sport);
    submitData.append("brand", formData.brand);
    submitData.append("card_number", formData.card_number);
    submitData.append("grade", formData.grade);
    submitData.append("price", formData.price);
    submitData.append("description", formData.description);

    if (selectedFile) {
      submitData.append("image", selectedFile);
    }

    try {
      let response;

      if (isEditing) {
        response = await axios.put(
          `${API_BASE}/cards/${id}`,
          submitData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card._id === response.data.card._id ? response.data.card : card
            )
          );

          setSuccessMessage("Card updated successfully!");

          setTimeout(() => {
            navigate("/card-database");
          }, 1000);
        }
      } else {
        response = await axios.post(
          `${API_BASE}/cards`,
          submitData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          setCards((prevCards) => [...prevCards, response.data.card]);
          setSuccessMessage("Card added successfully!");

          setFormData({
            name: "",
            year: "",
            sport: "",
            brand: "",
            card_number: "",
            grade: "",
            price: "",
            description: "",
          });

          setSelectedFile(null);
          setErrors({});
          e.target.reset();
        }
      }
    } catch (error) {
      console.error("Error saving card:", error);

      if (error.response?.data?.errors) {
        setErrors({ server: error.response.data.errors.join(" ") });
      } else if (error.response?.data?.message) {
        setErrors({ server: error.response.data.message });
      } else {
        setErrors({ server: "Something went wrong while saving the card." });
      }
    }
  }

  return (
    <div className="add-edit-cards-page">
      <main className="content">
        <h2>{isEditing ? "Edit Card" : "+ Add New Card"}</h2>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errors.server && <p className="error-message">{errors.server}</p>}

        <section className="form-card" aria-label="card form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Player Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="field-error">{errors.name}</p>}

            <div className="two-col">
              <div>
                <label htmlFor="year">Year *</label>
                <input
                  id="year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleChange}
                />
                {errors.year && <p className="field-error">{errors.year}</p>}
              </div>

              <div>
                <label htmlFor="sport">Sport *</label>
                <input
                  id="sport"
                  name="sport"
                  type="text"
                  value={formData.sport}
                  onChange={handleChange}
                />
                {errors.sport && <p className="field-error">{errors.sport}</p>}
              </div>
            </div>

            <div className="two-col">
              <div>
                <label htmlFor="brand">Brand *</label>
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  value={formData.brand}
                  onChange={handleChange}
                />
                {errors.brand && <p className="field-error">{errors.brand}</p>}
              </div>

              <div>
                <label htmlFor="card_number">Card Number *</label>
                <input
                  id="card_number"
                  name="card_number"
                  type="text"
                  value={formData.card_number}
                  onChange={handleChange}
                />
                {errors.card_number && <p className="field-error">{errors.card_number}</p>}
              </div>
            </div>

            <div className="two-col">
              <div>
                <label htmlFor="grade">Grade *</label>
                <input
                  id="grade"
                  name="grade"
                  type="text"
                  value={formData.grade}
                  onChange={handleChange}
                />
                {errors.grade && <p className="field-error">{errors.grade}</p>}
              </div>

              <div>
                <label htmlFor="price">Estimated Value *</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                />
                {errors.price && <p className="field-error">{errors.price}</p>}
              </div>
            </div>

            <label htmlFor="image">{isEditing ? "Replace Image" : "Image File *"}</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {errors.image && <p className="field-error">{errors.image}</p>}

            <label htmlFor="description">Description *</label>
            <input
              id="description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <p className="field-error">{errors.description}</p>}

            <div className="actions">
              <button className="btn btn-primary" type="submit">
                {isEditing ? "Save Changes" : "Add Card"}
              </button>

              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate("/card-database")}
              >
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