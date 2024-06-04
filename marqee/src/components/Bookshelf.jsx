import React from "react";
import { Link } from "react-router-dom";
import "./Bookshelf.css";

const Bookshelf = ({ books }) => {
  return (
    <div className="bookshelf">
      <h2>Your Bookshelf</h2>
      {books.length === 0 ? (
        <p>No books in your bookshelf.</p>
      ) : (
        <ul className="bookshelf-list">
          {books.map((book) => (
            <li key={book.key} className="bookshelf-item">
              <Link to={`/book/works/${book.key}`}>
                <h3 className="book-title">{book.title}</h3>
                {book.author_name && (
                  <p className="book-author">
                    Author: {book.author_name.join(", ")}
                  </p>
                )}
                {book.first_publish_year && (
                  <p className="book-year">
                    First Published: {book.first_publish_year}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookshelf;
