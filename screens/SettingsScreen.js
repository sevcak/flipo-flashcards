import { useColorScheme, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

// Components
import FlipoText from '../components/FlipoText';

const SettingsScreen = () => {
    const navigation = useNavigation();
    let theme = useColorScheme();
  
    useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: true, 
      })
    }, [])
    return (
      <SafeAreaView className={`bg-primary-${theme}`}>
          <Pressable
            className="flex-rows items-center justify-center h-full"
            onPress={() => navigation.navigate('TestScreen')}>
            <FlipoText className="text-4xl">settings</FlipoText>
          </Pressable>
      </SafeAreaView>
    );
}

export default SettingsScreen;