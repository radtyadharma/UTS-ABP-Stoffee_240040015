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

      {/* Loyalty Stamp Container */}
      <View style={styles.stampCard}>
        <View style={styles.stampHeader}>
          <Text style={styles.stampClubText}>STOFFEE CLUB</Text>
          <Text style={styles.stampPoints}>480 Seeds</Text>
        </View>
        <Text style={styles.stampTitle}>Kartu Stamp Digital</Text>
        <Text style={styles.stampSubtitle}>
          Kumpulkan 8 stamp cangkir untuk 1 kopi artisan gratis!
        </Text>

        <View style={styles.stampGrid}>
          {stamps.map((filled, idx) => (
            <View
              key={idx}
              style={[styles.stampSlot, filled && styles.stampSlotFilled]}
            >
              {filled ? (
                <Feather name="coffee" size={16} color="#2D232E" />
              ) : idx === 7 ? (
                <Text style={{ fontSize: 14 }}>🎁</Text>
              ) : (
                <Text style={styles.stampNum}>{idx + 1}</Text>
              )}
            </View>
          ))}
        </View>
        <Text style={styles.stampNote}>
          Tersisa 3 stamp lagi untuk klaim Single Origin Pour-Over gratis.
        </Text>
      </View>
      {/* End Loyalty Stamp Container */}

    </ScrollView>
  );
};