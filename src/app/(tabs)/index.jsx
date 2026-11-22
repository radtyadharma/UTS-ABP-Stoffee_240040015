import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Signature", "Espresso", "Cold Brew", "Pastry"];

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
      origin: "Pastry mentega Prancis dengan isian krim almond panggang renyah.",
      temp: "Hot",
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

        {/* Search Container */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Cari artisan coffee, beans, bakery..."
            placeholderTextColor="#8C8885"
            style={styles.searchInput}
          />
          <Pressable style={styles.searchButton} onPress={() => router.navigate("/menu")}>
            <Feather name="search" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
        {/* End Search Container */}

        {/* Category Container */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScrollView}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((cat) => (
            <Pressable
              key={cat}
              style={({ pressed }) => [
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipActive,
                pressed && { opacity: 0.8 },
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        {/* End Category Container */}

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
  searchContainer: {
    flexDirection: "row",
    gap: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.12)",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 13,
    color: "#2D232E",
  },
  searchButton: {
    backgroundColor: "#2D232E",
    borderRadius: 12,
    width: 46,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryScrollView: {
    height: 48,
    flexGrow: 0,
    flexShrink: 0,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  categoryChip: {
    height: 38,
    minWidth: 54,
    paddingHorizontal: 16,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryChipActive: {
    backgroundColor: "#2D232E",
    borderColor: "#2D232E",
  },
  categoryText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#474448",
    textAlign: "center",
    includeFontPadding: false,
  },
  categoryTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
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
