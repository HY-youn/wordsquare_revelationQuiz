const BIBLE_DATA = {
  revelation: {
    1: {
      1: "예수 그리스도의 계시라 이는 하나님이 그에게 주사 반드시 속히 될 일을 그 종들에게 보이시려고 그의 천사를 그 종 요한에게 보내어 알게 하신 것이라",
      2: "요한은 하나님의 말씀과 예수 그리스도의 증거 곧 자기의 본 것을 다 증거하였느니라",
      3: "이 예언의 말씀을 읽는 자와 듣는 자와 그 가운데 기록한 것을 지키는 자가 복이 있나니 때가 가까움이라",
      // ... 1장의 나머지 구절들
    },
    2: {
      1: "에베소 교회의 사자에게 편지하기를 오른손에 일곱 별을 붙잡고 일곱 금 촛대 사이에 다니시는 이가 가라사대",
      2: "내가 네 행위와 수고와 네 인내를 알고 또 악한 자들을 용납지 아니한 것과 자칭 사도라 하되 아닌 자들을 시험하여 그의 거짓된 것을 네가 드러낸 것과",
      // ... 2장의 나머지 구절들
    },
    // ... 3장부터 21장까지
    22: {
      1: "또 저가 수정같이 맑은 생명수의 강을 내게 보이니 하나님과 및 어린 양의 보좌로부터 나와서",
      2: "길 가운데로 흐르더라 강 좌우에 생명나무가 있어 열두 가지 실과를 맺히되 달마다 그 실과를 맺히고 그 나무 잎사귀들은 만국을 소성하기 위하여 있더라",
      // ... 마지막까지
      21: "주 예수의 은혜가 모든 자들에게 있을지어다 아멘"
    }
  }
};

export const getBibleVerse = async (book, chapter, verse) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const verseText = BIBLE_DATA[book]?.[chapter]?.[verse];
      
      if (verseText) {
        resolve({
          text: verseText,
          book: getBookName(book),
          chapter,
          verse
        });
      } else {
        resolve({
          text: '구절을 찾을 수 없습니다.',
          book: getBookName(book),
          chapter,
          verse
        });
      }     
    }, 100); // 실제 API 호출을 시뮬레이션하기 위한 지연
  });
};

const getBookName = (bookCode) => {
  const bookNames = {
    genesis: '창세기',
    exodus: '출애굽기',
    leviticus: '레위기',
    numbers: '민수기',
    revelation: '계시록' 
  };
  return bookNames[bookCode] || bookCode;
}; 