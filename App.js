import { useFonts } from 'expo-font';

// Components
import Navbar from './components/Navbar';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
    'Montserrat-Light': require('./assets/fonts/Montserrat/static/Montserrat-Thin.ttf'),
    'Monterrat-Bold': require('./assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    'Montserrat-Italic': require('./assets/fonts/Montserrat/static/Montserrat-Italic.ttf'),
    'Montserrat-Light-Italic': require('./assets/fonts/Montserrat/static/Montserrat-ThinItalic.ttf'),
    'Monterrat-Bold-Italic': require('./assets/fonts/Montserrat/static/Montserrat-BoldItalic.ttf'),
  });

  if (!fontsLoaded) {
    return undefined;
  }
  
  return (
    <Navbar/>
  );
}