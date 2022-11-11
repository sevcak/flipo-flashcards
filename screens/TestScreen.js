import { useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

// Components
import FlipoText from '../components/FlipoText';

const TestScreen = () => {
    const navigation = useNavigation();
    let theme = useColorScheme();

    return (
      <SafeAreaView className={`bg-primary-${theme}`} style={{backgoundColor: 'red'}}>
          <View className="flex-rows items-center justify-center h-full">
            <FlipoText className="text-4xl">Hello, flipo!</FlipoText>
            <FlipoText className="text-xl">This is a test screen.</FlipoText>

          </View>
      </SafeAreaView>
    );
}

export default TestScreen;