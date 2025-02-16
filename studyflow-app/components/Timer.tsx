import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from './ThemedText';

export default function Timer() {
  // Default values set to 25 minutes and 0 seconds
  const [selectedMinutes, setSelectedMinutes] = useState('25');
  const [selectedSeconds, setSelectedSeconds] = useState('0');
  const [remainingTime, setRemainingTime] = useState(25 * 60); // Default: 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  let timer: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isRunning, remainingTime]);

  const startTimer = () => {
    setRemainingTime(
      parseInt(selectedMinutes, 10) * 60 + parseInt(selectedSeconds, 10)
    );
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (timer) clearTimeout(timer);
  };

  const resetTimer = () => {
    stopTimer();
    setRemainingTime(25 * 60); // Reset to 25 minutes
    setSelectedMinutes('25');
    setSelectedSeconds('0');
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Display Timer Countdown */}
      <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>

      {/* Time Picker Inputs */}
      {!isRunning && (
        <View style={styles.pickerContainer}>
          <Picker
            itemStyle={{ color: '#3D3D3D' }}
            selectedValue={selectedMinutes}
            onValueChange={(itemValue) => setSelectedMinutes(itemValue)}
            style={styles.picker}
          >
            {Array.from({ length: 60 }, (_, i) => (
              <Picker.Item key={i} label={`${i} min`} value={`${i}`} />
            ))}
          </Picker>
          <Picker
            itemStyle={{ color: '#3D3D3D' }}
            selectedValue={selectedSeconds}
            onValueChange={(itemValue) => setSelectedSeconds(itemValue)}
            style={styles.picker}
          >
            {Array.from({ length: 60 }, (_, i) => (
              <Picker.Item key={i} label={`${i} sec`} value={`${i}`} />
            ))}
          </Picker>
        </View>
      )}

      {/* Start, Stop, Reset Buttons */}
      <View style={styles.buttonContainer}>
        {!isRunning ? (
          <TouchableOpacity style={styles.startButton} onPress={startTimer}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.stopButton} onPress={stopTimer}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.resetButton} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EBEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: "bold",
    fontSize: 32, 
    textAlign: "left",
    paddingTop: 115,
    paddingLeft: 20
  },
  timerText: {
    fontSize: 80,
    color: '#B098A4',
    fontWeight: 'bold',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  picker: {
    width: 140,
    color: '#333',
    backgroundColor: '#E5EBEA',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  startButton: {
    backgroundColor: '#B098A4',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  stopButton: {
    backgroundColor: '#B098A4',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  resetButton: {
    backgroundColor: '#B098A4',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
