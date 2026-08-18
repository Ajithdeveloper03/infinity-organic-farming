import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, User, MapPin, ShieldCheck, Phone, Mail, FileText, Lock } from 'lucide-react-native';

export default function FarmerProfileScreen() {
  const [activeTab, setActiveTab] = useState<'personal' | 'kyc' | 'land'>('personal');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 flex-row items-center bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-4" activeOpacity={0.7}>
           <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-gotham-bold">My Profile</Text>
      </View>

      <ScrollView className="flex-1 pb-24" showsVerticalScrollIndicator={false}>
        
        {/* Banner and Profile Card */}
        <View className="bg-white mx-6 mt-6 rounded-3xl overflow-hidden shadow-sm border border-gray-100">
           {/* Top Landscape Banner */}
           <View className="h-32 bg-gray-200">
             <Image 
               source={{uri: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop'}}
               className="w-full h-full"
             />
           </View>

           {/* Profile Picture (overlapping) */}
           <View className="items-center -mt-12 mb-3">
             <View className="w-24 h-24 bg-white rounded-full p-1 shadow-sm">
                <Image 
                  source={{uri: 'https://ui-avatars.com/api/?name=Kuppusamy&background=15803d&color=fff&size=200'}}
                  className="w-full h-full rounded-full"
                />
             </View>
           </View>

           {/* Quick Details */}
           <View className="items-center px-6 mb-6">
             <Text className="text-gray-900 text-xl font-gotham-bold mb-1">Kuppusamy</Text>
             <Text className="text-gray-500 font-brandon-medium mb-1">Farmer ID: FM10008</Text>
           </View>
        </View>

        {/* Tab Switcher */}
        <View className="flex-row mx-6 mt-6 bg-gray-200/50 p-1 rounded-2xl">
          <TouchableOpacity 
            onPress={() => setActiveTab('personal')}
            activeOpacity={0.8}
            className={`flex-1 py-3 items-center rounded-xl ${activeTab === 'personal' ? 'bg-white shadow-sm' : ''}`}
          >
            <Text className={`font-gotham-bold text-sm ${activeTab === 'personal' ? 'text-gray-900' : 'text-gray-500'}`}>Personal</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('kyc')}
            activeOpacity={0.8}
            className={`flex-1 py-3 items-center rounded-xl ${activeTab === 'kyc' ? 'bg-white shadow-sm' : ''}`}
          >
            <Text className={`font-gotham-bold text-sm ${activeTab === 'kyc' ? 'text-gray-900' : 'text-gray-500'}`}>KYC Docs</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('land')}
            activeOpacity={0.8}
            className={`flex-1 py-3 items-center rounded-xl ${activeTab === 'land' ? 'bg-white shadow-sm' : ''}`}
          >
            <Text className={`font-gotham-bold text-sm ${activeTab === 'land' ? 'text-gray-900' : 'text-gray-500'}`}>Land Details</Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Content */}
        <View className="mx-6 mt-6 mb-12">
          {activeTab === 'personal' && (
            <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <View className="bg-blue-50 p-4 rounded-xl mb-6 flex-row items-start border border-blue-100">
                <Lock size={20} color="#3b82f6" className="mt-0.5 mr-3" />
                <Text className="flex-1 text-blue-800 font-brandon text-sm leading-5">
                  Your profile is verified. To update these details, please contact your assigned Field Officer or Support.
                </Text>
              </View>

              <InfoRow icon={Phone} label="Mobile Number" value="+91 98765 43210" />
              <InfoRow icon={Mail} label="Email Address" value="kuppusamy@example.com" />
              <InfoRow icon={MapPin} label="Village" value="Somanur" />
              <InfoRow icon={MapPin} label="Taluk" value="Sulur" />
              <InfoRow icon={MapPin} label="District" value="Coimbatore" isLast />
            </View>
          )}

          {activeTab === 'kyc' && (
            <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <View className="bg-green-50 p-4 rounded-xl mb-6 flex-row items-center border border-green-100">
                <ShieldCheck size={24} color="#15803d" className="mr-3" />
                <Text className="flex-1 text-green-800 font-gotham-bold text-sm">KYC Verified & Approved</Text>
              </View>

              <InfoRow icon={FileText} label="Aadhaar Number" value="XXXX XXXX 4321" />
              <InfoRow icon={FileText} label="PAN Number" value="ABCDE1234F" />
              <InfoRow icon={User} label="Bank Account" value="State Bank of India" />
              <InfoRow icon={FileText} label="Account Number" value="XXXXXXXXXX8901" isLast />
            </View>
          )}

          {activeTab === 'land' && (
            <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <InfoRow icon={MapPin} label="Total Area" value="2.5 Acres" />
              <InfoRow icon={FileText} label="Survey Number" value="SF 102/3B" />
              <InfoRow icon={MapPin} label="Soil Type" value="Red Soil (Semman)" />
              <InfoRow icon={FileText} label="Irrigation Source" value="Borewell" />
              <InfoRow icon={FileText} label="Primary Crop" value="Vetiver (Khus)" isLast />
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const InfoRow = ({ icon: Icon, label, value, isLast = false }: any) => (
  <View className={`flex-row items-center py-4 ${!isLast ? 'border-b border-gray-100' : ''}`}>
    <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-4">
      <Icon size={20} color="#6b7280" />
    </View>
    <View className="flex-1">
      <Text className="text-gray-400 text-xs font-brandon-medium mb-0.5">{label}</Text>
      <Text className="text-gray-900 font-gotham-bold text-sm">{value}</Text>
    </View>
  </View>
);
