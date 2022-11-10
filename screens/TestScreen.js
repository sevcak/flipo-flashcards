import { View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const TestScreen = () => {
    const navigation = useNavigation(); 
  
    useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: true, 
      })
    }, [])

    return (
      <SafeAreaView>
          <View className="flex-rows items-center justify-center h-full">
            <Text className="text-4xl">Hello, flipo!</Text>
            <Text className="text-xl">This is a test screen.</Text>
          </View>
      </SafeAreaView>
    );
}

export default TestScreen;