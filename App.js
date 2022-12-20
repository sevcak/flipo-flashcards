import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { LogBox, useColorScheme } from "react-native";

// Color schemes
import colorSchemes from "./assets/colorSchemes";

// Components
import Navbar from './components/Navbar';
import FlipoIcons from './components/FlipoIcons';

// Screens
import TestScreen from './screens/TestScreen';
import DeckProfileScreen from './screens/decks/DeckProfileScreen';
import DeckPlayScreen from './screens/decks/DeckPlayScreen';
import DeckEditScreen from './screens/decks/DeckEditScreen';

const Stack = createStackNavigator();

export default function App() {
  // Ignores all logs and warnings in Expo Go.
  // Serves for testing and preview recording purposes.
  // LogBox.ignoreAllLogs();

  let colorScheme = colorSchemes[useColorScheme()];
  
  const [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
    'Montserrat-Light': require('./assets/fonts/Montserrat/static/Montserrat-Thin.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('./assets/fonts/Montserrat/static/Montserrat-ExtraBold.ttf'),
    'Montserrat-Black': require('./assets/fonts/Montserrat/static/Montserrat-Black.ttf'),
    'Montserrat-Italic': require('./assets/fonts/Montserrat/static/Montserrat-Italic.ttf'),
    'Montserrat-Medium-Italic': require('./assets/fonts/Montserrat/static/Montserrat-MediumItalic.ttf'),
    'Montserrat-Light-Italic': require('./assets/fonts/Montserrat/static/Montserrat-ThinItalic.ttf'),
    'Montserrat-Bold-Italic': require('./assets/fonts/Montserrat/static/Montserrat-BoldItalic.ttf'),
    'Montserrat-SemiBold-Italic': require('./assets/fonts/Montserrat/static/Montserrat-SemiBoldItalic.ttf'),
    'Montserrat-ExtraBold-Italic': require('./assets/fonts/Montserrat/static/Montserrat-ExtraBoldItalic.ttf'),
    'Montserrat-Black-Italic': require('./assets/fonts/Montserrat/static/Montserrat-BlackItalic.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  })

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={({route}) => ({
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
        headerBackImage: () => (
          <FlipoIcons name='back-arrow' type='outline' color={colorScheme['ui']} size={35}/>
        ),
      })}
      >
        <Stack.Screen name='DecksHomeScreen' component={Navbar}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name='TestScreen' component={TestScreen}/>
        <Stack.Screen name='DeckProfileScreen' component={DeckProfileScreen}/>
        <Stack.Screen name='DeckPlayScreen' component={DeckPlayScreen}/>
        <Stack.Screen name='DeckEditScreen' component={DeckEditScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}