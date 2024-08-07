import React from "react";
import useSidebarStore from "../../stores/sidebarStore";

const SearchBar = () => {
  const { categoriesSearchQuery, setCategoriesSearchQuery } = useSidebarStore(
    (state) => state
  );
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search options..."
        value={categoriesSearchQuery}
        onChange={(e) => {
          e.preventDefault();
          setCategoriesSearchQuery(e.currentTarget.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
