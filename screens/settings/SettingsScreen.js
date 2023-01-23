import { useColorScheme, Pressable, View, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// Color schemes
import colorSchemes from '../../assets/colorSchemes';

// Components
import FlipoModal from '../../components/FlipoModal';
import FlipoText from '../../components/FlipoText';
import FlipoFlatButton from '../../components/pressable/FlipoFlatButton';

const SettingsScreen = () => {
    const navigation = useNavigation();
    
    let theme = useColorScheme();
    let colorScheme = colorSchemes[theme];

    const [modal, setModal] = useState(<></>);

    // header title setup
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colorScheme['main'],
        borderBottomWidth: 3,
        borderBottomColor: colorScheme['ui'],
        height: 80,
      },
    });

    const themeSettingModal = (
      <FlipoModal
        title='Color Theme'
        visible={true}
        onButtonPress={() => setModal(<></>)}
      >
        <View className='space-y-4'>
          <FlipoText
            weight='medium'
            className='text-center
            text-primary dark:text-primary-dark'
          >
            flipo automatically follows your system appearance settings.
          </FlipoText>
          <FlipoText
            weight='medium'
            className='text-center
            text-primary dark:text-primary-dark'
          >
            To change the color theme of the app,
            change the color theme of your device.
          </FlipoText>
        </View>
      </FlipoModal>
    )

    useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: true, 
      })
    }, [])
    
    return (
      <View className='bg-primary dark:bg-primary-dark min-h-screen'>
        {modal}
        <TouchableOpacity onPress={() => setModal(themeSettingModal)}>
          <FlipoFlatButton type='setting' title='Theme' value={theme}/>
        </TouchableOpacity>
      </View>
    );
}

export default SettingsScreen;