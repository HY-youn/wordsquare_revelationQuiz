// RandomTest.jsx  
import React, { useState, useEffect } from 'react';  

function RandomTest({ BIBLE_VERSES }) {  
  const [questions, setQuestions] = useState([]);  
  const [userAnswers, setUserAnswers] = useState({});  
  const [showResults, setShowResults] = useState(false);  
  const [score, setScore] = useState(0);  

  useEffect(() => {  
    generateQuestions();  
  }, []);  

  const generateQuestions = () => {  
    const newQuestions = [];  
    const usedVerses = new Set();   
    // Set은 자바스크립트의 배열로 배열과는 다르게 중복값은 포함하지 않습니다. 1) 중복을 제거한다 2) 순서 유지 한다 3) 다양한 데이터 타입을 지원한다(문자열, 숫자, 객체 등의 값)
    while (newQuestions.length < 10) {  
      // 랜덤으로 장과 절 선택  
      const chapter = Math.floor(Math.random() * 8) + 1; // 1-8장까지  
      const verses = Object.keys(BIBLE_VERSES.revelation[chapter]);  
      const verse = verses[Math.floor(Math.random() * verses.length)];  
      
      const verseKey = `${chapter}-${verse}`;  
      
      // 중복 방지  
      if (!usedVerses.has(verseKey)) {  
        usedVerses.add(verseKey);
        newQuestions.push({  
          chapter,  
          verse,  
          text: BIBLE_VERSES.revelation[chapter][verse],  
        });  
      }  
    }  

    setQuestions(newQuestions);  
    setUserAnswers({});  
    setShowResults(false);  
    setScore(0);  
  };  

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

      {!showResults && (  
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
        .random-test {  
          padding: 20px;  
          max-width: 800px;  
          margin: 0 auto;  
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