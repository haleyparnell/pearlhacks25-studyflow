import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import TodoList from '@/components/TodoList';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/artemis.jpg')}
          style={styles.profileImage}
        />
      </View>
      <TodoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5EBEA",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 32,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: "absolute",
    top: 50,
    right: 80,
    
  },
  addButton: {
    position: "absolute",
    top: 150,
    right: 80,
  },
});
