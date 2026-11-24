import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCart } from "../context/CartContext";

const Details = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addItem } = useCart();

  // Extract parameters passed from Home or Menu
  const {
    id = "c-01",
    title = "Oat Sea Salt Cortado",
    category = "Signature",
    price = "42000",
    origin = "Single Origin Gayo Washed · Catatan rasa dark chocolate dan caramel.",
    temp = "Iced",
    type = "drink",
  } = params;

  // Pastry tidak pakai susu/kemanisan/extra shot — kustomisasi penuh hanya untuk minuman.
  const isDrink = type !== "pastry";

  // Customization State
  const [selectedTemp, setSelectedTemp] = useState(
    temp === "Hot" ? "Hot (Hangat)" : "Iced (Dingin)"
  );
  const [selectedMilk, setSelectedMilk] = useState("Oat Milk");
  const [milkExtra, setMilkExtra] = useState(0);
  const [selectedSugar, setSelectedSugar] = useState("50% (Sedang)");
  const [extraShot, setExtraShot] = useState(false);
  const [qty, setQty] = useState(1);

  // Live total calculation
  const basePrice = Number(price) || 42000;
  const unitPrice = basePrice + (isDrink ? milkExtra + (extraShot ? 8000 : 0) : 0);
  const totalPrice = unitPrice * qty;

  const handleMilkSelect = (milk, extra) => {
    setSelectedMilk(milk);
    setMilkExtra(extra);
  };

  const handleAddToCart = () => {
    // Kirim item + kustomisasi ke CartContext (satu sumber kebenaran keranjang).
    addItem(
      { id, title, price: basePrice },
      {
        temp: selectedTemp,
        milk: isDrink ? selectedMilk : "-",
        sugar: isDrink ? selectedSugar : "-",
        milkExtra: isDrink ? milkExtra : 0,
        extraShot: isDrink && extraShot,
        qty,
      }
    );
    Alert.alert(
      "Berhasil Ditambahkan! ☕",
      `${qty}x ${title} berhasil dimasukkan ke keranjang.\nTotal: Rp ${totalPrice.toLocaleString("id-ID")}`,
      [
        { text: "Lanjut Belanja", onPress: () => router.back() },
        { text: "Lihat Pesanan", onPress: () => router.navigate("/orders") },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F1F0EA" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Product Showcase Container */}
        <View style={styles.showcaseCard}>
          <View style={styles.iconBox}>
            <Feather name="coffee" size={40} color="#2D232E" />
          </View>
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>{category.toUpperCase()}</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.origin}>{origin}</Text>
          <Text style={styles.basePrice}>
            Rp {Number(price).toLocaleString("id-ID")}
          </Text>
        </View>
        {/* End Product Showcase Container */}

        {/* Temperature Container */}
        <View style={styles.optionBox}>
          <Text style={styles.optionTitle}>TEMPERATUR PENYAJIAN</Text>
          <View style={styles.pillsRow}>
            {["Iced (Dingin)", "Hot (Hangat)"].map((t) => (
              <Pressable
                key={t}
                style={[styles.pill, selectedTemp === t && styles.pillActive]}
                onPress={() => setSelectedTemp(t)}
              >
                <Text
                  style={[styles.pillText, selectedTemp === t && styles.pillTextActive]}
                >
                  {t}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        {/* End Temperature Container */}

        {/* Milk Base Container */}
        {isDrink && (
          <View style={styles.optionBox}>
            <Text style={styles.optionTitle}>PILIHAN SUSU</Text>
            <View style={styles.pillsRow}>
              {[
                { label: "Oat Milk (+0)", name: "Oat Milk", extra: 0 },
                { label: "Fresh Milk", name: "Fresh Milk", extra: 0 },
                { label: "Almond (+6k)", name: "Almond Milk", extra: 6000 },
              ].map((m) => (
                <Pressable
                  key={m.name}
                  style={[styles.pill, selectedMilk === m.name && styles.pillActive]}
                  onPress={() => handleMilkSelect(m.name, m.extra)}
                >
                  <Text
                    style={[
                      styles.pillText,
                      selectedMilk === m.name && styles.pillTextActive,
                    ]}
                  >
                    {m.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
        {/* End Milk Base Container */}

        {/* Sweetness Container */}
        {isDrink && (
          <View style={styles.optionBox}>
            <Text style={styles.optionTitle}>TINGKAT KEMANISAN</Text>
            <View style={styles.pillsRow}>
              {["50% (Sedang)", "100% (Normal)", "0% (Tanpa Gula)"].map((s) => (
                <Pressable
                  key={s}
                  style={[styles.pill, selectedSugar === s && styles.pillActive]}
                  onPress={() => setSelectedSugar(s)}
                >
                  <Text
                    style={[styles.pillText, selectedSugar === s && styles.pillTextActive]}
                  >
                    {s}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
        {/* End Sweetness Container */}

        {/* Extra Shot Switch Container */}
        {isDrink && (
          <View style={[styles.optionBox, styles.switchRow]}>
            <View>
              <Text style={{ fontSize: 13, fontWeight: "700", color: "#2D232E" }}>
                Extra Double Ristretto Shot
              </Text>
              <Text style={{ fontSize: 11, color: "#474448", marginTop: 2 }}>
                Kopi lebih pekat & bold (+Rp 8.000)
              </Text>
            </View>
            <Switch
              value={extraShot}
              onValueChange={setExtraShot}
              trackColor={{ false: "#D9D5CC", true: "#2D232E" }}
              thumbColor={extraShot ? "#E0DDCF" : "#FFFFFF"}
            />
          </View>
        )}
        {/* End Extra Shot Switch Container */}
      </ScrollView>

      {/* Sticky Bottom Bar Container */}
      <View style={styles.bottomBar}>
        <View style={styles.stepper}>
          <Pressable
            style={styles.stepBtn}
            onPress={() => setQty((q) => Math.max(1, q - 1))}
          >
            <Text style={styles.stepText}>-</Text>
          </Pressable>
          <Text style={styles.qtyText}>{qty}</Text>
          <Pressable style={styles.stepBtn} onPress={() => setQty((q) => q + 1)}>
            <Text style={styles.stepText}>+</Text>
          </Pressable>
        </View>

        <Pressable style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addText}>Tambah Pesanan</Text>
          <Text style={styles.addPrice}>
            Rp {totalPrice.toLocaleString("id-ID")}
          </Text>
        </Pressable>
      </View>
      {/* End Sticky Bottom Bar Container */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 110,
    gap: 14,
  },
  showcaseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.1)",
    gap: 6,
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: "#E0DDCF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  tagBadge: {
    backgroundColor: "#F1F0EA",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#534B52",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 19,
    fontWeight: "800",
    color: "#2D232E",
  },
  origin: {
    fontSize: 12,
    color: "#474448",
    textAlign: "center",
    lineHeight: 16,
  },
  basePrice: {
    fontSize: 17,
    fontWeight: "800",
    color: "#2D232E",
    marginTop: 4,
  },
  optionBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.1)",
    gap: 8,
  },
  optionTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#534B52",
    letterSpacing: 0.5,
  },
  pillsRow: {
    flexDirection: "row",
    gap: 8,
  },
  pill: {
    flex: 1,
    backgroundColor: "#F1F0EA",
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.08)",
  },
  pillActive: {
    backgroundColor: "#2D232E",
    borderColor: "#2D232E",
  },
  pillText: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#474448",
  },
  pillTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "rgba(45, 35, 46, 0.1)",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F0EA",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.1)",
  },
  stepBtn: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  stepText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2D232E",
  },
  qtyText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#2D232E",
    paddingHorizontal: 8,
  },
  addButton: {
    flex: 1,
    backgroundColor: "#2D232E",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  addPrice: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
});

export default Details;
