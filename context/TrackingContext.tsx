import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { startBackgroundTracking, stopBackgroundTracking } from '../utils/trackingManager';
import * as Location from 'expo-location';

interface TrackingContextType {
  sessionId: string | null;
  isTracking: boolean;
  startSession: (id: string) => Promise<void>;
  stopSession: () => Promise<void>;
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export const TrackingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  // Restore session on mount
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const storedSession = await AsyncStorage.getItem('@current_tracking_session');
        if (storedSession) {
          setSessionId(storedSession);
          setIsTracking(true);
        }
      } catch (e) {
        console.error('Failed to load tracking session', e);
      }
    };
    checkExistingSession();
  }, []);

  const startSession = async (id: string) => {
    setSessionId(id);
    setIsTracking(true);
    
    // Call backend to start session
    try {
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      await fetch('http://10.0.2.2:8000/api/v1/employee/tracking/session/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ session_id: id, latitude: loc.coords.latitude, longitude: loc.coords.longitude })
      });
    } catch (e) {
      console.log('Failed to start session on backend', e);
    }
    
    await startBackgroundTracking(id);
  };

  const stopSession = async () => {
    if (sessionId) {
        try {
            const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
            await fetch('http://10.0.2.2:8000/api/v1/employee/tracking/session/stop', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ session_id: sessionId, latitude: loc.coords.latitude, longitude: loc.coords.longitude })
            });
        } catch (e) {
            console.log('Failed to stop session on backend', e);
        }
    }
    setSessionId(null);
    setIsTracking(false);
    await stopBackgroundTracking();
  };

  return (
    <TrackingContext.Provider value={{ sessionId, isTracking, startSession, stopSession }}>
      {children}
    </TrackingContext.Provider>
  );
};

export const useTracking = () => {
  const context = useContext(TrackingContext);
  if (context === undefined) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
};
