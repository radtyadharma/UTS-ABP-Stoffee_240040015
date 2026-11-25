import { Stack } from "expo-router";

const Layout = () => {
  return (
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
      <Stack.Screen
        name="promo"
        options={{ headerTitle: "Promo Spesial", presentation: "modal" }}
      />
    </Stack>
  );
};

export default Layout;
