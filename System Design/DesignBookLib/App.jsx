import React, { useState, useEffect } from 'react';
import GroupContainer from './GroupContainer';
import AddBookForm from './AddBookForm';
import SortToggle from './SortToggle';
import './index.scss';

const BOOKS_API = 'https://api-regional.codesignalcontent.com/library-management-system-1/books';
const AUTHORS_API = (id) => \`https://api-regional.codesignalcontent.com/library-management-system-1/authors/\${id}\`;

const App = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [groupByYear, setGroupByYear] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(BOOKS_API);
        if (!res.ok) throw new Error(\`Books fetch failed: \${res.status}\`);
        const list = await res.json();

        const withAuthors = await Promise.all(
          list.map(async (book) => {
            const r = await fetch(AUTHORS_API(book.authorId));
            if (r.status === 404) return null;
            if (!r.ok) throw new Error(r.statusText);
            const author = await r.json();
            return { ...book, author };
          })
        );
        setBooks(withAuthors.filter((b) => b && b.author && b.author.lastName));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleAddBook = (newBook) => {
    setBooks((prev) => [...prev, newBook]);
  };

  if (error) return <p className="error">Error: {error}</p>;
  if (loading) return <p>Loading…</p>;

  const grouped = groupByYear
    ? books.reduce((acc, book) => {
        const key = book.year != null ? String(book.year) : 'None';
        if (!acc[key]) acc[key] = [];
        acc[key].push(book);
        return acc;
      }, {})
    : books.reduce((acc, book) => {
        const letter = book.author.lastName[0].toUpperCase();
        if (!acc[letter]) acc[letter] = [];
        acc[letter].push(book);
        return acc;
      }, {});

  const sortedKeys = Object.keys(grouped).sort((a, b) => {
    if (groupByYear) {
      if (a === 'None') return 1;
      if (b === 'None') return -1;
      return Number(a) - Number(b);
    }
    return a.localeCompare(b);
  });

  return (
    <main>
      <h2>Add a book</h2>
      <AddBookForm onAddBook={handleAddBook} />
      <h2>Catalog</h2>
      <SortToggle onToggle={setGroupByYear} />
      <div className="books-container">
        {sortedKeys.map((key) => (
          <GroupContainer
            key={key}
            label={key}
            groupData={grouped[key].sort((a, b) =>
              a.author.lastName.localeCompare(b.author.lastName)
            )}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
