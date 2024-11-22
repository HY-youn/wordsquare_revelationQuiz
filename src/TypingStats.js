import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TypingStats = ({ wpm, accuracy, progress }) => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{wpm}</Text>
        <Text style={styles.statLabel}>WPM</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{accuracy}%</Text>
        <Text style={styles.statLabel}>정확도</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{progress}%</Text>
        <Text style={styles.statLabel}>진행률</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
});

export default TypingStats; 