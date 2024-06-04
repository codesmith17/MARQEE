// components/BookList.jsx
import React from "react";

const BookList = ({ books, onAddToBookshelf }) => {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.key}>
          <h3>{book.title}</h3>
          <p>{book.author_name?.join(", ")}</p>
          <button onClick={() => onAddToBookshelf(book)}>
            Add to Bookshelf
          </button>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
