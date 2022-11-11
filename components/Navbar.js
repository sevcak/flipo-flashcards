import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from "react-native";

// Color schemes
import colorSchemes from "../assets/colorSchemes";

// Icons
import FlipoIcons from './FlipoIcons';

// Screens
import DecksHomeScreen from '../screens/DecksHomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FlipoText from './FlipoText';

// Screen names
const decksHomeName = 'Decks';
const profileName = 'Profile';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

const Navbar = () => {
  let colorScheme = colorSchemes[useColorScheme()];

  return (
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName={decksHomeName}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          iconType = focused ? 'solid' : 'outline';

          switch (rn) {
            case profileName:
              iconName = 'profile'
              break;
            case decksHomeName:
              iconName = 'card';
              break;
            case settingsName:
              iconName = 'gear';
          }

          return <FlipoIcons name={iconName} type={iconType} color={color} size={size*1.6} />

        },
        tabBarActiveTintColor: colorScheme['green'],
        tabBarInactiveTintColor: colorScheme['ui'],
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
            padding: 0,
            height: 80,
            backgroundColor: colorScheme['main']
          },
        ],
        headerStyle: {
          backgroundColor: colorScheme['main'],
          borderBottomWidth: 4,
          height: 100,
        },
        headerTitleStyle: {
          fontFamily: 'Montserrat-ExtraBold',
          color: colorScheme['ui'],
          letterSpacing: 1.8,
        },
        headerTitleAlign: 'center',


      })}
      >
        <Tab.Screen name={profileName} component={ProfileScreen} />
        <Tab.Screen name={decksHomeName} component={DecksHomeScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />
      </Tab.Navigator >
    </NavigationContainer>
  )
}

export default Navbar