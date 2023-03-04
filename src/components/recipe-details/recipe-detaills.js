import React, { useState } from "react";
import Form from "../form/form";
import { Tooltip } from "react-tooltip";
import "./recipe-details.css";

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

  let ingridients;
  let directions;

  if (Object.keys(chosenRecipe).length === 0) {
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

  const onDelete = () => {
    deleteRecipe(chosenRecipeInd);
  };

  return (
    <div className="recipe">
      <div className="recipe-header">
        <h2 className="recipe-header-h">{chosenRecipe.name}</h2>
        <div className="buttons">
          <button id="delete" onClick={onDelete}>
            <i className="fa-regular fa-trash-can"></i>
          </button>
          <Tooltip anchorSelect="#delete" place="top" effect="solid">
            Delete
          </Tooltip>
          <button
            id="edit"
            onClick={() => {
              openForm("Edit");
            }}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
          <Tooltip anchorSelect="#edit" place="top" effect="solid">
            Edit
          </Tooltip>
          <button id="add" onClick={() => openForm("Add")}>
            <i className="fa-regular fa-square-plus"></i>
          </button>
          <Tooltip anchorSelect="#add" place="top" effect="solid">
            Add
          </Tooltip>
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
