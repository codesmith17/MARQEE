import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BookDetails.css";

const BookDetails = () => {
  const { bookKey } = useParams();
  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const detailsResponse = await fetch(
          `https://openlibrary.org/works/${bookKey}.json`
        );
        if (!detailsResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const detailsData = await detailsResponse.json();
        setBookData(detailsData);
      } catch (error) {
        setError("Error fetching book details. Please try again later.");
        console.error("Error fetching book details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookData();
  }, [bookKey]);

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!bookData) {
    return null;
  }

  return (
    <div className="book-details">
      <h2>{bookData.title}</h2>
      {bookData.authors && (
        <p>
          Authors: {bookData.authors.map((author) => author.name).join(", ")}
        </p>
      )}
      {bookData.first_publish_year && (
        <p>First published: {bookData.first_publish_year}</p>
      )}
      {bookData.description && (
        <p>
          Description:{" "}
          {typeof bookData.description === "string"
            ? bookData.description
            : bookData.description.value}
        </p>
      )}
    </div>
  );
};

export default BookDetails;
