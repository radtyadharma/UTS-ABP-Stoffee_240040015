import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const Profile = () => {
  const stamps = [true, true, true, true, true, false, false, false];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40, gap: 16 }}>
      {/* User Header Container */}
      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>RA</Text>
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={styles.userName}>Raditya</Text>
          <Text style={styles.userSubtitle}>Member Gold · Sejak 2026</Text>
          <View style={styles.badgePill}>
            <Text style={styles.badgePillText}>Single Origin Explorer</Text>
          </View>
        </View>
      </View>
      {/* End User Header Container */}

    </ScrollView>
  );
};