import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Clock, CreditCard, MapPin, Info, ChevronRight, Coffee } from "lucide-react-native";

const Profile = () => {
  const stamps = [true, true, true, true, true, false, false, false];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40, gap: 16 }}>
      {/* User Header Container */}
      <View style={styles.userCard}>
        <Image source={require("../../../assets/user-icon.png")} style={styles.avatar} />
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={styles.userName}>Raditya Dharma</Text>
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
                <Coffee size={16} color="#2D232E" />
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

      {/* Menu Options Container */}
      <View style={styles.menuContainer}>
        <Pressable style={styles.menuRow}>
          <Clock size={18} color="#2D232E" />
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Riwayat Pesanan</Text>
            <Text style={styles.menuSub}>1x Cortado, 1x Croissant · Selesai</Text>
          </View>
          <ChevronRight size={16} color="#474448" />
        </Pressable>

        <View style={styles.separator} />

        <Pressable style={styles.menuRow}>
          <CreditCard size={18} color="#2D232E" />
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Metode Pembayaran</Text>
            <Text style={styles.menuSub}>QRIS Instant, GoPay, Kartu Debit</Text>
          </View>
          <ChevronRight size={16} color="#474448" />
        </Pressable>

        <View style={styles.separator} />

        <Pressable style={styles.menuRow}>
          <MapPin size={18} color="#2D232E" />
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Gerai Dago Bar</Text>
            <Text style={styles.menuSub}>Jl. Ir. H. Juanda No. 128, Bandung</Text>
          </View>
          <ChevronRight size={16} color="#474448" />
        </Pressable>

        <View style={styles.separator} />

        <Pressable style={styles.menuRow}>
          <Info size={18} color="#2D232E" />
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Tentang Stoffee</Text>
            <Text style={styles.menuSub}>Versi 1.0.0 · UTS ABP Proyek</Text>
          </View>
          <ChevronRight size={16} color="#474448" />
        </Pressable>
      </View>
      {/* End Menu Options Container */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0EA",
    padding: 20,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.1)",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E0DDCF",
  },
  userName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#2D232E",
  },
  userSubtitle: {
    fontSize: 12,
    color: "#474448",
  },
  badgePill: {
    backgroundColor: "#F1F0EA",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 2,
  },
  badgePillText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#2D232E",
  },
  stampCard: {
    backgroundColor: "#2D232E",
    borderRadius: 18,
    padding: 18,
    gap: 6,
  },
  stampHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stampClubText: {
    fontSize: 10.5,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: "#E0DDCF",
  },
  stampPoints: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  stampTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 4,
  },
  stampSubtitle: {
    fontSize: 11.5,
    color: "rgba(255, 255, 255, 0.7)",
  },
  stampGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  stampSlot: {
    width: "22%",
    height: 44,
    borderRadius: 10,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  stampSlotFilled: {
    backgroundColor: "#E0DDCF",
    borderStyle: "solid",
    borderColor: "#E0DDCF",
  },
  stampNum: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 11,
    fontWeight: "700",
  },
  stampNote: {
    fontSize: 10.5,
    color: "rgba(255, 255, 255, 0.6)",
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.1)",
    paddingHorizontal: 16,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2D232E",
  },
  menuSub: {
    fontSize: 11,
    color: "#474448",
    marginTop: 2,
  },
  separator: {
    borderTopWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.08)",
  },
});

export default Profile;
