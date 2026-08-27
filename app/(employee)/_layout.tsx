import React from "react";

import { Tabs, router } from "expo-router";

import { CalendarDays, FileText, Home, Plus, User } from "lucide-react-native";

import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";

import { BlurView } from "expo-blur";

import { useTranslation, I18nextProvider } from "react-i18next";

import i18n from "../../constants/i18n";
function CustomTabBar({ state, descriptors, navigation }: any) {
  const { t } = useTranslation();

  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  /*
 Insert FAB in the middle  */
  const visibleRoutes = state.routes.filter(
    (route: any) =>
      ![
        "visit",
        "map",
        "edit-profile",
        "menu",
        "register-farmer",
        "attendance",
        "attendance/clock-in",
        "attendance/clock-out",
      ].includes(route.name) &&
      !route.name.startsWith("visit/") &&
      !route.name.startsWith("register-farmer/"),
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
              case "visits":
                return (
                  <CalendarDays
                    size={24}
                    color={color}
                    strokeWidth={isFocused ? 2.5 : 2}
                  />
                );
              case "reports":
                return (
                  <FileText
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

          const TabItem = (
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
          if (index === 1) {
            return (
              <React.Fragment key={route.key + "_fragment"}>
                {TabItem}
                <View key="fab" className="flex-1 items-center justify-center">
                  <TouchableOpacity
                    onPress={() =>
                      router.push("/(employee)/register-farmer/step1" as any)
                    }
                    className="w-14 h-14 bg-[#15803d] rounded-full items-center justify-center shadow-lg -mt-8 border-4 border-white"
                  >
                    <Plus size={32} color="#fff" strokeWidth={2.5} />
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            );
          }
          return TabItem;
        })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    borderRadius: 32,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 20,
    backgroundColor: "#1C1C1E", // solid fallback for dark mode
  },
  blurView: {
    flexDirection: "row",
    height: 72,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(28, 28, 30, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
});

import { TrackingProvider } from "../../context/TrackingContext";

export default function EmployeeLayout() {
  return (
    <TrackingProvider>
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
            name="visits"
            options={{
              title: "Visits",
            }}
          />
          <Tabs.Screen
            name="reports"
            options={{
              title: "Reports",
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
            }}
          />
          {/* Hidden Screens from Tab Bar */}
          <Tabs.Screen
            name="visit"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="map"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="edit-profile"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="attendance"
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
            name="register-farmer"
            options={{
              href: null,
            }}
          />
        </Tabs>
      </I18nextProvider>
    </TrackingProvider>
  );
}
