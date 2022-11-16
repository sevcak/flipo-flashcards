import { useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import FlipoText from '../../components/FlipoText';

// Color schemes
import colorSchemes from "../../assets/colorSchemes";

const ProfileScreen = () => {
    const navigation = useNavigation();
    let theme = useColorScheme();

    return (
      <SafeAreaView className={`bg-primary-${theme}`}>
          <View className="flex-rows items-center justify-center h-full">
            <FlipoText className="text-4xl">profile</FlipoText>
          </View>
      </SafeAreaView>
    );
}

export default ProfileScreen;