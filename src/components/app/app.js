import React, { useState, useEffect } from "react";
import "./app.css";
import ListOfRecepes from "../list-of-recepes/list-of-recepes";
import Header from "../header/header";
import RecipeDetails from "../recipe-details/recipe-detaills";
import { getLocalStorage } from "../../services/service";
import Form from "../form/form";

function App() {
  // const [recipesStore, setRecipesStore] = useState([]);
  const [chosenRecipe, setChosenRecipe] = useState([]);
  const [recipesStore, setRecipesStore] = useState([]);

  useEffect(() => {
    setRecipesStore(getLocalStorage());
  }, []);

  const showRecipe = (e) => {
    const recipe = recipesStore.find((el) => el.name === e.target.innerHTML);
    setChosenRecipe(recipe);
  };

  return (
    <div className="app">
      <Header />
      <ListOfRecepes recipesStore={recipesStore} showRecipe={showRecipe} />
      <RecipeDetails chosenRecipe={chosenRecipe} />
    </div>
  );
}

export default App;
