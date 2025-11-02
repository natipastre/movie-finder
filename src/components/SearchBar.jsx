import { useState } from "react";

function SearchBar({ query, setQuery, onSearch }) {
  const [focused, setFocused] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Digite o nome do filme ou série..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={focused ? "focused" : ""}
      />
      <button onClick={onSearch}>Buscar</button>
    </div>
  );
}

export default SearchBar;
