import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Easing,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView, {
    AnimatedRegion,
    Circle,
    Marker,
    Polyline,
    PROVIDER_GOOGLE,
} from './components/MapView';
import { employeeProfile } from './data/mockData';

// --- Constants & Types ---

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface TelemetryData {
  speed: number;
  accuracy: number | null;
  battery: number | null;
  isOnline: boolean;
}

const GEOFENCE_RADIUS = 100; // meters
const MAX_ACCEPTABLE_ACCURACY_METERS = 25;
const MIN_MOVEMENT_METERS = 5;

// --- Helper Functions ---
const haversineMeters = (a: Coordinate, b: Coordinate) => {
  const radius = 6371000;
  const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dLon = ((b.longitude - a.longitude) * Math.PI) / 180;
  const lat1 = (a.latitude * Math.PI) / 180;
  const lat2 = (b.latitude * Math.PI) / 180;
  const sinLat = Math.sin(dLat / 2);
  const sinLon = Math.sin(dLon / 2);
  const value =
    sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLon * sinLon;

  return radius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
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

const farmLocation: Coordinate = {
  latitude: 12.9786,
  longitude: 77.5996,
};

// --- Components ---
const SmoothMarker = ({
  coordinate,
}: {
  coordinate: Coordinate;
}) => {
  const animatedCoordinate = useRef(
    new AnimatedRegion({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0,
    })
  ).current;
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    animatedCoordinate
      .timing({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        duration: 1500,
        useNativeDriver: false,
      } as unknown as Parameters<typeof animatedCoordinate.timing>[0])
      .start();
  }, [animatedCoordinate, coordinate.latitude, coordinate.longitude]);

  return (
    <Marker.Animated
      coordinate={animatedCoordinate as unknown as Coordinate}
      anchor={{ x: 0.5, y: 0.5 }}
      flat={true}
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
        {/* Profile Image & Icon */}
        <View style={styles.markerCore}>
          <Image 
            source={{ uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(employeeProfile.name)}&background=10B981&color=fff&size=64` }}
            style={{ width: 28, height: 28, borderRadius: 14 }}
          />
        </View>
        <View style={styles.markerLabelContainer}>
          <Text style={styles.markerLabel}>{employeeProfile.name}</Text>
        </View>
      </View>
    </Marker.Animated>
  );
};

export default function LiveTrackingMapScreen() {
  const mapRef = useRef<MapView>(null);
  const [currentLocation, setCurrentLocation] = useState<Coordinate | null>(null);
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    speed: 0,
    accuracy: null,
    battery: null,
    isOnline: false,
  });
  const [inGeofence, setInGeofence] = useState(false);
  const [is3D, setIs3D] = useState(true);
  const [showTraffic, setShowTraffic] = useState(false);

  const [breadcrumbRoute, setBreadcrumbRoute] = useState<Coordinate[]>([]);
  const lastAcceptedRef = useRef<{ coordinate: Coordinate; timestamp: number } | null>(null);

  // Real GPS tracking
  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;
    let isMounted = true;

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (!isMounted || status !== 'granted') {
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 2000,
          distanceInterval: MIN_MOVEMENT_METERS,
        },
        (location) => {
          if (!isMounted) return;

          const { latitude, longitude, accuracy, speed, heading } = location.coords;
          const newCoord = {
            latitude,
            longitude,
          };
          const lastAccepted = lastAcceptedRef.current;

          if (accuracy != null && accuracy > MAX_ACCEPTABLE_ACCURACY_METERS) {
            setTelemetry((prev) => ({ ...prev, accuracy, isOnline: false }));
            return;
          }

          if (lastAccepted && location.timestamp <= lastAccepted.timestamp) return;

          if (
            lastAccepted &&
            haversineMeters(lastAccepted.coordinate, newCoord) <
              Math.max(MIN_MOVEMENT_METERS, accuracy ?? MIN_MOVEMENT_METERS)
          ) {
            setTelemetry((prev) => ({
              ...prev,
              speed: 0,
              accuracy,
              isOnline: true,
            }));
            return;
          }

          setCurrentLocation(newCoord);
          setBreadcrumbRoute((prev) => [...prev, newCoord]);
          lastAcceptedRef.current = { coordinate: newCoord, timestamp: location.timestamp };

          setTelemetry((prev) => ({
            ...prev,
            speed: speed != null && speed >= 0 ? Math.round(speed * 3.6) : 0,
            accuracy,
            isOnline: true,
          }));

          mapRef.current?.animateCamera(
            { center: newCoord, heading: heading != null && heading >= 0 ? heading : 0 },
            { duration: 700 }
          );

          // Geofence check
          const latDiff = Math.abs(farmLocation.latitude - newCoord.latitude);
          const lngDiff = Math.abs(farmLocation.longitude - newCoord.longitude);
          const approxDistance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111000;

          setInGeofence((prevInGeofence) => {
            if (approxDistance < GEOFENCE_RADIUS && !prevInGeofence) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              return true;
            } else if (approxDistance >= GEOFENCE_RADIUS && prevInGeofence) {
              return false;
            }
            return prevInGeofence;
          });
        }
      );

      if (!isMounted) {
        subscription.remove();
        subscription = null;
      }
    };

    void startTracking();

    return () => {
      isMounted = false;
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const recenterCamera = () => {
    if (!currentLocation) return;

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
          center: farmLocation,
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

        {/* Breadcrumb Route */}
        <Polyline
          coordinates={breadcrumbRoute}
          strokeColor="#10B981" // Ideally gradient, but MapView polyline doesn't support direct gradient easily without custom components. Falling back to solid Emerald.
          strokeWidth={5}
        />

        {/* Moving Marker */}
        {currentLocation && <SmoothMarker coordinate={currentLocation} />}

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
            <Text style={styles.statValue}>
              {telemetry.accuracy == null ? '--' : `±${Math.round(telemetry.accuracy)}m`}
            </Text>
            <Text style={styles.statLabel}>Signal</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <MaterialCommunityIcons
              name="battery-80"
              size={24}
              color="#10B981"
            />
            <Text style={styles.statLabel}>
              {telemetry.battery == null ? '--' : `${telemetry.battery}%`}
            </Text>
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
    width: 140,
    height: 100,
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
    marginTop: 20,
  },
  pulseAura: {
    position: 'absolute',
    width: 60,
    height: 60,
    top: 26,
    borderRadius: 30,
    backgroundColor: '#10B981',
    zIndex: 1,
  },
  markerLabelContainer: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  markerLabel: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
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
