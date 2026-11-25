import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Coffee, Clock, Store, ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

const Promo = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ gap: 16, paddingBottom: 40 }}>
      {/* Kartu promo utama */}
      <View style={styles.heroCard}>
        <Text style={styles.heroTag}>PROMO HARI INI</Text>
        <Text style={styles.heroTitle}>Beli 2 Gratis 1 Pastry</Text>
        <Text style={styles.heroDesc}>
          Berlaku setiap pembelian 2 minuman signature sebelum pukul 11.00. Pilih pastry
          favoritmu dari katalog Menu.
        </Text>
      </View>

      {/* Syarat & ketentuan */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Syarat & Ketentuan</Text>
        <View style={styles.termRow}>
          <Coffee size={16} color="#2D232E" />
          <Text style={styles.termText}>Berlaku untuk minuman kategori Signature.</Text>
        </View>
        <View style={styles.termRow}>
          <Clock size={16} color="#2D232E" />
          <Text style={styles.termText}>Pemesanan sebelum pukul 11.00 setiap hari.</Text>
        </View>
        <View style={styles.termRow}>
          <Store size={16} color="#2D232E" />
          <Text style={styles.termText}>Hanya di gerai Dago Bar, Bandung.</Text>
        </View>
      </View>

      {/* Tombol kembali — menutup modal promo */}
      <Pressable
        style={({ pressed }) => [styles.closeButton, pressed && { opacity: 0.85 }]}
        onPress={() => router.back()}
      >
        <ArrowLeft size={16} color="#FFFFFF" />
        <Text style={styles.closeText}>Kembali ke Home</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0EA",
    padding: 20,
  },
  heroCard: {
    backgroundColor: "#2D232E",
    borderRadius: 18,
    padding: 20,
    gap: 6,
  },
  heroTag: {
    fontSize: 10,
    fontWeight: "800",
    color: "#E0DDCF",
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  heroDesc: {
    fontSize: 12,
    color: "rgba(255,255,255,0.75)",
    lineHeight: 18,
    marginTop: 4,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.1)",
    gap: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#2D232E",
  },
  termRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  termText: {
    fontSize: 12,
    color: "#474448",
    flex: 1,
  },
  closeButton: {
    backgroundColor: "#2D232E",
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  closeText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});

export default Promo;
