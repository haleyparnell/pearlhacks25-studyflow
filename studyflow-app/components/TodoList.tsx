import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { useTaskStore } from '@/store/useTaskStore';
import { useRouter } from 'expo-router';

export default function TodoList() {
  const { tasks, removeTask, toggleCompleted } = useTaskStore();
  const router = useRouter();

  const renderRightActions = (id: number) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => removeTask(id)}>
      <Ionicons name="trash" size={24} color="#B098A4" />
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Header with Add Button */}
      <View style={styles.header}>
        <Text style={styles.title}>StudyFlow</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/new-task')}>
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>

      {/* No Tasks Message */}
      {tasks.length === 0 && <Text style={styles.emptyMessage}>No tasks yet. Add some!</Text>}

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id.toString()}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <View style={styles.taskItem}>
              {/* Checkbox */}
              <TouchableOpacity onPress={() => toggleCompleted(item.id)} style={styles.checkBox}>
                <Ionicons
                  name={item.completed ? 'checkbox' : 'square-outline'}
                  size={24}
                  color={item.completed ? '#B098A4' : '#000'}
                />
              </TouchableOpacity>

              {/* Task Details */}
              <View style={styles.taskDetails}>
                <Text style={[styles.taskText, item.completed && styles.completedText]}>
                  {item.text}
                </Text>
                {item.notes ? <Text style={styles.taskNotes}>{item.notes}</Text> : null}
              </View>

              {/* Date (aligned right) */}
              <Text style={styles.taskDate}>{item.date}</Text>
            </View>
          </Swipeable>
        )}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#3F7CAC',
    padding: 10,
    borderRadius: 50,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,

  },
  checkBox: {
    marginRight: 10,
  },
  taskDetails: {
    flex: 1,
  },
  taskText: {
    fontSize: 18,
    fontWeight: '500',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#A0A0A0',
  },
  taskNotes: {
    fontSize: 14,
    color: '#666',
  },
  taskDate: {
    fontSize: 14,
    color: '#3F7CAC',
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    borderRadius: 8,
    marginBottom: 5,
  },
});
