import React from 'react';

const BibleSelector = ({ book, chapter, verse, onSelect }) => {
  // 성경 책 목록
  const books = [
    { label: '계시록', value: 'revelation' } 
  ];

  const handleChange = (type, value) => {
    onSelect(type, value);
  };

  return (
    <div className="bible-selector">
      <select
        value={book}
        onChange={(e) => handleChange('book', e.target.value)}
        className="selector"
      >
        {books.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <select
        value={chapter}
        onChange={(e) => handleChange('chapter', parseInt(e.target.value))}
        className="selector"
      >
        {[...Array(50)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}장
          </option>
        ))}
      </select>

      <select
        value={verse}
        onChange={(e) => handleChange('verse', parseInt(e.target.value))}
        className="selector"
      >
        {[...Array(30)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}절
          </option>
        ))}
      </select>

      <style jsx>{`
        .bible-selector {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .selector {
          flex: 1;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }
        
        .selector:focus {
          outline: none;
          border-color: #007bff;
        }
      `}</style>
    </div>
  );
};

export default BibleSelector;
