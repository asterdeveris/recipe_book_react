import React, { useEffect, useState } from "react";
import "./form.css";

export default function Form({
  isOpen,
  purpose,
  chosenRecipe,
  closeForm,
  chosenRecipeInd,
  recipesStore,
  addNewRecipe,
}) {
  let isHide = isOpen ? "form" : "form hide";
  const { name, ingridients, directions } = chosenRecipe;

  const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    let newStorage;

    const newRecipe = {
      name: payload.name,
      ingridients: payload.ingridients.trim().split("\n"),
      directions: payload.directions.trim().split("\n"),
    };

    if (purpose === "Edit") {
      newStorage = [
        ...recipesStore.slice(0, chosenRecipeInd),
        newRecipe,
        ...recipesStore.slice(chosenRecipeInd + 1),
      ];
    } else if (purpose === "Add") {
      newStorage = [...recipesStore, newRecipe];
    }

    addNewRecipe(newStorage, newRecipe.name);
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
        defaultValue={purpose === "Edit" ? name : ""}
      />
      <label htmlFor="ingridients">Ingredients</label>
      <textarea
        id="ingridients"
        name="ingridients"
        rows="4"
        placeholder="Write each ingridient on the separate line"
        required
        defaultValue={purpose === "Edit" ? ingridients.join("\n") : ""}
      ></textarea>
      <label htmlFor="directions">Directions</label>
      <textarea
        id="directions"
        name="directions"
        rows="4"
        placeholder="Write each direction on the separate line"
        required
        defaultValue={purpose === "Edit" ? directions.join("\n") : ""}
      ></textarea>
      <div className="form-buttons">
        <input type="submit" value={purpose} />
        <input type="reset" value="Clean" />
      </div>
    </form>
  );
}
