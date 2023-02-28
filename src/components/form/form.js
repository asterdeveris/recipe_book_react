import React, { useEffect, useState } from "react";
import "./form.css";
import { setLocalStorage, getLocalStorage } from "../../services/service";

export default function Form({ isOpen, purpose, chosenRecipe, closeForm }) {
  let isHide = isOpen ? "form" : "form hide";

  const [currentRecipe, setCurrentRecipe] = useState(chosenRecipe);
  const { name, ingridients, directions } = chosenRecipe;

  // if (purpose === "Edit") {
  //   editingIngridients = ingridients.map((ingridient, ind) => {
  //     return <li key={ind}>{ingridient}</li>;
  //   });
  // }

  const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    const newRecipe = {
      name: payload.name,
      ingridients: payload.ingridients.trim().split("\n"),
      directions: payload.directions.trim().split("\n"),
    };

    const prevStorage = getLocalStorage();
    const newStorage = [...prevStorage, newRecipe];
    setLocalStorage(newStorage);
    e.target.reset();
    closeForm();
  };

  return (
    <form className={isHide} onSubmit={submitForm}>
      <div className="form-header">
        <h2>Recipe</h2>
        <div className="close-button" onClick={closeForm}>
          <label htmlFor="close">
            <i className="fa-solid fa-xmark"></i>
          </label>
          <input type="button" id="close" />
        </div>
      </div>

      <label htmlFor="recipe-name">Recipe Name</label>
      <input
        type="text"
        id="recipe-name"
        name="name"
        placeholder="Recipe name"
        required
      />
      <label htmlFor="ingridients">Ingredients</label>
      <textarea
        id="ingridients"
        name="ingridients"
        rows="4"
        placeholder="Write each ingridient on the separate line"
        required
        value={purpose === "Edit" ? ingridients.join("\n") : ""}
      ></textarea>
      <label htmlFor="directions">Directions</label>
      <textarea
        id="directions"
        name="directions"
        rows="4"
        placeholder="Write each direction on the separate line"
        required
      ></textarea>
      <div className="form-buttons">
        <input type="submit" value={purpose} />
        <input type="reset" value="Clean" />
      </div>
    </form>
  );
}
