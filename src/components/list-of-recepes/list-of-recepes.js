import React from "react";
import SearchPanel from "../search-panel/search-panel";
import "./list-of-recepes.scss";

function ListOfRecepes({
  recipesStore,
  showRecipe,
  searchRecipe,
  chosenRecipe,
}) {
  const recipes = recipesStore.map((recipe, ind) => {
    const { name: recipeLabel } = chosenRecipe;
    const { name } = recipe;
    return (
      <li
        onClick={(e) => showRecipe(e.target.innerHTML, recipesStore)}
        key={ind}
        className={recipeLabel === name ? "highlight" : null}
      >
        {recipe.name}
      </li>
    );
  });

  return (
    <div className="list-of-recepes">
      <div className="sub-header">
        <h2 id="list-of-recepes-header">List of recipes</h2>
        <SearchPanel searchRecipe={searchRecipe} />
      </div>
      <ul className="list-of-recepes-ul">{recipes}</ul>
    </div>
  );
}

export default ListOfRecepes;
