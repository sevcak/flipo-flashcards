import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from "react-native";

// Color schemes
import colorSchemes from "./assets/colorSchemes";

// Components
import Navbar from './components/Navbar';
import TestScreen from './screens/TestScreen';
import FlipoIcons from './components/FlipoIcons';

const Stack = createStackNavigator();

export default function App() {
  let colorScheme = colorSchemes[useColorScheme()];
  
  const [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
    'Montserrat-Light': require('./assets/fonts/Montserrat/static/Montserrat-Thin.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('./assets/fonts/Montserrat/static/Montserrat-ExtraBold.ttf'),
    'Montserrat-Black': require('./assets/fonts/Montserrat/static/Montserrat-Black.ttf'),
    'Montserrat-Italic': require('./assets/fonts/Montserrat/static/Montserrat-Italic.ttf'),
    'Montserrat-Light-Italic': require('./assets/fonts/Montserrat/static/Montserrat-ThinItalic.ttf'),
    'Montserrat-Bold-Italic': require('./assets/fonts/Montserrat/static/Montserrat-BoldItalic.ttf'),
    'Montserrat-ExtraBold-Italic': require('./assets/fonts/Montserrat/static/Montserrat-ExtraBoldItalic.ttf'),
    'Montserrat-Black-Italic': require('./assets/fonts/Montserrat/static/Montserrat-BlackItalic.ttf'),
  });

  const homeName = 'Home';

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
        <Stack.Screen name={homeName} component={Navbar}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="TestScreen" component={TestScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}