import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  Dimensions,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import TypingStats from './TypingStats';
import BibleSelector from './BibleSelector';
import { downloadBible, getBibleVerse } from './bibleService';

const { width } = Dimensions.get('window');

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentVerse, setCurrentVerse] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(true);
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 100,
    progress: 0
  });
  
  const startTimeRef = useRef(null);
  const errorsRef = useRef(0);

  useEffect(() => {
    initializeBible();
  }, []);

  const initializeBible = async () => {
    setLoading(true);
    const bibleData = await getBibleVerse();
    if (!bibleData) {
      await downloadBible();
    }
    setLoading(false);
  };

  const calculateStats = (text) => {
    if (!startTimeRef.current) {
      startTimeRef.current = new Date();
    }

    const timeElapsed = (new Date() - startTimeRef.current) / 1000 / 60; // 분 단위
    const wordsTyped = text.trim().split(' ').length;
    const wpm = Math.round(wordsTyped / timeElapsed);
    
    const progress = Math.round((text.length / currentVerse.length) * 100);
    const accuracy = Math.round(((text.length - errorsRef.current) / text.length) * 100);

    setStats({
      wpm: isNaN(wpm) ? 0 : wpm,
      accuracy: isNaN(accuracy) ? 100 : accuracy,
      progress
    });
  };

  const handleInputChange = (text) => {
    setUserInput(text);
    
    const targetText = currentVerse.substring(0, text.length);
    const correct = text === targetText;
    
    if (!correct) {
      errorsRef.current += 1;
    }
    
    setIsCorrect(correct);
    calculateStats(text);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text>성경 데이터 로딩 중...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <BibleSelector 
          book="genesis"
          chapter={1}
          verse={1}
          onSelect={(type, value) => {
            // 성경 선택 처리
          }}
        />
        
        <TypingStats {...stats} />
        
        <Text style={styles.verse}>{currentVerse}</Text>
        
        <TextInput
          style={[
            styles.input,
            { borderColor: isCorrect ? '#4CAF50' : '#FF5252' }
          ]}
          value={userInput}
          onChangeText={handleInputChange}
          multiline
          placeholder="여기에 입력하세요..."
          placeholderTextColor="#666"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verse: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 26,
  },
  input: {
    width: width - 40,
    height: 100,
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});
