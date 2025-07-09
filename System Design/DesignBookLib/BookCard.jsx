import React from 'react';

const BookCard = ({ title, author, year }) => (
  <div className="book">
    <h3 className="book__title">{title}</h3>
    <p className="book__author">Author: {author}</p>
    {year != null && <p className="book__year">Year: {year}</p>}
  </div>
);

export default BookCard;
