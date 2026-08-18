import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, MoreHorizontal, MapPin, Navigation, ShieldAlert, X } from 'lucide-react-native';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from '../../../components/MapView';
import { getVisitWithFarmer, employeeProfile } from '../../../data/mockData';
import * as Location from 'expo-location';
import { showToast } from '../../../components/ui/ToastMessage';

export default function TrackingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const visit = id ? getVisitWithFarmer(id) : null;
  
  const mapRef = useRef<MapView>(null);
  
  const [duration, setDuration] = useState(0);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<Array<{latitude: number, longitude: number}>>([]);
  const [speed, setSpeed] = useState(0);

  // Stop Tracking Modal State
  const [showStopModal, setShowStopModal] = useState(false);
  const [stopReason, setStopReason] = useState('');
  const [adminOtp, setAdminOtp] = useState('');
  const [submittingStop, setSubmittingStop] = useState(false);

  useEffect(() => {
    // Duration Timer
    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;
    
    (async () => {
      // Request permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to track your movement. Please enable it in settings.');
        return;
      }

      // Get initial position to center map instantly
      const initialLoc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setCurrentLocation(initialLoc);
      setRouteCoordinates([{ latitude: initialLoc.coords.latitude, longitude: initialLoc.coords.longitude }]);

      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: initialLoc.coords.latitude,
          longitude: initialLoc.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }

      // Watch position for continuous updates
      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 2000,
          distanceInterval: 1, // update every 1 meter
        },
        (location) => {
          setCurrentLocation(location);
          setSpeed(location.coords.speed || 0); // speed in m/s
          
          setRouteCoordinates((prev) => {
            const newCoord = { latitude: location.coords.latitude, longitude: location.coords.longitude };
            return [...prev, newCoord];
          });

          // Animate map to follow user
          if (mapRef.current) {
            mapRef.current.animateCamera({
              center: { latitude: location.coords.latitude, longitude: location.coords.longitude },
              heading: location.coords.heading || 0,
            }, { duration: 1000 });
          }
        }
      );
    })();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const calculateDistance = () => {
    if (routeCoordinates.length < 2) return 0;
    
    let dist = 0;
    for (let i = 0; i < routeCoordinates.length - 1; i++) {
      const lat1 = routeCoordinates[i].latitude;
      const lon1 = routeCoordinates[i].longitude;
      const lat2 = routeCoordinates[i+1].latitude;
      const lon2 = routeCoordinates[i+1].longitude;
      
      const R = 6371; // km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      dist += R * c;
    }
    return dist;
  };

  const handleAttemptStop = () => {
    // Show modal to request reason or admin OTP
    setShowStopModal(true);
  };

  const confirmStop = () => {
    if (adminOtp !== '1234' && stopReason.trim().length < 10) {
      showToast({ title: 'Validation Error', message: 'Provide a valid reason (min 10 chars) or correct Admin OTP (1234).', type: 'error' });
      return;
    }
    
    setSubmittingStop(true);
    setTimeout(() => {
      setSubmittingStop(false);
      setShowStopModal(false);
      showToast({ title: 'Tracking Stopped', message: 'Tracking disable authorized.', type: 'success' });
      router.push({ pathname: '/(employee)/visit/report', params: { id } });
    }, 1000);
  };

  if (!visit || !visit.farmer) return null;

  const displaySpeed = (speed * 3.6).toFixed(1); // convert m/s to km/h
  const displayDistance = calculateDistance().toFixed(2); // km

  // Farmer destination marker
  const endLocation = { latitude: visit.farmer.latitude, longitude: visit.farmer.longitude };

  return (
    <View className="flex-1 bg-white">
      {/* Map Background */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={StyleSheet.absoluteFillObject}
        showsUserLocation={false} // We draw our own custom marker
      >
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#15803d"
          strokeWidth={6}
        />
        
        {/* Draw User's Current Location */}
        {currentLocation && (
          <Marker 
            coordinate={{ latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
             <View className="items-center">
               <View className="bg-white p-1 rounded-full shadow-lg border-2 border-green-500 mb-1">
                 <Image 
                   source={{ uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(employeeProfile.name)}&background=15803d&color=fff&size=100` }}
                   style={{ width: 40, height: 40, borderRadius: 20 }}
                 />
               </View>
               <View className="bg-white/90 px-2 py-0.5 rounded-md shadow-sm border border-gray-200">
                 <Text className="text-gray-900 font-gotham-bold text-[10px]">{employeeProfile.name}</Text>
               </View>
             </View>
          </Marker>
        )}

        {/* Farmer Destination Marker */}
        <Marker coordinate={endLocation}>
           <View className="bg-orange-500 p-2 rounded-full shadow-md border-2 border-white">
             <MapPin size={20} color="#fff" />
           </View>
        </Marker>
      </MapView>

      <SafeAreaView className="flex-1 justify-between" pointerEvents="box-none">
        
        {/* Header & Top Card */}
        <View pointerEvents="box-none">
          <View className="px-6 pt-2 pb-4 flex-row justify-between items-center">
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
               <ChevronLeft size={24} color="#1f2937" />
            </TouchableOpacity>
            <Text className="font-gotham-bold text-lg text-gray-900 bg-white/90 px-4 py-1.5 rounded-full shadow-sm">Live Tracking</Text>
            <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
               <MoreHorizontal size={24} color="#1f2937" />
            </TouchableOpacity>
          </View>

          <View className="px-4 mt-2">
            <Card className="flex-row items-center justify-between py-4 shadow-md bg-white/95">
              <View className="flex-row items-center flex-1">
                <View className="bg-[#e8e8fc] p-3 rounded-full mr-4">
                  <Navigation size={24} color="#15803d" />
                </View>
                <View className="flex-1">
                  <Text className="font-gotham-bold text-gray-900 text-base">{visit.farmer.name}</Text>
                  <Text className="text-gray-500 text-xs font-brandon" numberOfLines={1}>{visit.farmer.address}</Text>
                </View>
              </View>
              <View className="bg-orange-100 px-3 py-1.5 rounded-full ml-2 flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-orange-500 mr-2" />
                <Text className="text-[#ea580c] font-gotham-bold text-xs">LIVE</Text>
              </View>
            </Card>
          </View>
        </View>

        {/* Bottom Panel */}
        <View className="px-4 pb-8" pointerEvents="box-none">
          <Card className="rounded-[32px] pt-6 pb-6 shadow-xl bg-white/95">
            <View className="items-center mb-6">
               <Text className="text-gray-500 text-sm font-brandon mb-1">Tracking Duration</Text>
               <Text className="text-[#15803d] font-gotham-bold text-4xl">{formatDuration(duration)}</Text>
            </View>

            <View className="flex-row justify-between px-4 mb-8">
               <View className="items-center w-1/3">
                 <Text className="text-gray-900 font-gotham-bold text-lg">{displayDistance}</Text>
                 <Text className="text-gray-900 font-gotham-bold text-xs mb-1">km</Text>
                 <Text className="text-gray-400 text-xs font-brandon">Distance</Text>
               </View>
               <View className="w-px h-10 bg-gray-200" />
               <View className="items-center w-1/3">
                 <Text className="text-gray-900 font-gotham-bold text-lg">{displaySpeed}</Text>
                 <Text className="text-gray-900 font-gotham-bold text-xs mb-1">km/h</Text>
                 <Text className="text-gray-400 text-xs font-brandon">Speed</Text>
               </View>
               <View className="w-px h-10 bg-gray-200" />
               <View className="items-center w-1/3">
                 <Text className="text-gray-900 font-gotham-bold text-lg">{visit.time.split(' ')[0]}</Text>
                 <Text className="text-gray-900 font-gotham-bold text-xs mb-1">{visit.time.split(' ')[1]}</Text>
                 <Text className="text-gray-400 text-xs font-brandon">Start</Text>
               </View>
            </View>

            <Button 
              title="End Trip & View Report" 
              onPress={handleAttemptStop}
              className="bg-[#ea580c]"
            />
          </Card>
        </View>

      </SafeAreaView>

      {/* Stop Tracking Modal */}
      <Modal visible={showStopModal} transparent animationType="slide">
        <View className="flex-1 bg-black/60 justify-end">
          <View className="bg-white rounded-t-[32px] p-6 pb-12">
            <View className="flex-row justify-between items-center mb-6">
              <View className="flex-row items-center">
                <ShieldAlert size={28} color="#ef4444" className="mr-3" />
                <Text className="text-gray-900 font-gotham-bold text-xl">Stop Tracking?</Text>
              </View>
              <TouchableOpacity onPress={() => setShowStopModal(false)} className="p-2 bg-gray-100 rounded-full">
                <X size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <Text className="text-gray-600 font-brandon text-base mb-6">
              You are attempting to end tracking before arriving. Please provide a valid reason or Admin Override PIN.
            </Text>

            <Text className="text-gray-900 font-gotham-bold mb-2 ml-1">Reason for stopping early</Text>
            <View className="border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 h-24 mb-4">
              <TextInput 
                className="flex-1 text-gray-900 font-brandon"
                multiline
                textAlignVertical="top"
                placeholder="Vehicle broke down, emergency, etc."
                placeholderTextColor="#9ca3af"
                value={stopReason}
                onChangeText={setStopReason}
              />
            </View>

            <Text className="text-gray-900 font-gotham-bold mb-2 ml-1">Admin Override OTP (Optional)</Text>
            <View className="border border-gray-200 rounded-xl px-4 py-4 bg-gray-50 mb-8">
              <TextInput 
                className="text-gray-900 font-gotham-bold"
                placeholder="Enter 4-digit PIN (1234)"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                secureTextEntry
                value={adminOtp}
                onChangeText={setAdminOtp}
              />
            </View>

            <Button 
              title="Confirm & End Trip" 
              onPress={confirmStop}
              loading={submittingStop}
              className="bg-red-500 py-4"
            />
          </View>
        </View>
      </Modal>

    </View>
  );
}
