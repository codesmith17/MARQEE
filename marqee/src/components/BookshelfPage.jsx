// components/BookshelfPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const BookshelfPage = ({ books, onRemoveFromBookshelf }) => {
  return (
    <div className="bookshelf-page">
      <h2>Your Bookshelf</h2>
      <Link to="/">
        <button className="back-button">Back to Search</button>
      </Link>
      {books.length === 0 ? (
        <p>No books in your bookshelf</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.key}>
              <h3>{book.title}</h3>
              <p>{book.author_name?.join(", ")}</p>
              <button onClick={() => onRemoveFromBookshelf(book)}>
                Remove from Bookshelf
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookshelfPage;
