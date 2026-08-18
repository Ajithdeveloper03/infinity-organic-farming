import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Animated, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { router } from 'expo-router';
import { MapPin, Camera, CheckCircle2, Navigation, AlertCircle } from 'lucide-react-native';
import * as Location from 'expo-location';
import { Button } from '../../../components/ui/Button';
import { showToast } from '../../../components/ui/ToastMessage';
import { employeeProfile } from '../../../data/mockData';

export default function ClockInScreen() {
  const [loading, setLoading] = useState(false);
  const [locationGranted, setLocationGranted] = useState<boolean | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationGranted(false);
        Alert.alert('Permission Denied', 'You must enable location services to clock in for the day.');
        return;
      }
      setLocationGranted(true);
      
      try {
        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        setCurrentLocation(loc);
      } catch (e) {
        console.error("Location error", e);
      }
    })();
  }, []);

  const handleSimulateSelfie = () => {
    // In a real app, use expo-camera or expo-image-picker here
    setLoading(true);
    setTimeout(() => {
      setPhotoTaken(true);
      setLoading(false);
      showToast({ title: 'Selfie Captured', message: 'Identity verified successfully.', type: 'success' });
    }, 1500);
  };

  const handleClockIn = () => {
    if (!currentLocation) {
      showToast({ title: 'Location Required', message: 'Still acquiring your precise location. Please wait.', type: 'error' });
      return;
    }
    if (!photoTaken) {
      showToast({ title: 'Selfie Required', message: 'You must capture a selfie to clock in.', type: 'error' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast({ title: 'Clock In Successful', message: 'Have a productive day ahead!', type: 'success' });
      router.replace('/(employee)/dashboard');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        
        <Animated.View style={{ opacity: fadeAnim }} className="flex-1 px-6 pt-12 pb-12 items-center justify-center">
          
          <View className="mb-8 items-center">
            <Image 
              source={{ uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(employeeProfile.name)}&background=396216&color=fff&size=200` }}
              className="w-24 h-24 rounded-full border-4 border-green-50 shadow-md mb-4"
            />
            <Text className="text-gray-900 font-gotham-bold text-2xl text-center">Good Morning,</Text>
            <Text className="text-gray-900 font-gotham-bold text-2xl text-center mb-2">{employeeProfile.name}</Text>
            <Text className="text-gray-500 font-brandon text-base text-center px-4">Please complete your morning attendance to start your workflow.</Text>
          </View>

          <View className="w-full mb-6">
            <View className="bg-gray-50 rounded-2xl p-5 mb-4 border border-gray-100 flex-row items-center">
               <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${currentLocation ? 'bg-green-100' : 'bg-gray-200'}`}>
                 {currentLocation ? <MapPin size={24} color="#15803d" /> : <Navigation size={24} color="#9ca3af" />}
               </View>
               <View className="flex-1">
                 <Text className="text-gray-900 font-gotham-bold text-base mb-1">Location Check</Text>
                 {currentLocation ? (
                   <Text className="text-[#15803d] font-brandon-medium text-xs">Acquired (Accuracy: {Math.round(currentLocation.coords.accuracy || 0)}m)</Text>
                 ) : (
                   <Text className="text-gray-500 font-brandon text-xs">Acquiring GPS location...</Text>
                 )}
               </View>
               {currentLocation && <CheckCircle2 size={24} color="#15803d" />}
            </View>

            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={handleSimulateSelfie}
              disabled={photoTaken || loading}
              className={`rounded-2xl p-5 border flex-row items-center ${photoTaken ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 shadow-sm'}`}
            >
               <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${photoTaken ? 'bg-green-200' : 'bg-blue-50'}`}>
                 <Camera size={24} color={photoTaken ? "#15803d" : "#3b82f6"} />
               </View>
               <View className="flex-1">
                 <Text className="text-gray-900 font-gotham-bold text-base mb-1">Verify Identity</Text>
                 <Text className={`${photoTaken ? 'text-[#15803d]' : 'text-gray-500'} font-brandon text-xs`}>
                   {photoTaken ? 'Selfie captured successfully' : 'Take a live selfie'}
                 </Text>
               </View>
               {photoTaken && <CheckCircle2 size={24} color="#15803d" />}
            </TouchableOpacity>
          </View>

          {!locationGranted && locationGranted !== null && (
             <View className="flex-row items-center bg-red-50 p-3 rounded-xl mb-6">
               <AlertCircle size={16} color="#ef4444" className="mr-2" />
               <Text className="text-red-700 font-brandon text-xs flex-1">Location permission is required to log attendance.</Text>
             </View>
          )}

          <Button 
            title="Clock In & Start Day" 
            onPress={handleClockIn}
            loading={loading && !photoTaken} // Don't show loading on button if taking photo
            disabled={!currentLocation || !photoTaken}
            className={`w-full py-4 rounded-xl ${(!currentLocation || !photoTaken) ? 'bg-gray-300' : 'bg-[#15803d]'}`}
          />
          
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
