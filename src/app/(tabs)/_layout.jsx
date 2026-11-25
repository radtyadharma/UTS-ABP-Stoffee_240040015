import { Home, Coffee, ShoppingBag, User } from "lucide-react-native";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2D232E",
        tabBarInactiveTintColor: "#474448",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "rgba(45, 35, 46, 0.1)",
        },
        headerStyle: {
          backgroundColor: "#F1F0EA",
        },
        headerTintColor: "#2D232E",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Home size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          headerTitle: "Menu & Katalog",
          tabBarIcon: ({ color }) => (
            <Coffee size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Pesanan",
          headerTitle: "Pesanan Saya",
          tabBarIcon: ({ color }) => (
            <ShoppingBag size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          headerTitle: "Profil Pelanggan",
          tabBarIcon: ({ color }) => (
            <User size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
