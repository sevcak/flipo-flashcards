import { useColorScheme, Pressable, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

// Color schemes
import colorSchemes from '../../assets/colorSchemes';

// Components
import FlipoText from '../../components/FlipoText';

const SettingsScreen = () => {
    const navigation = useNavigation();
    let colorScheme = colorSchemes[useColorScheme()];
    
    // header title setup
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colorScheme['main'],
        borderBottomWidth: 3,
        borderBottomColor: colorScheme['ui'],
        height: 80,
      },
    });

    useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: true, 
      })
    }, [])
    return (
      <View className='bg-primary dark:bg-primary-dark'>
          <Pressable
            className="flex-rows items-center justify-center h-full"
            onPress={() => navigation.navigate('TestScreen')}>
              <FlipoText className="text-4xl">settings</FlipoText>
          </Pressable>
      </View>
    );
}

export default SettingsScreen;