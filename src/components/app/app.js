import React, { useState, useEffect } from "react";
import "./app.css";
import ListOfRecepes from "../list-of-recepes/list-of-recepes";
import Header from "../header/header";
import RecipeDetails from "../recipe-details/recipe-detaills";
import { getLocalStorage, setLocalStorage } from "../../services/service";

function App() {
  const [chosenRecipe, setChosenRecipe] = useState({});
  const [recipesStore, setRecipesStore] = useState([]);
  const [chosenRecipeInd, setChosenRecipeInd] = useState(null);

  useEffect(() => {
    const recipes = getLocalStorage();
    if (recipes) {
      setRecipesStore(recipes);
    }
  }, []);

  useEffect(() => {
    setLocalStorage(recipesStore);
  }, [recipesStore]);

  const showRecipe = (recipeName, arrForSearch) => {
    console.log(arrForSearch);
    const recipe = arrForSearch.find((el) => el.name === recipeName);
    const ind = arrForSearch.findIndex((el) => el.name === recipeName);
    setChosenRecipe(recipe);
    setChosenRecipeInd(ind);
    console.log("work");
  };

  const addNewRecipe = (newStore, recipeName) => {
    setRecipesStore(newStore);
    showRecipe(recipeName, newStore);
    // showRecipe(recipeName);
  };

  return (
    <div className="app">
      <Header />
      <ListOfRecepes recipesStore={recipesStore} showRecipe={showRecipe} />
      <RecipeDetails
        chosenRecipe={chosenRecipe}
        chosenRecipeInd={chosenRecipeInd}
        recipesStore={recipesStore}
        addNewRecipe={addNewRecipe}
      />
    </div>
  );
}

export default App;
