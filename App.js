import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Components
import Navbar from './components/Navbar';

export default function App() {
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
    <Navbar/>
  );
}