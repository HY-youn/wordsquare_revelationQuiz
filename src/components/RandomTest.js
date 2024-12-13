// RandomTest.jsx  
import React, { useState, useEffect } from 'react';  

function RandomTest({ BIBLE_VERSES, selectedLevel }) {  
  const [questions, setQuestions] = useState([]);  
  const [userAnswers, setUserAnswers] = useState({});  
  const [showResults, setShowResults] = useState(false);  
  const [score, setScore] = useState(0);  
  const [currentLevel, setCurrentLevel] = useState(1);
  const [customRange, setCustomRange] = useState(''); // 사용자 지정 범위  
  const [isCustomRange, setIsCustomRange] = useState(false); // 사용자 지정 범위 사용 여부

  const getChapterRange = () => { 
    if (isCustomRange && customRange) {  
      const chapter = parseInt(customRange);  
      return { min: chapter, max: chapter };  
    }  
    switch (currentLevel) {
      case 1:  
      return { min: 1, max: 7 };  
    case 2:  
      return { min: 1, max: 14 };  
    case 3:  
      return { min: 1, max: 22 };  
    default:  
      return { min: 1, max: 7 }; // 기본값은 레벨 1  
    }
  };
  
  const handleLevelChange = (e) => {  
    setIsCustomRange(false); // 레벨 선택 시 사용자 지정 범위 해제 
    setCurrentLevel(parseInt(e.target.value));  
  };  

  const handleCustomRangeChange = (e) => {  
    const value = e.target.value;  
    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 22)) {  
      setCustomRange(value);  
    }  
  };  

  const applyCustomRange = () => {  
    if (customRange && parseInt(customRange) >= 1 && parseInt(customRange) <= 22) {  
      setIsCustomRange(true);  
      generateQuestions();  
    }  
  };  

  const generateQuestions = () => {  
    const newQuestions = [];  
    const usedVerses = new Set();   
    const { min, max } = getChapterRange();  
    // Set은 자바스크립트의 배열로 배열과는 다르게 중복값은 포함하지 않습니다. 1) 중복을 제거한다 2) 순서 유지 한다 3) 다양한 데이터 타입을 지원한다(문자열, 숫자, 객체 등의 값)

    const availableVerses = [];  
    for (let chapter = min; chapter <= max; chapter++) {  
      const verses = Object.keys(BIBLE_VERSES.revelation[chapter] || {}); // 각 chapter의 verses 가져오기  
      verses.forEach((verse) => {  
        availableVerses.push({ chapter, verse, text: BIBLE_VERSES.revelation[chapter][verse] });  
      });  
    }  
    // 가능한 문제 수를 availableVerses 의 길이와 10 중 작은 값으로 제한
    const maxQuestions = Math.min(10, availableVerses.length);  

     // 최대 10개의 문제 생성 (사용 가능한 verse가 부족하면 그만큼만 생성)  
     while (newQuestions.length < maxQuestions && availableVerses.length > 0) {  
      const randomIndex = Math.floor(Math.random() * availableVerses.length);  
      const selectedQuestion = availableVerses[randomIndex];  
  
      // 중복 방지  
      const verseKey = `${selectedQuestion.chapter}-${selectedQuestion.verse}`;  
      if (!usedVerses.has(verseKey)) {  
        usedVerses.add(verseKey);  
        newQuestions.push(selectedQuestion);  
      }  
  
      // 선택된 verse는 배열에서 제거  
      availableVerses.splice(randomIndex, 1);  
    }  
       // 만약 모든 가능한 verse를 다 사용했는데도 10문제를 채우지 못한 경우 무한 루프 방지  

    setQuestions(newQuestions);  
    setUserAnswers({});  
    setShowResults(false);  
    setScore(0);  
  };
    // 컴포넌트 마운트 시 또는 레벨 변경 시 문제 생성  
    useEffect(() => {  
      if(!isCustomRange) {
      generateQuestions();
    }  
    }, [currentLevel]);  
  


  const handleAnswerSubmit = () => {  
    let correctCount = 0;  
    questions.forEach((q, index) => {  
      const answer = userAnswers[index] || '';  
      if (answer.trim() === q.text.trim()) {  
        correctCount++;  
      }  
    });  
    setScore((correctCount / questions.length) * 100);  
    setShowResults(true);  
  };  

  return (  
    <div className="random-test">  
    <h2>랜덤 모의고사 (10문제)</h2>  
    
    <div className="range-selection">  
      <div className="preset-levels">  
        <label>사전 설정 레벨:</label>  
        <select   
          value={currentLevel}  
          onChange={handleLevelChange}  
          // disabled={isCustomRange}  
          className="level-select"  
        >  
          <option value={1}>레벨 1 (1-7장)</option>  
          <option value={2}>레벨 2 (1-14장)</option>  
          <option value={3}>레벨 3 (1-22장)</option>  
        </select>  
      </div>  

      <div className="custom-range">  
        <label>특정 장 선택:</label>  
        <div className="custom-range-input">  
          <input  
            type="number"  
            min="1"  
            max="22"  
            value={customRange}  
            onChange={handleCustomRangeChange}  
            placeholder="1-22 사이의 장 입력"  
            className="chapter-input"  
          />  
          <button   
            onClick={applyCustomRange}  
            disabled={!customRange || parseInt(customRange) < 1 || parseInt(customRange) > 22}  
            className="apply-btn"  
          >  
            적용  
          </button>  
        </div>  
      </div>  
    </div>  

    <div className="level-info">  
      {isCustomRange ? (  
        <p>선택된 장: {customRange}장</p>  
      ) : (  
        <p>현재 레벨: {currentLevel} (범위: 1-{getChapterRange().max}장)</p>  
      )}  
    </div>  
    
    <button onClick={generateQuestions} className="new-test-btn">  
      새로운 시험 생성  
    </button>  


      <div className="questions-container">  
        {questions.map((q, index) => (  
          <div key={index} className="question-item">  
            <h3>문제 {index + 1}</h3>  
            <p className="verse-reference">계시록 {q.chapter}장 {q.verse}절</p>  
            <textarea  
              value={userAnswers[index] || ''}  
              onChange={(e) =>   
                setUserAnswers({...userAnswers, [index]: e.target.value})  
              }  
              placeholder="성경 구절을 입력하세요..."  
              disabled={showResults}  
            />  
            {showResults && (  
              <div className="result-feedback">  
                <p className="correct-answer">정답: {q.text}</p>  
                <p className={userAnswers[index]?.trim() === q.text.trim() ? 'correct' : 'incorrect'}>  
                  {userAnswers[index]?.trim() === q.text.trim() ? '정답!' : '오답'}  
                </p>  
              </div>  
            )}  
          </div>  
        ))}  
      </div>  

      {!showResults && questions.length > 0 && (  
        <button onClick={handleAnswerSubmit} className="submit-btn">  
          채점하기  
        </button>  
      )}  

      {showResults && (  
        <div className="final-score">  
          <h3>최종 점수: {score.toFixed(1)}점</h3>  
          <p>총 10문제 중 {Math.round(score / 10)}문제 정답</p>  
        </div>  
      )}  

      <style jsx>{`  
        .custom-range-input {  
          display: flex;  
          gap: 10px;  
        }  

        .chapter-input {  
          padding: 8px;  
          width: 150px;  
          border: 1px solid #ddd;  
          border-radius: 4px;  
          font-size: 16px;  
        }  
        .level-select:disabled {  
          background-color: #f0f0f0;  
          cursor: not-allowed;  
        }  
        .random-test {  
          padding: 20px;  
          max-width: 800px;  
          margin: 0 auto;  
        }  
  
        
       .range-selection {  
          margin: 20px 0;  
          display: flex;  
          flex-direction: column;  
          gap: 15px;  
          padding: 15px;  
          background-color: #f5f5f5;  
          border-radius: 8px;  
        }  

        .preset-levels, .custom-range {  
          display: flex;  
          flex-direction: column;  
          gap: 8px;  
        }  

        .custom-range-input {  
          display: flex;  
          gap: 10px;  
        }  

        .chapter-input {  
          padding: 8px;  
          width: 150px;  
          border: 1px solid #ddd;  
          border-radius: 4px;  
          font-size: 16px;  
        }  

        .apply-btn {  
          padding: 8px 16px;  
          background-color: #4caf50;  
          color: white;  
          border: none;  
          border-radius: 4px;  
          cursor: pointer;  
        }  

        .apply-btn:disabled {  
          background-color: #cccccc;  
          cursor: not-allowed;  
        }  

        .level-select {  
          padding: 8px;  
          font-size: 16px;  
          border-radius: 4px;  
          border: 1px solid #ddd;  
        }  

        .level-select:disabled {  
          background-color: #f0f0f0;  
          cursor: not-allowed;  
        }  
        .new-test-btn, .submit-btn {  
          padding: 10px 20px;  
          background-color: #4caf50;  
          color: white;  
          border: none;  
          border-radius: 4px;  
          cursor: pointer;  
          margin: 10px 0;  
          font-size: 16px;  
        }  

        .question-item {  
          margin: 20px 0;  
          padding: 15px;  
          border: 1px solid #ddd;  
          border-radius: 8px;  
          background-color: #f9f9f9;  
        }  

        .verse-reference {  
          color: #666;  
          font-weight: bold;  
        }  

        textarea {  
          width: 100%;  
          height: 100px;  
          margin: 10px 0;  
          padding: 10px;  
          border: 1px solid #ddd;  
          border-radius: 4px;  
          font-size: 16px;  
        }  

        .result-feedback {  
          margin-top: 10px;  
          padding: 10px;  
          background-color: #f0f0f0;  
          border-radius: 4px;  
        }  

        .correct-answer {  
          color: #666;  
          font-style: italic;  
        }  

        .correct {  
          color: #4caf50;  
          font-weight: bold;  
        }  

        .incorrect {  
          color: #f44336;  
          font-weight: bold;  
        }  

        .final-score {  
          margin-top: 20px;  
          padding: 20px;  
          background-color: #e8f5e9;  
          border-radius: 8px;  
          text-align: center;  
        }  
          .back-button {
          position: absolute;
          top: 20px;
          left: 20px;
          padding: 10px 20px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .back-button:hover {
          color: white;
          background-color: #ffffff;
        }

        .back-button:hover {
          background-color: #5a6268;
        }
      `}</style>  
    </div>  
  );  
}  

export default RandomTest;  