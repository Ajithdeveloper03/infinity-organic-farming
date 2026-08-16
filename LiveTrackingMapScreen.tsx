import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  Platform,
} from 'react-native';
import MapView, {
  Marker,
  Polyline,
  Polygon,
  Circle,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import * as Haptics from 'expo-haptics';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// --- Constants & Types ---
const { width, height } = Dimensions.get('window');

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface TelemetryData {
  speed: number;
  accuracy: number;
  battery: number;
  isOnline: boolean;
}

const GEOFENCE_RADIUS = 100; // meters

// --- Helper Functions ---
const calculateBearing = (start: Coordinate, end: Coordinate) => {
  const toRad = (val: number) => (val * Math.PI) / 180;
  const toDeg = (val: number) => (val * 180) / Math.PI;

  const lat1 = toRad(start.latitude);
  const lat2 = toRad(end.latitude);
  const dLon = toRad(end.longitude - start.longitude);

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  const brng = toDeg(Math.atan2(y, x));
  return (brng + 360) % 360;
};

// --- Map Styles ---
const midnightMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0F172A' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1E293B' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#334155' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0B1120' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
];

// --- Mock Data ---
const initialLocation: Coordinate = {
  latitude: 12.9716,
  longitude: 77.5946,
};
const farmLocation: Coordinate = {
  latitude: 12.9786,
  longitude: 77.5996,
};
const plannedRoute: Coordinate[] = [
  initialLocation,
  { latitude: 12.973, longitude: 77.596 },
  { latitude: 12.975, longitude: 77.598 },
  farmLocation,
];

