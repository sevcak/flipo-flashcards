import React, { useEffect, useState } from 'react';
import { ScrollView, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

// Custom components
import FlipoText from '../../components/FlipoText';
import FlipoIcons from '../../components/FlipoIcons';
import colorSchemes from '../../assets/colorSchemes';
import FlipoFlatButton from '../../components/pressable/FlipoFlatButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const ProfileScreen = () => {
  const navigation = useNavigation();
  let theme = useColorScheme();

  // stores user data
  const storeUserData = async (data) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (e) {
      console.error('There was an error with saving the the user data.')
    }
  };

  // loads the user data
  const getUserData = async () => {
    try {
      let data = await AsyncStorage.getItem('userData');
      data = JSON.parse(data);

      if (data != null) {
        setUserName(data.name);

      } else {
        setUserName('Guest');
      }
    } catch (e) {
      console.error('There was an error with loading the user data.')
    }
  }

  // Keys for Gooogle Auth
  // android: 1065386564540-t13e878c3bcaish2o7e0cjk5aanhb9u0.apps.googleusercontent.com
  // iOS: 1065386564540-05fn7if915ch5ii7esldqp8i57t3k8u7.apps.googleusercontent.com
  // web: 1065386564540-6ubve5q36b79drp6fraa1ml3hs17p27p.apps.googleusercontent.com

  const [accessToken, setAccessToken] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '1065386564540-6ubve5q36b79drp6fraa1ml3hs17p27p.apps.googleusercontent.com',
    iosClientId: '1065386564540-05fn7if915ch5ii7esldqp8i57t3k8u7.apps.googleusercontent.co',
    androidClientId: '1065386564540-t13e878c3bcaish2o7e0cjk5aanhb9u0.apps.googleusercontent.com',
  });
  
  // user data
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(user ? user.given_name : 'Guest');
  
  useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken]);

  useEffect(() => {
    getUserData()
  }, []);

  const fetchUserInfo = async () => {
    let response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const userInfo = await response.json();
    setUser(userInfo);

    setUserName(userInfo.given_name);
    storeUserData({name: userInfo.given_name});
  }

  const loggedInOptions = user
    ? (
      <View>
        <FlipoFlatButton type='action'>
          <FlipoText className='text-xl'>Export decks</FlipoText>
          <FlipoText>to Google Drive</FlipoText>
        </FlipoFlatButton>
        <FlipoFlatButton type='action'>
          <FlipoText>Import decks from Google Drive</FlipoText>
        </FlipoFlatButton>
      </View>
    )
    : (<FlipoFlatButton type='action' onPress={() => promptAsync({useProxy: true, showInRecents: true})}>Sign in with Google</FlipoFlatButton>);

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