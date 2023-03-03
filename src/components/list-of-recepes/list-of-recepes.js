import React, { useState } from "react";
import "./list-of-recepes.css";

function ListOfRecepes({ recipesStore, showRecipe }) {
  const recipes = recipesStore.map((recipe, ind) => {
    return (
      <li
        onClick={(e) => showRecipe(e.target.innerHTML, recipesStore)}
        key={ind}
      >
        {recipe.name}
      </li>
    );
  });

  return (
    <div className="list-of-recepes">
      <h2 id="list-of-recepes-header">List of recipes:</h2>
      <ul className="list-of-recepes-ul">{recipes}</ul>
    </div>
  );
}

export default ListOfRecepes;
