import { useColorScheme, Pressable, View, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// Color schemes
import colorSchemes from '../../assets/colorSchemes';

// Components
import FlipoModal from '../../components/FlipoModal';
import FlipoText from '../../components/FlipoText';
import FlipoFlatButton from '../../components/pressable/FlipoFlatButton';

// Localization
import * as Localization from 'expo-localization';
import * as locales from "../../localizations/settings/localizationSettingsScreen";
import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  
  let theme = useColorScheme();
  let colorScheme = colorSchemes[theme];

  const [modal, setModal] = useState(<></>);

  // localization setup
  const [locale, setLocale] = useState(Localization.locale);
  const i18n = new I18n(locales)
  i18n.enableFallback = true;
  i18n.translations = {...locales};
  i18n.defaultLocale = "en";
  i18n.locale = locale;

  // header title setup
  navigation.setOptions({
    headerStyle: {
      backgroundColor: colorScheme['main'],
      borderBottomWidth: 3,
      borderBottomColor: colorScheme['ui'],
      height: 100,
    },
  });

  // store whether the walkthrough should be shown
  const storeShowWalkthrough = async (showWalkthrough) => {
    try {
      await AsyncStorage.setItem('doNotShowWalkthrough', (showWalkthrough ? 'false' : 'true'));
    } catch (e) {
      console.error('storeShowWalkthrough: There was an error with storing data.');
    }
  };

  const themeSettingModal = (
    <FlipoModal
      title={i18n.t('themeTitle')}
      visible={true}
      onButtonPress={() => setModal(<></>)}
    >
      <View className='space-y-4'>
        <FlipoText
          weight='medium'
          className='text-center
          text-primary dark:text-primary-dark'
        >
          {i18n.t('themeModalContent01')}
        </FlipoText>
        <FlipoText
          weight='medium'
          className='text-center
          text-primary dark:text-primary-dark'
        >
          {i18n.t('themeModalContent02')}
        </FlipoText>
      </View>
    </FlipoModal>
  )

  const langSettingModal = (
    <FlipoModal
      title={i18n.t('languageTitle')}
      visible={true}
      onButtonPress={() => setModal(<></>)}
    >
      <View className='space-y-4'>
        <FlipoText
          weight='medium'
          className='text-center
          text-primary dark:text-primary-dark'
        >
          {i18n.t('langModalContent01')}
        </FlipoText>
        <FlipoText
          weight='medium'
          className='text-center
          text-primary dark:text-primary-dark'
        >
          {i18n.t('langModalContent02')}
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
        <FlipoFlatButton
          type='setting'
          title={i18n.t('themeTitle')}
          value={i18n.t(`${theme}Theme`)}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModal(langSettingModal)}>
        <FlipoFlatButton
          type='setting'
          title={i18n.t('languageTitle')}
          value={i18n.t('language')}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        storeShowWalkthrough(true);
        navigation.navigate(i18n.t('decksTitle'));
      }}
      >
        <FlipoFlatButton type='action'>{i18n.t('replayWalkthrough')}</FlipoFlatButton>
      </TouchableOpacity>
    </View>
  );
}

export default SettingsScreen;