import React, { useState } from "react";
import "./search-panel.scss";

const SearchPanel = ({ searchRecipe }) => {
  const [search, setSearch] = useState("");

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    searchRecipe(search);
  };

  return (
    <>
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        className="search-panel"
        value={search}
        onChange={onSearchChange}
      />
    </>
  );
};

export default SearchPanel;
