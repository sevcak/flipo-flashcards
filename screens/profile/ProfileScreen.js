import React from 'react';
import { ScrollView, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FlipoText from '../../components/FlipoText';
import FlipoIcons from '../../components/FlipoIcons';
import colorSchemes from '../../assets/colorSchemes';
import FlipoFlatButton from '../../components/pressable/FlipoFlatButton';

// Color schemes


const ProfileScreen = () => {
    const navigation = useNavigation();
    let theme = useColorScheme();

    const login = false;

    const userName = login ? 'Logged User' : 'Guest';
    const loggedInOptions = login
      ? (<></>)
      : (<FlipoFlatButton type='action'>Log in</FlipoFlatButton>);

    return (
      <SafeAreaView className={`bg-primary-${theme}`}>
          <ScrollView
            className='-mt-9'
            showsVerticalScrollIndicator={false}
            overScrollMode='never'
          >
            <View className='h-screen'>
              <View className="items-center justify-center p-10 space-y-6 w-full aspect-square">
                <View>
                  <FlipoIcons name='profile' size='128' color={colorSchemes['dark'].green}/>
                </View>
                <FlipoText weight='bold' className="text-4xl">{userName}</FlipoText>
              </View>
              {/* Buttons */}
              <View className={`border-t-2 border-ui-${theme}`}>
                <FlipoFlatButton type='setting' setting={{title: 'Name', value: userName}} />
                {loggedInOptions}
              </View>
            </View>
          </ScrollView>
      </SafeAreaView>
    );
}

export default ProfileScreen;