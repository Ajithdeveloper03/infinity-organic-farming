import { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function IndexScreen() {
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const textOpacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Bouncy Logo Reveal
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          tension: 60,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // 2. Text Fade In
      Animated.timing(textOpacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // 3. Route after delay
    const timer = setTimeout(() => {
      router.replace("/intro");
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* LOGO CONTAINER */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Animated.Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      
      {/* TEXT */}
      <Animated.View style={[styles.textContainer, { opacity: textOpacityAnim }]}>
        <Text style={styles.title}>INFINITY ORGANICS</Text>
        <Text style={styles.subtitle}>Eco Agronomy Platform</Text>
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#062214", // Solid Dark Green
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#ffffff", // White background for logo
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  logo: {
    width: 130,
    height: 130,
  },
  textContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  title: {
    color: "#ffffff",
    fontFamily: "Brandon-Bold",
    fontSize: 26,
    letterSpacing: 4,
    marginBottom: 8,
  },
  subtitle: {
    color: "#4ade80",
    fontFamily: "Brandon-Medium",
    fontSize: 14,
    letterSpacing: 2,
  },
});