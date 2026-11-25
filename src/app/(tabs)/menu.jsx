import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Coffee, Search, X } from "lucide-react-native";
import { useRouter } from "expo-router";

const Menu = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Signature", "Espresso", "Cold Brew", "Pastry"];

  const allItems = [
    {
      id: "c-01",
      title: "Oat Sea Salt Cortado",
      category: "Signature",
      price: "42000",
      notes: "Double ristretto, oat milk, sea salt caramel",
      origin: "Single Origin Gayo Washed · Catatan dark chocolate & caramel.",
      temp: "Iced",
    },
    {
      id: "c-02",
      title: "Classic Flat White",
      category: "Espresso",
      price: "36000",
      notes: "House Blend · Velvety textured microfoam",
      origin: "House Blend Brazil & Mandheling · Microfoam lembut.",
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
    {
      id: "c-04",
      title: "Spanish Oat Latte",
      category: "Signature",
      price: "38000",
      notes: "Espresso, condensed milk, creamy oat milk",
      origin: "Espresso dengan condensed oat milk manis legit seimbang.",
      temp: "Iced",
    },
    {
      id: "c-05",
      title: "Kyoto Cold Drip",
      category: "Cold Brew",
      price: "40000",
      notes: "Ethiopia Yirgacheffe · 12-hour slow drip",
      origin: "Ekstraksi tetes lambat 12 jam dengan aroma melati & peach.",
      temp: "Iced",
    },
    {
      id: "c-06",
      title: "Cardamom Morning Bun",
      category: "Pastry",
      price: "28000",
      notes: "Swedish style bun · Brown butter cardamom glaze",
      origin: "Roti brioche Swedia dengan rempah kapulaga & gula aren.",
      temp: "Hot",
    },
    {
      id: "c-07",
      title: "Piccolo Latte",
      category: "Espresso",
      price: "34000",
      notes: "Single ristretto with 100ml silky milk",
      origin: "Ekstraksi ristretto pekat dengan susu hangat 100ml.",
      temp: "Hot",
    },
    {
      id: "c-08",
      title: "Pain au Chocolat",
      category: "Pastry",
      price: "35000",
      notes: "French laminated pastry · Belgian dark chocolate",
      origin: "Pastry lapis mentega Prancis dengan cokelat Belgia pekat.",
      temp: "Hot",
    },
  ];

  const filteredItems = allItems.filter((item) => {
    const matchCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.notes.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <View style={styles.container}>
      {/* Search Bar Container */}
      <View style={styles.searchContainer}>
        <Search size={18} color="#474448" />
        <TextInput
          placeholder="Cari menu kopi atau pastry..."
          placeholderTextColor="#8C8885"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch("")}>
            <X size={18} color="#474448" />
          </Pressable>
        )}
      </View>
      {/* End Search Bar Container */}

      {/* Category Filter Container */}
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
      {/* End Category Filter Container */}

      {/* Product List Container */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        style={styles.productList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24, gap: 12 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/details",
                params: item,
              })
            }
          >
            <View style={styles.iconBox}>
              <Coffee size={24} color="#2D232E" />
            </View>
            <View style={styles.info}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardNotes}>{item.notes}</Text>
              <Text style={styles.cardPrice}>
                Rp {Number(item.price).toLocaleString("id-ID")}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 14, color: "#474448" }}>
              Tidak ada menu yang sesuai pencarian.
            </Text>
          </View>
        }
      />
      {/* End Product List Container */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0EA",
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 14,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.12)",
    paddingHorizontal: 14,
    height: 46,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#2D232E",
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
  productList: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.1)",
    alignItems: "center",
    gap: 14,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#E0DDCF",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    gap: 3,
  },
  cardTitle: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#2D232E",
  },
  cardNotes: {
    fontSize: 11.5,
    color: "#474448",
  },
  cardPrice: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "#2D232E",
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
});

export default Menu;
