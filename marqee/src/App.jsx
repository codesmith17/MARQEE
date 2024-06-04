// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import "./App.css";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import LoadingSpinner from "./components/LoadingSpinner";
import BookshelfPage from "./components/BookshelfPage";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookshelf, setBookshelf] = useState(() => {
    return JSON.parse(localStorage.getItem("bookshelf")) || [];
  });

  useEffect(() => {
    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
  }, [bookshelf]);

  const handleSearch = async (searchValue) => {
    setSearchTerm(searchValue);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchValue}&limit=10&page=1`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchResults(data.docs);
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToBookshelf = (book) => {
    if (!bookshelf.some((b) => b.key === book.key)) {
      setBookshelf([...bookshelf, book]);
    }
  };

  const removeFromBookshelf = (book) => {
    setBookshelf(bookshelf.filter((b) => b.key !== book.key));
  };

  const RenderContent = () => {
    const location = useLocation();

    if (location.pathname === "/bookshelf") {
      return (
        <BookshelfPage
          books={bookshelf}
          onRemoveFromBookshelf={removeFromBookshelf}
        />
      );
    }

    return (
      <>
        {isLoading && <LoadingSpinner />}
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => setError(null)}>Try Again</button>
          </div>
        )}
        {!isLoading && !error && searchResults.length === 0 && (
          <p className="no-results">No results found</p>
        )}
        {!isLoading && !error && searchResults.length > 0 && (
          <BookList books={searchResults} onAddToBookshelf={addToBookshelf} />
        )}
      </>
    );
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Book Search</h1>
          <SearchBar onSearch={handleSearch} />
          <Link to="/">
            <button className="nav-button">Home</button>
          </Link>
          <Link to="/bookshelf">
            <button className="nav-button">Go to Bookshelf</button>
          </Link>
        </header>
        <main className="results-container">
          <RenderContent />
        </main>
      </div>
    </Router>
  );
};

export default App;
