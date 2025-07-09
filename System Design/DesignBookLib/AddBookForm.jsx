import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddBookForm = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [authorFirst, setAuthorFirst] = useState('');
  const [authorLast, setAuthorLast] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !authorFirst.trim() || !authorLast.trim()) return;

    const newBook = {
      id: uuidv4(),
      title: title.trim(),
      author: {
        firstName: authorFirst.trim(),
        lastName: authorLast.trim(),
      },
      year: year ? Number(year) : undefined,
    };

    onAddBook(newBook);
    setTitle('');
    setAuthorFirst('');
    setAuthorLast('');
    setYear('');
  };

  return (
    <form className="add-book-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title*"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        name="authorFirst"
        placeholder="Author First Name*"
        value={authorFirst}
        onChange={(e) => setAuthorFirst(e.target.value)}
      />
      <input
        name="authorLast"
        placeholder="Author Last Name*"
        value={authorLast}
        onChange={(e) => setAuthorLast(e.target.value)}
      />
      <input
        name="year"
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <input type="submit" value="Add new book" />
    </form>
  );
};

export default AddBookForm;
