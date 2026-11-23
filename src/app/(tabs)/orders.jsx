import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const Orders = () => {
  const [orderType, setOrderType] = useState("dinein");
  const [items, setItems] = useState([
    {
      id: "1",
      title: "Oat Sea Salt Cortado",
      desc: "Iced · Oat Milk · 50% Sugar",
      price: 42000,
      qty: 1,
    },
    {
      id: "2",
      title: "Artisan Almond Croissant",
      desc: "Warm Toasted",
      price: 32000,
      qty: 1,
    },
  ]);

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const tax = Math.round(subtotal * 0.1);
  const discount = subtotal >= 30000 ? 10000 : 0;
  const grandTotal = Math.max(0, subtotal + tax - discount);

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert("Keranjang Kosong", "Silakan pilih menu terlebih dahulu.");
      return;
    }
    Alert.alert(
      "Pesanan Diterima! ☕",
      `Nomor Antrean: #ST-${Math.floor(1000 + Math.random() * 9000)}\nTotal: Rp ${grandTotal.toLocaleString("id-ID")}\nEstimasi waktu: 6-8 menit.`,
      [{ text: "OK", onPress: () => setItems([]) }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40, gap: 16 }}>
      {/* Order Type Container */}
      <View style={styles.typeContainer}>
        <Pressable
          style={[styles.typeButton, orderType === "dinein" && styles.typeButtonActive]}
          onPress={() => setOrderType("dinein")}
        >
          <Text style={[styles.typeText, orderType === "dinein" && styles.typeTextActive]}>
            🍽️ Dine-in (Meja 04)
          </Text>
        </Pressable>
        <Pressable
          style={[styles.typeButton, orderType === "takeaway" && styles.typeButtonActive]}
          onPress={() => setOrderType("takeaway")}
        >
          <Text style={[styles.typeText, orderType === "takeaway" && styles.typeTextActive]}>
            🛍️ Takeaway
          </Text>
        </Pressable>
      </View>
      {/* End Order Type Container */}

      {/* Cart Items Container */}
      <View style={{ gap: 10 }}>
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="shopping-bag" size={40} color="#534B52" />
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#2D232E", marginTop: 8 }}>
              Keranjang Kosong
            </Text>
            <Text style={{ fontSize: 12, color: "#474448", marginTop: 2 }}>
              Silakan pilih menu di tab Menu.
            </Text>
          </View>
        ) : (
          items.map((item) => (
            <View key={item.id} style={styles.cartCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cartTitle}>{item.title}</Text>
                <Text style={styles.cartDesc}>{item.desc}</Text>
                <Text style={styles.cartPrice}>
                  Rp {(item.price * item.qty).toLocaleString("id-ID")}
                </Text>
              </View>

              {/* Stepper */}
              <View style={styles.stepper}>
                <Pressable style={styles.stepBtn} onPress={() => updateQty(item.id, -1)}>
                  <Text style={styles.stepText}>-</Text>
                </Pressable>
                <Text style={styles.qtyText}>{item.qty}</Text>
                <Pressable style={styles.stepBtn} onPress={() => updateQty(item.id, 1)}>
                  <Text style={styles.stepText}>+</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </View>
      {/* End Cart Items Container */}

    </ScrollView>
  );
};