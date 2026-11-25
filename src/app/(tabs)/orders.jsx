import React, { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ShoppingBag } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useCart } from "../../context/CartContext";

const Orders = () => {
  const router = useRouter();
  // Keranjang hidup di CartContext — details dan orders memakai data yang sama.
  const { items, updateQty, clearCart } = useCart();
  const [orderType, setOrderType] = useState("dinein");

  const subtotal = useMemo(
    () => items.reduce((acc, curr) => acc + curr.price * curr.qty, 0),
    [items]
  );
  const tax = Math.round(subtotal * 0.1);
  // Voucher flat Rp 10.000 untuk pembelian minimal Rp 30.000.
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
      [
        {
          text: "OK",
          onPress: () => {
            clearCart();
            router.navigate("/(tabs)/menu");
          },
        },
      ]
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
            <ShoppingBag size={40} color="#534B52" />
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#2D232E", marginTop: 8 }}>
              Keranjang Kosong
            </Text>
            <Text style={{ fontSize: 12, color: "#474448", marginTop: 2 }}>
              Silakan pilih menu di tab Menu.
            </Text>
          </View>
        ) : (
          items.map((item) => (
            <View key={item.cartId} style={styles.cartCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cartTitle}>{item.title}</Text>
                <Text style={styles.cartDesc}>{item.desc}</Text>
                <Text style={styles.cartPrice}>
                  Rp {(item.price * item.qty).toLocaleString("id-ID")}
                </Text>
              </View>

              {/* Stepper */}
              <View style={styles.stepper}>
                <Pressable style={styles.stepBtn} onPress={() => updateQty(item.cartId, -1)}>
                  <Text style={styles.stepText}>-</Text>
                </Pressable>
                <Text style={styles.qtyText}>{item.qty}</Text>
                <Pressable style={styles.stepBtn} onPress={() => updateQty(item.cartId, 1)}>
                  <Text style={styles.stepText}>+</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </View>
      {/* End Cart Items Container */}

      {/* Bill Summary Container */}
      {items.length > 0 && (
        <View style={styles.billCard}>
          <Text style={styles.billTitle}>Rincian Tagihan</Text>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Subtotal</Text>
            <Text style={styles.billValue}>Rp {subtotal.toLocaleString("id-ID")}</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Pajak Restoran PB1 (10%)</Text>
            <Text style={styles.billValue}>Rp {tax.toLocaleString("id-ID")}</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={[styles.billLabel, { color: "#2E7D32" }]}>
              Voucher Diskon (min. belanja Rp 30.000)
            </Text>
            <Text style={[styles.billValue, { color: "#2E7D32" }]}>
              -Rp {discount.toLocaleString("id-ID")}
            </Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.billRow}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>Rp {grandTotal.toLocaleString("id-ID")}</Text>
          </View>

          <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>
              Place Order Sekarang · Rp {grandTotal.toLocaleString("id-ID")}
            </Text>
          </Pressable>
        </View>
      )}
      {/* End Bill Summary Container */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0EA",
    padding: 20,
  },
  typeContainer: {
    flexDirection: "row",
    backgroundColor: "#E0DDCF",
    borderRadius: 12,
    padding: 3,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 9,
    alignItems: "center",
    borderRadius: 10,
  },
  typeButtonActive: {
    backgroundColor: "#2D232E",
  },
  typeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#474448",
  },
  typeTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  cartCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.1)",
  },
  cartTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2D232E",
  },
  cartDesc: {
    fontSize: 11,
    color: "#474448",
    marginTop: 2,
  },
  cartPrice: {
    fontSize: 13,
    fontWeight: "800",
    color: "#2D232E",
    marginTop: 6,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F0EA",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.1)",
  },
  stepBtn: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  stepText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#2D232E",
  },
  qtyText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2D232E",
    paddingHorizontal: 6,
  },
  billCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.1)",
    gap: 8,
  },
  billTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#2D232E",
    marginBottom: 4,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  billLabel: {
    fontSize: 12,
    color: "#474448",
  },
  billValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2D232E",
  },
  separator: {
    borderTopWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.08)",
    marginVertical: 4,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2D232E",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2D232E",
  },
  checkoutButton: {
    backgroundColor: "#2D232E",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  checkoutText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(45, 35, 46, 0.1)",
  },
});

export default Orders;
