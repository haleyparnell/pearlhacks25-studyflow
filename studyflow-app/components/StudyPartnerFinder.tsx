import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const mockPartners = [
  { id: 1, name: "Taylor Swift", course: "COMP 311" },
  { id: 2, name: "Jordan Smith", course: "MATH 233" },
  { id: 3, name: "Wayne Brown", course: "COMP 311" },
  { id: 4, name: "Sam Green", course: "PHYS 118" },
  { id: 5, name: "Chris White", course: "MATH 233" },
];

export default function StudyPartnerFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]); // Track selected users by ID

  // Filter study partners based on search input
  const filteredPartners = mockPartners.filter((partner) =>
    partner.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle individual user selection
  const toggleSelection = (id: number) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id) // Remove if already selected
        : [...prevSelected, id] // Add new selection
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find a Study Partner</Text>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by course (e.g. COMP 311)"
        placeholderTextColor="#A0A0A0"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Study Partners List */}
      <FlatList
        data={filteredPartners}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.partnerCard,
              selectedUsers.includes(item.id) && styles.selectedCard, // Apply selection only to this user
            ]}
            onPress={() => toggleSelection(item.id)}
          >
            <Text style={styles.partnerName}>{item.name}</Text>
            <Text style={styles.partnerCourse}>{item.course}</Text>
            <Ionicons
              name={selectedUsers.includes(item.id) ? "person" : "person-add"}
              size={24}
              color="#3F7CAC"
            />
          </TouchableOpacity>
        )}
      />

      {/* No Results Message */}
      {filteredPartners.length === 0 && (
        <Text style={styles.noResults}>No partners found for this course.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#E5EBEA",
      top: 70,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 15,
      color: "#3D3D3D",
      textAlign: "center",
    },
    searchInput: {
      fontSize: 16,
      padding: 12,
      backgroundColor: "#FFF",
      borderRadius: 8,
      marginBottom: 15,
      color: "#3D3D3D",
    },
    partnerCard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      backgroundColor: "#FFF",
      borderRadius: 8,
      marginBottom: 10,
    },
    selectedCard: {
      backgroundColor: "#D6EAF8",
    },
    partnerName: {
      fontSize: 18,
      fontWeight: "500",
      color: "#3D3D3D",
    },
    partnerCourse: {
      fontSize: 14,
      color: "#666",
    },
    noResults: {
      textAlign: "center",
      fontSize: 16,
      color: "#888",
      marginTop: 20,
    },
  });
  