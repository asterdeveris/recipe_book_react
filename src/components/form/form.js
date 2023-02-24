import React, { useState } from "react";
import "./form.css";

export default function Form({ isOpen = false }) {
  const isHide = isOpen ? "form" : "form hide";
  return (
    <form className={isHide}>
      <div className="form-header">
        <h2>Recipe</h2>
        <div className="close-button">
          <label htmlFor="close">
            <i className="fa-solid fa-xmark"></i>
          </label>
          <input type="button" id="close" />
        </div>
      </div>

      <label htmlFor="recipe-name">Recipe name</label>
      <input
        type="text"
        id="recipe-name"
        name="recipe-name"
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
        <input type="submit" value="Add" />
        <input type="reset" value="Clean" />
      </div>
    </form>
  );
}
