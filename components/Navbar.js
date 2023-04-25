import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from "react-native";

// Color schemes
import colorSchemes from "../assets/colorSchemes";

// Icons
import FlipoIcons from './FlipoIcons';

// Screens
import DecksHomeScreen from '../screens/decks/DecksHomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

// Localization
import * as Localization from 'expo-localization';
import * as locales from "../localizations/localizationScreenNames";
import { I18n } from 'i18n-js';

const Tab = createBottomTabNavigator();

const Navbar = () => {
  let colorScheme = colorSchemes[useColorScheme()];

  // localization setup
  const [locale, setLocale] = useState(Localization.locale);
  const i18n = new I18n(locales)
  i18n.enableFallback = true;
  i18n.translations = {...locales};
  i18n.defaultLocale = "en";
  i18n.locale = locale;

  const decksHomeName = i18n.t('decksTitle');
  const profileName = i18n.t('profileTitle');
  const settingsName = i18n.t('settingsTitle');

  return (
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
            backgroundColor: colorScheme['main'],
            borderTopWidth: 3,
            borderTopColor: colorScheme['ui'],
          },
        ],
        headerStyle: {
          backgroundColor: colorScheme['main'],
          borderBottomWidth: 3,
          borderBottomColor: colorScheme['ui'],
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
  )
}

export default Navbar