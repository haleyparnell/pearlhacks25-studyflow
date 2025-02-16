import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = '#3F7CAC';
  const inactiveColor = '#B098A4';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#E5EBEA',
          borderTopWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
          paddingTop: 15,
          borderColor: 'transparent',
        },
      }}>
      <Tabs.Screen
        name="timer"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="timer" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <IconSymbol size={64} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="study-partner"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
