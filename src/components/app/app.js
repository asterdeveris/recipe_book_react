import React, { useState, useEffect } from "react";
import "./app.css";
import ListOfRecepes from "../list-of-recepes/list-of-recepes";
import Header from "../header/header";
import RecipeDetails from "../recipe-details/recipe-detaills";
import { getLocalStorage, setLocalStorage } from "../../services/service";

function App() {
  const [chosenRecipe, setChosenRecipe] = useState({});
  const [recipesStore, setRecipesStore] = useState([
    {
      name: "Artichoke Dip",
      directions: [
        "Soften the cream cheese before mixing.",
        "Soften the cream cheese before mixing.",
        "Rinse well, then dice the artichokes into small ½” size pieces.",
        "Into a mixing bowl place the softened cream cheese. Mix in the mayonnaise, sour cream, the Parmesan and Romano cheese, artichokes and garlic.",
        "When the mixture is fairly well blended, spoon into a 9” round glass pie dish.",
        "Set Oven to Bake at 350 degrees.",
        "Place un-covered dish into oven for 20 – 25 minutes until the edges appear slightly golden and mixture is bubbling at the edge.",
        "Remove and sprinkle chopped chives on top and let cool about 5 minutes before serving.",
        "Enjoy!",
      ],
      ingridients: [
        "1 8oz package soft cream cheese",
        "4oz mayonnaise",
        "4oz sour cream",
        "1/4 Cup Fresh Grated Parmesan Cheese",
        "1/4 Cup Fresh Grated Romano Cheese",
        "2 eggs",
        "3/4 Cup dairy sour cream",
        "1 16oz can artichoke hearts",
        "1/4 Cup fresh chopped chives",
        "1 tbs fresh minced garlic",
      ],
    },
  ]);
  const [chosenRecipeInd, setChosenRecipeInd] = useState(null);

  useEffect(() => {
    setChosenRecipe(recipesStore[0]);
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
