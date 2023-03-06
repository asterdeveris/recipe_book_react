import React, { useState, useEffect } from "react";
import "./app.css";
import ListOfRecepes from "../list-of-recepes/list-of-recepes";
import Header from "../header/header";
import RecipeDetails from "../recipe-details/recipe-detaills";
import { getLocalStorage, setLocalStorage } from "../../services/service";

function App() {
  const [chosenRecipe, setChosenRecipe] = useState({});
  const [recipesStore, setRecipesStore] = useState(getLocalStorage());
  const [chosenRecipeInd, setChosenRecipeInd] = useState(null);

  useEffect(() => {
    setChosenRecipe(recipesStore.length > 0 ? recipesStore[0] : {});
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

  const searchRecipe = (search) => {
    const recipe = recipesStore.find((el) =>
      el.name.toLowerCase().includes(search.toLowerCase())
    );
    if (recipe) {
      setChosenRecipe(recipe);
    }
  };

  return (
    <div className="app">
      <Header />
      <ListOfRecepes
        recipesStore={recipesStore}
        showRecipe={showRecipe}
        searchRecipe={searchRecipe}
        chosenRecipe={chosenRecipe}
      />
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
