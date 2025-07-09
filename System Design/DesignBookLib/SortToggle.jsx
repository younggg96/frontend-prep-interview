import React, { useState } from 'react';

const SortToggle = ({ onToggle }) => {
  const [sortByYear, setSortByYear] = useState(false);

  const handleChange = (e) => {
    const checked = e.target.checked;
    setSortByYear(checked);
    onToggle(checked);
  };

  return (
    <div>
      <p>Group books by year:</p>
      <label className="switch">
        <input
          type="checkbox"
          name="sortByYear"
          checked={sortByYear}
          onChange={handleChange}
        />
        <span className="slide"></span>
      </label>
    </div>
  );
};

export default SortToggle;