// --- Components ---
const SmoothMarker = ({
  coordinate,
  accuracy,
}: {
  coordinate: Coordinate;
  accuracy: number;
}) => {
  const [prevCoord, setPrevCoord] = useState(coordinate);
  const [bearing, setBearing] = useState(0);

  const markerLat = useRef(new Animated.Value(coordinate.latitude)).current;
  const markerLng = useRef(new Animated.Value(coordinate.longitude)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Pulse effect
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // LERP and Rotation
  useEffect(() => {
    if (
      coordinate.latitude !== prevCoord.latitude ||
      coordinate.longitude !== prevCoord.longitude
    ) {
      const newBearing = calculateBearing(prevCoord, coordinate);
      setBearing(newBearing);

      Animated.parallel([
        Animated.timing(markerLat, {
          toValue: coordinate.latitude,
          duration: 1000, // Smoothing duration
          easing: Easing.linear,
          useNativeDriver: false, // Cannot use native driver for layout properties
        }),
        Animated.timing(markerLng, {
          toValue: coordinate.longitude,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]).start();

      setPrevCoord(coordinate);
    }
  }, [coordinate]);

  return (
    <Marker.Animated
      coordinate={{
        latitude: markerLat as unknown as number,
        longitude: markerLng as unknown as number,
      }}
      anchor={{ x: 0.5, y: 0.5 }}
      flat={true}
      style={{ transform: [{ rotate: `${bearing}deg` }] }}
    >
      <View style={styles.markerContainer}>
        {/* Pulsing Aura */}
        <Animated.View
          style={[
            styles.pulseAura,
            {
              transform: [{ scale: pulseAnim }],
              opacity: pulseAnim.interpolate({
                inputRange: [1, 1.5],
                outputRange: [0.5, 0],
              }),
            },
          ]}
        />
        {/* Officer Icon */}
        <View style={styles.markerCore}>
          <MaterialCommunityIcons name="navigation" size={24} color="#10B981" />
        </View>
      </View>
    </Marker.Animated>
  );
};

export default function LiveTrackingMapScreen() {
  const mapRef = useRef<MapView>(null);
  const [currentLocation, setCurrentLocation] =
    useState<Coordinate>(initialLocation);
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    speed: 45,
    accuracy: 5,
    battery: 82,
    isOnline: true,
  });
  const [inGeofence, setInGeofence] = useState(false);
  const [is3D, setIs3D] = useState(true);
  const [showTraffic, setShowTraffic] = useState(false);

  const breadcrumbRoute = useMemo(
    () => [initialLocation, currentLocation],
    [currentLocation]
  );

  // Simulate GPS updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation((prev) => {
        // Move towards farm
        const latStep = (farmLocation.latitude - initialLocation.latitude) / 10;
        const lngStep =
          (farmLocation.longitude - initialLocation.longitude) / 10;
        
        const newLat = prev.latitude + latStep * 0.1; // Slow movement
        const newLng = prev.longitude + lngStep * 0.1;

        // Check geofence (simplified distance check)
        const latDiff = Math.abs(farmLocation.latitude - newLat);
        const lngDiff = Math.abs(farmLocation.longitude - newLng);
        const approxDistance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111000; // rough meters

        if (approxDistance < GEOFENCE_RADIUS && !inGeofence) {
          setInGeofence(true);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        } else if (approxDistance >= GEOFENCE_RADIUS && inGeofence) {
          setInGeofence(false);
        }

        return { latitude: newLat, longitude: newLng };
      });
    }, 2000); // 2 second GPS ping

    return () => clearInterval(interval);
  }, [inGeofence]);

  const recenterCamera = () => {
    mapRef.current?.animateCamera(
      {
        center: currentLocation,
        pitch: is3D ? 45 : 0,
        heading: 0,
        zoom: 17,
      },
      { duration: 1000 }
    );
  };

  const toggle3D = () => {
    setIs3D(!is3D);
    mapRef.current?.animateCamera({ pitch: !is3D ? 45 : 0 });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={midnightMapStyle}
        showsTraffic={showTraffic}
        initialCamera={{
          center: initialLocation,
          pitch: 45,
          heading: 0,
          zoom: 17,
          altitude: 1000,
        }}
      >
        {/* Geofence */}
        <Circle
          center={farmLocation}
          radius={GEOFENCE_RADIUS}
          fillColor={inGeofence ? '#10B98155' : '#10B98122'}
          strokeColor="#10B981"
          strokeWidth={2}
        />

        {/* Planned Route */}
        <Polyline
          coordinates={plannedRoute}
          strokeColor="#3B82F6"
          strokeWidth={4}
          lineDashPattern={[10, 10]}
        />

        {/* Breadcrumb Route */}
        <Polyline
          coordinates={breadcrumbRoute}
          strokeColor="#10B981" // Ideally gradient, but MapView polyline doesn't support direct gradient easily without custom components. Falling back to solid Emerald.
          strokeWidth={5}
        />

        {/* Moving Marker */}
        <SmoothMarker
          coordinate={currentLocation}
          accuracy={telemetry.accuracy}
        />

        {/* Destination Marker */}
        <Marker coordinate={farmLocation}>
          <Ionicons name="location-sharp" size={32} color="#EF4444" />
        </Marker>
      </MapView>

      {/* Floating Controls */}
      <View style={styles.floatingControls}>
        <TouchableOpacity style={styles.controlButton} onPress={recenterCamera}>
          <MaterialCommunityIcons
            name="crosshairs-gps"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setShowTraffic(!showTraffic)}
        >
          <MaterialCommunityIcons
            name="traffic-light"
            size={24}
            color={showTraffic ? '#10B981' : '#fff'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={toggle3D}>
          <MaterialCommunityIcons
            name={is3D ? 'video-3d' : 'map-outline'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Offline Warning */}
      {!telemetry.isOnline && (
        <View style={styles.offlinePill}>
          <Ionicons name="warning" size={16} color="#F59E0B" />
          <Text style={styles.offlineText}>Reconnecting to GPS...</Text>
        </View>
      )}

      {/* Bottom HUD */}
      <View style={styles.bottomHud}>
        <View style={styles.hudTopRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{telemetry.speed}</Text>
            <Text style={styles.statLabel}>km/h</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>±{telemetry.accuracy}m</Text>
            <Text style={styles.statLabel}>Signal</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <MaterialCommunityIcons
              name="battery-80"
              size={24}
              color="#10B981"
            />
            <Text style={styles.statLabel}>{telemetry.battery}%</Text>
          </View>
        </View>

        <View style={styles.geofenceCounter}>
          <Text style={styles.geofenceText}>
            {inGeofence
              ? 'Arrived at Farm'
              : 'Approaching Selvam Vetiver Farm'}
          </Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: '#10B981' }]}
          >
            <Text style={styles.actionBtnText}>Check-in Farm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: '#F59E0B' }]}
          >
            <Text style={styles.actionBtnText}>Traffic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: '#EF4444' }]}
          >
            <Text style={styles.actionBtnText}>SOS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  markerCore: {
    width: 32,
    height: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 2,
  },
  pulseAura: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#10B981',
    zIndex: 1,
  },
  floatingControls: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 16,
    gap: 12,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  offlinePill: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  offlineText: {
    color: '#F59E0B',
    fontWeight: '600',
    fontSize: 14,
  },
  bottomHud: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  hudTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#334155',
  },
  geofenceCounter: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  geofenceText: {
    color: '#10B981',
    fontWeight: '600',
    fontSize: 14,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
