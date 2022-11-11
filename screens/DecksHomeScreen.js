import { Pressable, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';



// Components
import FlipoText from '../components/FlipoText';

const DecksHomeScreen = () => {
    const navigation = useNavigation();
    let theme = useColorScheme();

    return (
      <SafeAreaView className={`bg-primary-${theme}`}>
          <Pressable
            className="flex-rows items-center justify-center h-full"
            onPress={() => navigation.navigate('TestScreen')}>
            <FlipoText className="text-4xl">decks</FlipoText>
          </Pressable>
      </SafeAreaView>
    );
}

export default DecksHomeScreen;