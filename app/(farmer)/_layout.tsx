import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Tabs, router } from 'expo-router';
import { Home, Leaf, CalendarDays, HeadphonesIcon, Menu } from 'lucide-react-native';

function FarmerTabBar({ state, descriptors, navigation }: any) {
  // Filter out non-tab routes from the bottom bar
  const visibleRoutes = state.routes.filter((route: any) => 
    ['dashboard', 'farm', 'history', 'support', 'menu'].includes(route.name)
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
          const color = isFocused ? '#ea580c' : '#ffffff'; 
          switch (route.name) {
            case 'dashboard': return <Home size={24} color={color} />;
            case 'farm': return <Leaf size={24} color={color} />;
            case 'history': return <CalendarDays size={24} color={color} />;
            case 'support': return <HeadphonesIcon size={24} color={color} />;
            case 'menu': return <Menu size={24} color={color} />;
            default: return null;
          }
        };

        return (
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
            <Text className={`text-[10px] mt-1 font-brandon-medium ${isFocused ? 'text-[#ea580c]' : 'text-white'}`}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function FarmerLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={props => <FarmerTabBar {...props} />}
    >
      <Tabs.Screen name="dashboard" options={{ title: 'Home' }} />
      <Tabs.Screen name="farm" options={{ title: 'Farm' }} />
      <Tabs.Screen name="history" options={{ title: 'Visits' }} />
      <Tabs.Screen name="support" options={{ title: 'Support' }} />
      <Tabs.Screen name="menu" options={{ title: 'Menu' }} />
      
      {/* Hidden from tab bar */}
      <Tabs.Screen name="profile" options={{ href: null }} />
      <Tabs.Screen name="recommendations" options={{ href: null }} />
      <Tabs.Screen name="documents" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
      <Tabs.Screen name="visit" options={{ href: null }} />
      <Tabs.Screen name="rate/[id]" options={{ href: null }} />
    </Tabs>
  );
}
