import React from "react";

import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";

import { Tabs } from "expo-router";

import { CalendarDays, Home, User, FileText } from "lucide-react-native";

import { BlurView } from "expo-blur";

function CustomTabBar({ state, descriptors, navigation }: any) {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  const visibleRoutes = state.routes.filter(
    (route: any) =>
      ["dashboard", "documents", "farm", "profile"].includes(route.name)
  );
  return (
    <View style={styles.container}>
      <BlurView
        intensity={80}
        tint="light"
        style={styles.blurView}
        className="border border-gray-200"
      >
        {visibleRoutes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused =
            state.index ===
            state.routes.findIndex((r: any) => r.key === route.key);

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const getIcon = () => {
            const activeColor = "#15803d";

            const inactiveColor = "#6b7280";

            const color = isFocused ? activeColor : inactiveColor;
            switch (route.name) {
              case "dashboard":
                return (
                  <Home
                    size={24}
                    color={color}
                    strokeWidth={isFocused ? 2.5 : 2}
                  />
                );
              case "documents":
                return (
                  <FileText
                    size={24}
                    color={color}
                    strokeWidth={isFocused ? 2.5 : 2}
                  />
                );
              case "farm":
                return (
                  <CalendarDays
                    size={24}
                    color={color}
                    strokeWidth={isFocused ? 2.5 : 2}
                  />
                );
              case "profile":
                return (
                  <User
                    size={24}
                    color={color}
                    strokeWidth={isFocused ? 2.5 : 2}
                  />
                );
              default:
                return null;
            }
          };
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={
                isFocused
                  ? {
                      selected: true,
                    }
                  : {}
              }
              onPress={onPress}
              className="flex-1 items-center justify-center pt-1 group h-full"
            >
              {getIcon()}
              <Text
                className={`text-[10px] mt-1 font-brandon-medium ${isFocused ? "text-green-800 font-bold" : "text-gray-500"}`}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 35,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    backgroundColor: "#ffffff", // solid fallback
  },
  blurView: {
    flexDirection: "row",
    height: 70,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
  },
});

export default function FarmerLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="documents"
          options={{
            title: "Docs",
          }}
        />
        <Tabs.Screen
          name="farm"
          options={{
            title: "Farm",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
          }}
        />
        {/* Hidden Screens */}
        <Tabs.Screen
          name="visit"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="rate"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="recommendations"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="support"
          options={{
            href: null,
          }}
        />
      </Tabs>
  );
}
