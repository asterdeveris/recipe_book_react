const setLocalStorage = (arr) => {
  const recepesStore = localStorage.setItem("recipeStore", JSON.stringify(arr));
  return recepesStore;
};

const getLocalStorage = () => {
  const recipesStore = JSON.parse(localStorage.getItem("recipeStore")) || [];
  return recipesStore;
};

export { setLocalStorage, getLocalStorage };
