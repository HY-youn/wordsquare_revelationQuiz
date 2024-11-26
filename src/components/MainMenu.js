import React from 'react';

function MainMenu({ onLevelSelect }) {
  return (
    <div className="main-menu">
      <h1 className="main-title">계시록 천국 고시</h1>
      <h2 className="main-subtitle">12월 14일 모두 인 맞읍시다! </h2>
      <div className="button-container">
        <button onClick={() => onLevelSelect(1)}>1단계<br/>(1-7장)</button>
        <button onClick={() => onLevelSelect(2)}>2단계<br/>(1-14장)</button>
        <button onClick={() => onLevelSelect(3)}>3단계<br/>(1-22장)</button>
      </div>

      <style jsx>{`
        .main-menu {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        .main-title {
          font-size: 3rem;
          color: #333;
          margin-bottom: 2rem;
          text-align: center;
          font-weight: bold;
          border: 1px solid #333;
          padding : 20px 40px;
          border-radius: 25px;
        }

        .main-subtitle {
          font-size: 1.5rem;
          color: #aaaaaa;
          margin-bottom: 2rem;
          text-align: center;
        }

        .button-container {
          display: flex;
          gap: 1.5rem;
        }

        button {
          padding: 1.5rem 2.5rem;
          font-size: 1.2rem;
          border: none;
          border-radius: 8px;
          background-color: #4CAF50;
          color: white;
          cursor: pointer;
          transition: transform 0.2s, background-color 0.2s;
          text-align: center;
          line-height: 1.5;
        }
        button:first-child{
          background-color: #ac0;
        }
        button:nth-child(2){
          background-color: #fa0;
        }
        button:last-child{
          background-color: #0af;
        }

        button:hover {
          transform: translateY(-3px);
          background-color: #333;
        }
      `}</style>
    </div>
  );
}

export default MainMenu;