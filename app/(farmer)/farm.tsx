import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ChevronLeft,
  MapPin,
  User,
  Building2,
  FileText,
  Leaf,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Map
} from "lucide-react-native";

export default function FarmerDetailsScreen() {
  const [expandedSection, setExpandedSection] = useState("personal");

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? "" : section);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={{ flex: 1 }}>
        
        {/* HEADER */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 }}>
          <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace("/(farmer)/dashboard")} style={{ padding: 8, backgroundColor: "#ffffff", borderRadius: 999, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}>
            <ChevronLeft size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 20 }}>Complete Profile</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 150 }}>
          
          {/* TOP SUMMARY */}
          <View style={{ alignItems: "center", marginBottom: 32 }}>
            <View style={{ width: 88, height: 88, borderRadius: 44, backgroundColor: "#ffffff", padding: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5, marginBottom: 16 }}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80" }} style={{ width: "100%", height: "100%", borderRadius: 40 }} />
            </View>
            <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 24 }}>Muthuvel</Text>
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#ecfdf5", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999, marginTop: 8 }}>
              <CheckCircle2 size={14} color="#10b981" />
              <Text style={{ color: "#065f46", fontFamily: "Brandon-Bold", fontSize: 12, marginLeft: 6 }}>100% VERIFIED</Text>
            </View>
          </View>

          {/* ACCORDION SECTIONS */}

          {/* 1. Personal & Contact Details */}
          <View style={{ backgroundColor: "#ffffff", borderRadius: 24, marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2, borderWidth: 1, borderColor: expandedSection === "personal" ? "#10b981" : "#f1f5f9", overflow: "hidden" }}>
            <TouchableOpacity onPress={() => toggleSection("personal")} style={{ flexDirection: "row", alignItems: "center", padding: 20 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#f0fdfa", alignItems: "center", justifyContent: "center", marginRight: 16 }}>
                <User size={20} color="#0d9488" />
              </View>
              <Text style={{ flex: 1, color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 16 }}>Personal Information</Text>
              {expandedSection === "personal" ? <ChevronUp size={20} color="#94a3b8" /> : <ChevronDown size={20} color="#94a3b8" />}
            </TouchableOpacity>
            
            {expandedSection === "personal" && (
              <View style={{ paddingHorizontal: 20, paddingBottom: 20, paddingTop: 4, borderTopWidth: 1, borderTopColor: "#f1f5f9" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
                  <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 14 }}>Full Name</Text>
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 14 }}>Muthuvel S.</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
                  <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 14 }}>Phone Number</Text>
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 14 }}>+91 98765 43210</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
                  <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 14 }}>Aadhar Number</Text>
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 14 }}>XXXX XXXX 8942</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 14 }}>Date of Birth</Text>
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 14 }}>14 Oct 1982</Text>
                </View>
              </View>
            )}
          </View>

          {/* 2. Address & Geography */}
          <View style={{ backgroundColor: "#ffffff", borderRadius: 24, marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2, borderWidth: 1, borderColor: expandedSection === "address" ? "#10b981" : "#f1f5f9", overflow: "hidden" }}>
            <TouchableOpacity onPress={() => toggleSection("address")} style={{ flexDirection: "row", alignItems: "center", padding: 20 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#fffbeb", alignItems: "center", justifyContent: "center", marginRight: 16 }}>
                <MapPin size={20} color="#f59e0b" />
              </View>
              <Text style={{ flex: 1, color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 16 }}>Address Details</Text>
              {expandedSection === "address" ? <ChevronUp size={20} color="#94a3b8" /> : <ChevronDown size={20} color="#94a3b8" />}
            </TouchableOpacity>
            
            {expandedSection === "address" && (
              <View style={{ paddingHorizontal: 20, paddingBottom: 20, paddingTop: 4, borderTopWidth: 1, borderTopColor: "#f1f5f9" }}>
                <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 15, marginBottom: 4 }}>42, Pillaiyar Koil Street</Text>
                <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 14, marginBottom: 2 }}>Annur North, Coimbatore South</Text>
                <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 14, marginBottom: 16 }}>Tamil Nadu - 641653</Text>
                
                <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#f8fafc", padding: 12, borderRadius: 12 }}>
                  <Map size={16} color="#0f172a" style={{ marginRight: 8 }} />
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 13 }}>GPS: 11.0168° N, 76.9558° E</Text>
                </View>
              </View>
            )}
          </View>

          {/* 3. Bank & Financial */}
          <View style={{ backgroundColor: "#ffffff", borderRadius: 24, marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2, borderWidth: 1, borderColor: expandedSection === "bank" ? "#10b981" : "#f1f5f9", overflow: "hidden" }}>
            <TouchableOpacity onPress={() => toggleSection("bank")} style={{ flexDirection: "row", alignItems: "center", padding: 20 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#eff6ff", alignItems: "center", justifyContent: "center", marginRight: 16 }}>
                <Building2 size={20} color="#3b82f6" />
              </View>
              <Text style={{ flex: 1, color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 16 }}>Bank Information</Text>
              {expandedSection === "bank" ? <ChevronUp size={20} color="#94a3b8" /> : <ChevronDown size={20} color="#94a3b8" />}
            </TouchableOpacity>
            
            {expandedSection === "bank" && (
              <View style={{ paddingHorizontal: 20, paddingBottom: 20, paddingTop: 4, borderTopWidth: 1, borderTopColor: "#f1f5f9" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
                  <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 14 }}>Bank Name</Text>
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 14 }}>State Bank of India</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
                  <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 14 }}>Branch</Text>
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 14 }}>Annur Main Branch</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
                  <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 14 }}>Account Number</Text>
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 14 }}>XXXX-XXXX-9902</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 14 }}>IFSC Code</Text>
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 14 }}>SBIN000XXXX</Text>
                </View>
              </View>
            )}
          </View>

          {/* 4. Farm & Land Details */}
          <View style={{ backgroundColor: "#ffffff", borderRadius: 24, marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2, borderWidth: 1, borderColor: expandedSection === "farm" ? "#10b981" : "#f1f5f9", overflow: "hidden" }}>
            <TouchableOpacity onPress={() => toggleSection("farm")} style={{ flexDirection: "row", alignItems: "center", padding: 20 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#ecfdf5", alignItems: "center", justifyContent: "center", marginRight: 16 }}>
                <Leaf size={20} color="#10b981" />
              </View>
              <Text style={{ flex: 1, color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 16 }}>Farm & Land Details</Text>
              {expandedSection === "farm" ? <ChevronUp size={20} color="#94a3b8" /> : <ChevronDown size={20} color="#94a3b8" />}
            </TouchableOpacity>
            
            {expandedSection === "farm" && (
              <View style={{ paddingHorizontal: 20, paddingBottom: 20, paddingTop: 4, borderTopWidth: 1, borderTopColor: "#f1f5f9" }}>
                
                <View style={{ backgroundColor: "#f8fafc", padding: 16, borderRadius: 16, marginBottom: 16 }}>
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 16, marginBottom: 12 }}>Primary Crop: Vetiver</Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                    <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 13 }}>Variety</Text>
                    <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 13 }}>KS-1</Text>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                    <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 13 }}>Acreage</Text>
                    <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 13 }}>2.5 Acres</Text>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 13 }}>Certification</Text>
                    <Text style={{ color: "#10b981", fontFamily: "Brandon-Bold", fontSize: 13 }}>100% Organic</Text>
                  </View>
                </View>

                <View style={{ backgroundColor: "#f8fafc", padding: 16, borderRadius: 16 }}>
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 16, marginBottom: 12 }}>Secondary Crop: Banana</Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                    <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 13 }}>Variety</Text>
                    <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 13 }}>Grand Naine</Text>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                    <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 13 }}>Acreage</Text>
                    <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 13 }}>1.2 Acres</Text>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 13 }}>Certification</Text>
                    <Text style={{ color: "#10b981", fontFamily: "Brandon-Bold", fontSize: 13 }}>100% Organic</Text>
                  </View>
                </View>

              </View>
            )}
          </View>

          {/* 5. Uploaded Documents */}
          <View style={{ backgroundColor: "#ffffff", borderRadius: 24, marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2, borderWidth: 1, borderColor: expandedSection === "docs" ? "#10b981" : "#f1f5f9", overflow: "hidden" }}>
            <TouchableOpacity onPress={() => toggleSection("docs")} style={{ flexDirection: "row", alignItems: "center", padding: 20 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#fdf4ff", alignItems: "center", justifyContent: "center", marginRight: 16 }}>
                <FileText size={20} color="#d946ef" />
              </View>
              <Text style={{ flex: 1, color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 16 }}>Official Documents</Text>
              {expandedSection === "docs" ? <ChevronUp size={20} color="#94a3b8" /> : <ChevronDown size={20} color="#94a3b8" />}
            </TouchableOpacity>
            
            {expandedSection === "docs" && (
              <View style={{ paddingHorizontal: 20, paddingBottom: 20, paddingTop: 4, borderTopWidth: 1, borderTopColor: "#f1f5f9" }}>
                
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Medium", fontSize: 15 }}>Aadhar Card</Text>
                  <View style={{ backgroundColor: "#ecfdf5", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 }}>
                    <Text style={{ color: "#10b981", fontFamily: "Brandon-Bold", fontSize: 12 }}>Verified</Text>
                  </View>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Medium", fontSize: 15 }}>Bank Passbook</Text>
                  <View style={{ backgroundColor: "#ecfdf5", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 }}>
                    <Text style={{ color: "#10b981", fontFamily: "Brandon-Bold", fontSize: 12 }}>Verified</Text>
                  </View>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Medium", fontSize: 15 }}>Chitta / Patta (Land Docs)</Text>
                  <View style={{ backgroundColor: "#ecfdf5", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 }}>
                    <Text style={{ color: "#10b981", fontFamily: "Brandon-Bold", fontSize: 12 }}>Verified</Text>
                  </View>
                </View>

              </View>
            )}
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
