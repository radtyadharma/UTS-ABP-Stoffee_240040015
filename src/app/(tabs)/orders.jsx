import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Coffee } from "lucide-react-native";

const Orders = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Coffee size={32} color="#2D232E" />
        <Text style={styles.title}>Pesanan</Text>
        <Text style={styles.subtitle}>
          Alur pemesanan berhenti di halaman Detail Menu — sesuai cakupan pembelajaran UTS.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F1F0EA", padding: 20 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.1)",
  },
  title: { fontSize: 17, fontWeight: "800", color: "#2D232E" },
  subtitle: { fontSize: 12, color: "#474448", textAlign: "center", lineHeight: 17 },
});

export default Orders;
