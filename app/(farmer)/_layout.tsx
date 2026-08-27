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

import { useTranslation, I18nextProvider } from "react-i18next";

import i18n from "../../constants/i18n";
function CustomTabBar({ state, descriptors, navigation }: any) {
  const { t } = useTranslation();

  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  const visibleRoutes = state.routes.filter(
    (route: any) =>
      ![
        "visit",
        "rate",
        "menu",
        "history",
        "notifications",
        "recommendations",
        "support",
      ].includes(route.name) &&
      !route.name.startsWith("visit/") &&
      !route.name.startsWith("rate/"),
  );
  return (
    <View style={styles.container}>
      <BlurView
        intensity={80}
        tint={isDark ? "dark" : "light"}
        style={styles.blurView}
        className="border border-white/20"
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
            const activeColor = isDark ? "#fff" : "#15803d";

            const inactiveColor = isDark ? "#9ca3af" : "#6b7280";

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
                className={`text-[10px] mt-1 font-brandon-medium ${isFocused ? (isDark ? "text-gray-900 font-bold" : "text-green-800 font-bold") : isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                {t(label)}
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
    elevation: 10,
  },
  blurView: {
    flexDirection: "row",
    height: 70,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
});

export default function FarmerLayout() {
  return (
    <I18nextProvider i18n={i18n}>
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
    </I18nextProvider>
  );
}
