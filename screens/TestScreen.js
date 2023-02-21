import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

// Components
import FlipoText from '../components/FlipoText';

const TestScreen = () => {
    const navigation = useNavigation();

    return (
      <View 
        className='bg-primary dark:bg-primary-dark'
        style={{backgoundColor: 'red'}}
      >
          <View className="flex-rows items-center justify-center h-full">
            <FlipoText className="text-4xl">Hello, flipo!</FlipoText>
            <FlipoText className="text-xl">This is a test screen.</FlipoText>
          </View>
      </View>
    );
}

export default TestScreen;