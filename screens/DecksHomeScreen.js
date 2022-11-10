import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

// Components
import FlipoText from '../components/FlipoText';

const DecksHomeScreen = () => {
    const navigation = useNavigation(); 

    useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: true, 
      })
    }, [])

    return (
      <SafeAreaView>
          <View className="flex-rows items-center justify-center h-full">
            <FlipoText className="text-4xl">decks</FlipoText>
          </View>
      </SafeAreaView>
    );
}

export default DecksHomeScreen;