import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();

  const popularCoffees = [
    {
      id: "c-01",
      title: "Oat Sea Salt Cortado",
      category: "Signature",
      price: "42000",
      notes: "Double ristretto, oat milk, sea salt caramel foam",
      origin: "Single Origin Gayo Washed · Catatan rasa dark chocolate dan caramel.",
      temp: "Iced",
    },
    {
      id: "c-02",
      title: "Classic Flat White",
      category: "Espresso",
      price: "36000",
      notes: "House Blend · Velvety textured microfoam",
      origin: "House Blend Brazil & Mandheling · Microfoam lembut, rasa nutty seimbang.",
      temp: "Hot",
    },
    {
      id: "c-03",
      title: "Artisan Almond Croissant",
      category: "Pastry",
      price: "32000",
      notes: "French viennoiserie · Toasted almond cream",
      origin: "Pastry mentega Prancis dengan isian krim almond panggang.",
      temp: "Hot",
      type: "pastry",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F1F0EA" }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* User Container */}
        <View style={styles.userContainer}>
          <View>
            <Text style={styles.subTitle}>Good Morning ☕</Text>
            <Text style={styles.title}>Raditya</Text>
          </View>
          <View style={styles.locationBadge}>
            <Feather name="map-pin" size={13} color="#2D232E" />
            <Text style={styles.locationText}>Dago Bar, Bandung</Text>
          </View>
        </View>
        {/* End User Container */}

        {/* Promo Banner Container — pengganti search bar & filter (fokus home: promosi, bukan pencarian) */}
        <View style={styles.promoBanner}>
          <View style={styles.promoTextWrap}>
            <Text style={styles.promoTag}>PROMO HARI INI</Text>
            <Text style={styles.promoTitle}>Beli 2 Gratis 1 Pastry</Text>
            <Text style={styles.promoDesc}>
              Berlaku setiap pembelian 2 minuman signature sebelum pukul 11.00.
            </Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.promoButton,
              pressed && { opacity: 0.85 },
            ]}
            onPress={() => router.navigate("/menu")}
          >
            <Text style={styles.promoButtonText}>Lihat Menu</Text>
            <Feather name="arrow-right" size={13} color="#2D232E" />
          </Pressable>
        </View>
        {/* End Promo Banner Container */}

        {/* Hero Card Container */}
        <View style={styles.heroCard}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>BARISTA SPECIAL</Text>
          </View>
          <Text style={styles.heroTitle}>Oat Sea Salt Cortado</Text>
          <Text style={styles.heroDesc}>
            Double ristretto diekstrak di atas susu oat Swedia dengan taburan sea salt caramel gurih.
          </Text>
          <View style={styles.heroFooter}>
            <Text style={styles.heroPrice}>Rp 42.000</Text>
            <Pressable
              style={styles.heroButton}
              onPress={() =>
                router.push({
                  pathname: "/details",
                  params: popularCoffees[0],
                })
              }
            >
              <Text style={styles.heroButtonText}>Pesan Sekarang</Text>
              <Feather name="arrow-right" size={14} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
        {/* End Hero Card Container */}

        {/* Popular Menu Container */}
        <View style={styles.popularContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pilihan Terpopuler</Text>
            <Pressable onPress={() => router.navigate("/menu")}>
              <Text style={styles.linkText}>Lihat Semua →</Text>
            </Pressable>
          </View>

          {popularCoffees.map((item) => (
            <Pressable
              key={item.id}
              style={styles.productCard}
              onPress={() =>
                router.push({
                  pathname: "/details",
                  params: item,
                })
              }
            >
              <View style={styles.productIconBox}>
                <Feather name="coffee" size={24} color="#2D232E" />
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productNotes}>{item.notes}</Text>
                <Text style={styles.productPrice}>
                  Rp {Number(item.price).toLocaleString("id-ID")}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
        {/* End Popular Menu Container */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 20,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2D232E",
  },
  subTitle: {
    fontSize: 13,
    color: "#474448",
    fontWeight: "500",
  },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.1)",
  },
  locationText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2D232E",
  },
  promoBanner: {
    backgroundColor: "#2D232E",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  promoTextWrap: {
    flex: 1,
    gap: 4,
  },
  promoTag: {
    fontSize: 9,
    fontWeight: "800",
    color: "#E0DDCF",
    letterSpacing: 1,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  promoDesc: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 15,
  },
  promoButton: {
    backgroundColor: "#E0DDCF",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  promoButtonText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#2D232E",
  },
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.1)",
    gap: 8,
  },
  badgeContainer: {
    backgroundColor: "#E0DDCF",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#2D232E",
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2D232E",
  },
  heroDesc: {
    fontSize: 12.5,
    color: "#474448",
    lineHeight: 18,
  },
  heroFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  heroPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2D232E",
  },
  heroButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#2D232E",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
  },
  heroButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  popularContainer: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2D232E",
  },
  linkText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#534B52",
  },
  productCard: {
    flexDirection: "row",
    gap: 14,
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.1)",
    alignItems: "center",
  },
  productIconBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#E0DDCF",
    justifyContent: "center",
    alignItems: "center",
  },
  productInfo: {
    flex: 1,
    gap: 3,
  },
  productTitle: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#2D232E",
  },
  productNotes: {
    fontSize: 11.5,
    color: "#474448",
  },
  productPrice: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "#2D232E",
    marginTop: 4,
  },
});

export default Index;
