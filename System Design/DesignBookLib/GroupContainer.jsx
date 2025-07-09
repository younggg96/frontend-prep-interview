import React from 'react';
import BookCard from './BookCard';

const GroupContainer = ({ label, groupData }) => {
  const sorted = [...groupData].sort((a, b) =>
    a.author.lastName.localeCompare(b.author.lastName)
  );
  return (
    <section className="group">
      <h3 className="group__label">{label}</h3>
      <div className="books-container">
        {sorted.map(book => (
          <BookCard
            key={book.id}
            title={book.title}
            author={`${book.author.firstName} ${book.author.lastName}`}
            year={book.year}
          />
        ))}
      </div>
    </section>
  );
};

export default GroupContainer;
