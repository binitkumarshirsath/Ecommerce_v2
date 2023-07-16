import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

export function SearchContextProvider({ children }) {
  const [query, setQuery] = useState({
    keywords : '',
    result : []
  });

  return (
    <SearchContext.Provider value={[query, setQuery]}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
