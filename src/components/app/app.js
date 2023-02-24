import React, { useState, useEffect } from "react";
import "./app.css";
import ListOfRecepes from "../list-of-recepes/list-of-recepes";
import Header from "../header/header";
import RecipeDetails from "../recipe-details/recipe-detaills";

function App() {
  const data = [
    {
      name: "Easy Chocolate Pie",
      ingridients: [
        "1 (12 ounce) can evaporated milk",
        "1 (5.9 ounce) package chocolate instant pudding mix",
      ],
      directions: [
        "Pour milk into medium bowl. Add dry pudding mix; beat with wire whisk until well blended and mixture just begins to thicken. Stir in half of the chocolate chips.",
        "Add contents of whipped cream can; stir gently but quickly until well blended. Pour into crust; cover.",
      ],
    },
  ];

  const [chosenRecipe, setChosenRecipe] = useState([]);
  useEffect(() => {
    setChosenRecipe(data.length > 0 ? data[0] : []);
  }, []);

  const showRecipe = (e) => {
    const recipe = data.find((el) => el.name === e.target.innerHTML);
    console.log(e.target.innerHTML);
    setChosenRecipe(recipe);
  };

  return (
    <div className="app">
      <Header />
      <ListOfRecepes data={data} showRecipe={showRecipe} />
      <RecipeDetails chosenRecipe={chosenRecipe} />
    </div>
  );
}

export default App;
