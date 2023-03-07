import React, { useState, useEffect } from "react";
import "./app.scss";
import ListOfRecepes from "../list-of-recepes/list-of-recepes";
import Header from "../header/header";
import RecipeDetails from "../recipe-details/recipe-detaills";
import { getLocalStorage, setLocalStorage } from "../../services/service";

function App() {
  const [chosenRecipe, setChosenRecipe] = useState({});
  const [recipesStore, setRecipesStore] = useState(getLocalStorage());
  const [chosenRecipeInd, setChosenRecipeInd] = useState(null);

  useEffect(() => {
    const recipes = getLocalStorage();
    const defaultRecipes = [
      {
        name: "Cheese Pancakes with Apple (Syrniki)",
        ingridients: [
          "recipe from https://natashaskitchen.com/",
          "2 cups farmers cheese, homemade or store-bought",
          "4 large eggs",
          "3/4 cups all-purpose flour + 1/2 cup for dredging",
          "3 Tbsp granulated sugar",
          "1/2 tsp salt",
          "1/2 tsp cinnamon",
          "1 tsp baking soda",
          "1 tsp white vinegar",
          "1 medium apple (any variety), peeled, cored and finely diced (about 1 1/2 cups)",
          "Light olive oil, canola or vegetable oil, to sautee",
        ],
        directions: [
          " In a large bowl combine 2 cups farmers cheese, 4 eggs, 3/4 cup flour, 3 Tbsp sugar, 1/2 tsp salt and 1/2 tsp cinnamon. Use an electric hand mixer on medium speed and mix just until well blended.",
          "Place 1 tsp baking soda into a small ramekin and add 1 tsp vinegar then stir to combine. It should fizz. Pour this mixture into the batter and mix until well blended. Use a spatula to fold in diced apples. The mixture will thicken slightly as it stands.",
          "Heat a large non-stick pan (this Zwilling pan is the best one I’ve ever tried) over medium/low heat and add 2 to 3 Tbsp oil.",
          "Fill a shallow bowl with 1/2 cup flour. Add batter a heaping tablespoon at a time (I used a flat ice cream scoop with trigger). Sprinkle flour generously over the top then gently lift pancake and pat from one hand to another to remove excess flour.",
          "Saute in hot oil over med/low heat about 3 min per side. Flip when starting to form tiny bubbles on top. Transfer to a platter and serve warm with your favorite topping such as jam and sour cream!",
        ],
      },
    ];
    if (recipes.length > 0 && recipes !== undefined) {
      setRecipesStore(recipes);
      setChosenRecipe(recipesStore[0]);
    } else {
      setRecipesStore(defaultRecipes);
      setChosenRecipe(defaultRecipes[0]);
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
    if (
      window.confirm(
        "Are your sure you want to delete this recipe from Recipe book?"
      ) === true
    ) {
      const newStore = [
        ...recipesStore.slice(0, ind),
        ...recipesStore.slice(ind + 1),
      ];
      setRecipesStore(newStore);

      const recipeName = newStore.length > 0 ? newStore[0].name : "";
      showRecipe(recipeName, newStore);
    }
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
