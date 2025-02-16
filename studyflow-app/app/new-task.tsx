import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTaskStore } from '@/store/useTaskStore';

export default function NewTask() {
  const router = useRouter();
  const addTask = useTaskStore((state) => state.addTask);

  const [taskName, setTaskName] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(true);

  const handleSave = () => {
    if (!taskName.trim()) return;

    addTask({
      id: Date.now(),
      text: taskName,
      notes,
      date: date.toDateString(),
      completed: false,
    });

    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Task</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.addButton}>Add</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor={'#A0A0A0'}
        value={taskName}
        onChangeText={setTaskName}
      />

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
          textColor='#3D3D3D'
        />
      )}

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        
      </TouchableOpacity>

      <TextInput
        style={styles.notesInput}
        placeholder="Notes (optional)"
        placeholderTextColor={'#A0A0A0'}
        value={notes}
        onChangeText={setNotes}
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    top: 60,
    backgroundColor: "#E5EBEA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#E5EBEA",
  },
  cancelButton: {
    color: "#007AFF",
    fontSize: 16,
  },
  addButton: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    fontSize: 18,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 20,
    color: "#3D3D3D",
  },
  dateButton: {
    padding: 15,
    backgroundColor: "transparent",
    borderRadius: 8,
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#3D3D3D",
  },
  notesInput: {
    fontSize: 17,
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 8,
    height: 100,
    textAlignVertical: "top",
    color: "#3D3D3D",
  }
});
