import React from 'react';

const BibleSelector = ({ chapter, verse, onSelect }) => {


  const versesPerChapter = {
    1: 20, 2: 29, 3: 22, 4: 11, 5: 14, 6: 17, 7: 17, 8: 13, 9: 21,
    10: 11, 11: 19, 12: 17, 13: 18, 14: 20, 15: 8, 16: 21, 17: 18,
    18: 24, 19: 21, 20: 15, 21: 27, 22: 21
  };

  return (
    <div className="bible-selector">
    <select
      value={chapter}
      onChange={(e) => onSelect('chapter', e.target.value)}
      className="selector"
    >
      {[...Array(22)].map((_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}장
        </option>
      ))}
    </select>

    <select
      value={verse}
      onChange={(e) => onSelect('verse', e.target.value)}
      className="selector"
    >
      {[...Array(versesPerChapter[chapter])].map((_, i) => (
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
