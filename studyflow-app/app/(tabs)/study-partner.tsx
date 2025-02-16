import React from "react";
import { View, StyleSheet } from "react-native";
import StudyPartnerFinder from "@/components/StudyPartnerFinder";

export default function StudyPartnerScreen() {
  return (
    <View style={styles.container}>
      <StudyPartnerFinder />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5EBEA",
  },
});
