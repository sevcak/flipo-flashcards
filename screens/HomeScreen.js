import { View, Text, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation(); 

    useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: false, 
      })
    }, [])

    return (
      <SafeAreaView>
          <View className="flex-rows items-center">
            <Text>flipo flashcards</Text>
          </View>
      </SafeAreaView>
    );
}

export default HomeScreen;