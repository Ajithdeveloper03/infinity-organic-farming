import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Bell,
  Globe,
  CloudOff,
  Database,
  PhoneCall,
  Shield,
  LogOut,
  MapPin,
  ClipboardList,
} from "lucide-react-native";
import { useLanguage } from "../../context/LanguageContext";

export default function MenuScreen() {
  const { t } = useLanguage();

  const menuGroups = [
    {
      title: "Field Operations",
      items: [
        { icon: ClipboardList, label: "Daily Attendance", route: "/(employee)/attendance", color: "#10b981" },
        { icon: MapPin, label: "Assigned Territories", route: "/(employee)/my-farmers", color: "#3b82f6" },
      ],
    },
    {
      title: "Account & Preferences",
      items: [
        { icon: User, label: "Edit Profile", route: "/(employee)/edit-profile", color: "#f59e0b" },
        { icon: Globe, label: "Language Settings", route: "/(employee)/language", color: "#6366f1" },
        { icon: Bell, label: "Push Notifications", route: null, color: "#ec4899" },
      ],
    },
    {
      title: "System",
      items: [
        { icon: CloudOff, label: "Offline Sync", route: null, color: "#14b8a6" },
        { icon: Database, label: "Storage Management", route: null, color: "#64748b" },
        { icon: Shield, label: "Privacy & Security", route: null, color: "#0f172a" },
        { icon: PhoneCall, label: "IT Support", route: null, color: "#ef4444" },
      ],
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#f8faf9" }}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={{ flex: 1 }}>
        
        {/* HEADER */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 }}>
          <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace("/(employee)/dashboard")} style={{ padding: 8, backgroundColor: "#ffffff", borderRadius: 999, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
            <ChevronLeft size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 20 }}>Settings & Menu</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}>
          
          {menuGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={{ marginBottom: 32 }}>
              <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Bold", fontSize: 13, letterSpacing: 1, marginBottom: 16, marginLeft: 8 }}>
                {group.title.toUpperCase()}
              </Text>
              
              <View style={{ backgroundColor: "#ffffff", borderRadius: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 4 }}>
                {group.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <TouchableOpacity 
                      key={itemIndex}
                      onPress={() => item.route && router.push(item.route as any)}
                      style={{ 
                        flexDirection: "row", alignItems: "center", padding: 16,
                        borderBottomWidth: itemIndex === group.items.length - 1 ? 0 : 1,
                        borderBottomColor: "#f1f5f9"
                      }}
                    >
                      <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: `${item.color}15`, alignItems: "center", justifyContent: "center", marginRight: 16 }}>
                        <Icon size={20} color={item.color} />
                      </View>
                      <Text style={{ flex: 1, color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 16 }}>{item.label}</Text>
                      <ChevronRight size={20} color="#cbd5e1" />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}

          {/* LOGOUT BUTTON */}
          <TouchableOpacity 
            onPress={() => router.replace("/intro")}
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#fee2e2", paddingVertical: 16, borderRadius: 999, marginTop: 16 }}
          >
            <LogOut size={20} color="#ef4444" style={{ marginRight: 8 }} />
            <Text style={{ color: "#ef4444", fontFamily: "Brandon-Bold", fontSize: 16 }}>Log Out Securely</Text>
          </TouchableOpacity>

          <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Medium", fontSize: 13, textAlign: "center", marginTop: 24 }}>
            Infinity Organics v2.0.1
          </Text>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
