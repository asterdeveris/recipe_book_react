import React, { useState } from "react";
import Form from "../form/form";
import tooltipCreator from "../../helpers/tooltips/tooltip";
import "./recipe-details.scss";

export default function RecipeDetails({
  chosenRecipe,
  chosenRecipeInd,
  recipesStore,
  addNewRecipe,
  deleteRecipe,
}) {
  const [formPurpose, setFormPurpose] = useState("");
  const [formOpened, setFormOpened] = useState(false);

  const openForm = (purpose) => {
    setFormPurpose(purpose);
    setFormOpened(true);
  };

  const closeForm = () => {
    setFormOpened(false);
  };

  const onDelete = () => {
    deleteRecipe(chosenRecipeInd);
  };

  const ingridients =
    Object.keys(chosenRecipe).length === 0
      ? ""
      : chosenRecipe.ingridients.map((ingridient, ind) => {
          return <li key={ind}>{ingridient}</li>;
        });

  const directions =
    Object.keys(chosenRecipe).length === 0
      ? ""
      : chosenRecipe.directions.map((direction, ind) => {
          return <li key={ind}>{direction}</li>;
        });

  return (
    <div className="recipe">
      <div className="recipe-header">
        <h2 className="recipe-header-h">{chosenRecipe.name}</h2>
        <div className="buttons">
          <button id="delete" onClick={onDelete}>
            <i className="fa-regular fa-trash-can"></i>
          </button>
          {tooltipCreator("Delete", "#delete")}
          <button
            id="edit"
            disabled={recipesStore.length < 1 ? true : false}
            onClick={() => {
              openForm("Edit");
            }}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
          {tooltipCreator("Edit", "#edit")}
          <button id="add" onClick={() => openForm("Add")}>
            <i className="fa-regular fa-square-plus"></i>
          </button>
          {tooltipCreator("Add", "#add")}
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
      <Form
        isOpen={formOpened}
        purpose={formPurpose}
        chosenRecipe={chosenRecipe}
        closeForm={closeForm}
        chosenRecipeInd={chosenRecipeInd}
        recipesStore={recipesStore}
        addNewRecipe={addNewRecipe}
      />
    </div>
  );
}
