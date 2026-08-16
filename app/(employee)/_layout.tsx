import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Tabs, router } from 'expo-router';
import { Home, CalendarDays, Plus, FileText, User } from 'lucide-react-native';

function CustomTabBar({ state, descriptors, navigation }: any) {
  // We want to insert our FAB in the middle (index 2) of the visible tabs
  const visibleRoutes = state.routes.filter((route: any) => 
    !['visit', 'map', 'edit-profile', 'attendance', 'menu', 'register-farmer'].includes(route.name)
  );

  return (
    <View className="flex-row bg-[#113d11] h-20 px-4 pt-2 pb-6 items-center justify-between rounded-t-3xl border-t border-[#113d11]">
      {visibleRoutes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
        
        const isFocused = state.index === state.routes.findIndex((r: any) => r.key === route.key);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getIcon = () => {
          const color = isFocused ? '#e87111' : '#ffffff';
          switch (route.name) {
            case 'dashboard': return <Home size={24} color={color} />;
            case 'visits': return <CalendarDays size={24} color={color} />;
            case 'reports': return <FileText size={24} color={color} />;
            case 'profile': return <User size={24} color={color} />;
            default: return null;
          }
        };

        const TabItem = (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            className="flex-1 items-center justify-center pt-2"
          >
            {getIcon()}
            <Text className={`text-[10px] mt-1 font-brandon-medium ${isFocused ? 'text-[#e87111]' : 'text-white'}`}>
              {label}
            </Text>
          </TouchableOpacity>
        );

        // Inject the FAB after the 2nd item (index 1)
        if (index === 1) {
          return (
            <React.Fragment key={route.key + "_fragment"}>
              {TabItem}
              <View key="fab" className="flex-1 items-center justify-center -mt-8">
                <TouchableOpacity 
                  onPress={() => router.push('/(employee)/map')}
                  className="w-16 h-16 bg-[#396216] rounded-full items-center justify-center border-4 border-white shadow-xl"
                >
                  <Plus size={32} color="#fff" />
                </TouchableOpacity>
              </View>
            </React.Fragment>
          );
        }

        return TabItem;
      })}
    </View>
  );
}

export default function EmployeeLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="dashboard" options={{ title: 'Home' }} />
      <Tabs.Screen name="visits" options={{ title: 'Visits' }} />
      <Tabs.Screen name="reports" options={{ title: 'Reports' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      
      {/* Hidden Screens from Tab Bar */}
      <Tabs.Screen name="visit" options={{ href: null }} />
      <Tabs.Screen name="map" options={{ href: null }} />
      <Tabs.Screen name="edit-profile" options={{ href: null }} />
      <Tabs.Screen name="attendance" options={{ href: null }} />
      <Tabs.Screen name="menu" options={{ href: null }} />
      <Tabs.Screen name="register-farmer" options={{ href: null }} />
    </Tabs>
  );
}
