const setLocalStorage = (arr) => {
  localStorage.setItem("recipesStore", JSON.stringify(arr));
};

const getLocalStorage = () => {
  const recipesStorage = JSON.parse(localStorage.getItem("recipesStore")) || [];
  return recipesStorage;
};

export { setLocalStorage, getLocalStorage };
