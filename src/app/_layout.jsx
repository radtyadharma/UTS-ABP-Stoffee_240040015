import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";

// Layout utama: membungkus seluruh aplikasi dengan CartProvider,
// supaya state keranjang bisa diakses dari screen mana pun (Home, Menu, Details, Orders).
const Layout = () => {
  return (
    <CartProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2D232E",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details" options={{ headerTitle: "Detail Menu" }} />
      </Stack>
    </CartProvider>
  );
};

export default Layout;
