import React, { useState } from "react";
import "./recipe-details.css";
import Form from "../form/form";

export default function RecipeDetails({ chosenRecipe }) {
  const [openForm, setOpenForm] = useState(false);
  let ingridients;
  let directions;
  if (chosenRecipe.length === 0) {
    ingridients = "";
    directions = "";
  } else {
    ingridients = chosenRecipe.ingridients.map((ingridient, ind) => {
      return <li key={ind}>{ingridient}</li>;
    });
    directions = chosenRecipe.directions.map((direction, ind) => {
      return <li key={ind}>{direction}</li>;
    });
  }

  return (
    <div className="recipe">
      <div className="recipe-header">
        <h2 className="recipe-header-h">{chosenRecipe.name}</h2>
        <div className="buttons">
          <button id="delete">
            <i className="fa-regular fa-trash-can"></i>
          </button>
          <button id="edit">
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
          <button id="add" onClick={() => setOpenForm(true)}>
            <i className="fa-regular fa-square-plus"></i>
          </button>
        </div>
      </div>
      <div className="recipe-directions">
        <h3 className="sub-header">Ingridients:</h3>
        <ul className="recipe-ingridients-list">{ingridients}</ul>
        <h3 className="sub-header">Directions:</h3>
        <ol type="1" className="recipe-directions-list">
          {directions}
        </ol>
      </div>
      <Form isOpen={openForm} />
    </div>
  );
}
