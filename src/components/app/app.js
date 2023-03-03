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
    if (recipes.length > 0) {
      setRecipesStore(recipes);
      setChosenRecipe(recipes[0]);
    }
  }, []);

  useEffect(() => {
    setLocalStorage(recipesStore);
  }, [recipesStore]);

  const showRecipe = (recipeName, arrForSearch) => {
    if (recipeName === "") {
      setChosenRecipe({});
      return;
    }
    const recipe = arrForSearch.find((el) => el.name === recipeName);
    const ind = arrForSearch.findIndex((el) => el.name === recipeName);
    setChosenRecipe(recipe);
    setChosenRecipeInd(ind);
  };

  const addNewRecipe = (newStore, recipeName) => {
    setRecipesStore(newStore);
    showRecipe(recipeName, newStore);
  };

  const deleteRecipe = (ind) => {
    const newStore = [
      ...recipesStore.slice(0, ind),
      ...recipesStore.slice(ind + 1),
    ];
    setRecipesStore(newStore);

    const recipeName = newStore.length > 0 ? newStore[0].name : "";
    showRecipe(recipeName, newStore);
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
        deleteRecipe={deleteRecipe}
      />
    </div>
  );
}

export default App;
