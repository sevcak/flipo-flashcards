import React, { useEffect, useState } from 'react';
import { ScrollView, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

// Custom components
import FlipoText from '../../components/FlipoText';
import FlipoIcons from '../../components/FlipoIcons';
import colorSchemes from '../../assets/colorSchemes';
import FlipoFlatButton from '../../components/pressable/FlipoFlatButton';

WebBrowser.maybeCompleteAuthSession();

const ProfileScreen = () => {
  const navigation = useNavigation();
  let theme = useColorScheme();
  
  // user data
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(user ? user.given_name : 'Guest');
  
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

  // returns custom deck data
  const getCustomDecks = async () => {
    try {
      let data = await AsyncStorage.getItem('customDecks');
      data = JSON.parse(data);

      if (data != null) {
        return data;
      } else if (data == null) {
        return {decks: []};
      }

    } catch (e) {
      console.error('There was an error with loading the decks.')
    }
  }

  // stores custom deck data
  const storeCustomDecks = async (data) => {
    try {
      await AsyncStorage.setItem('customDecks', JSON.stringify(data));
    } catch (e) {
      console.error('There was an error with saving the decks.');
    }
  };

  const [accessToken, setAccessToken] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '1065386564540-6ubve5q36b79drp6fraa1ml3hs17p27p.apps.googleusercontent.com',
    iosClientId: '1065386564540-05fn7if915ch5ii7esldqp8i57t3k8u7.apps.googleusercontent.co',
    androidClientId: '1065386564540-t13e878c3bcaish2o7e0cjk5aanhb9u0.apps.googleusercontent.com',
    scopes: [
      'openid',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/drive.appdata',
    ]
  });
  
  const generateMultipartBody = (data) => {
    let boundary = 'request_body_boundary';
    let delimiter = `\r\n--${boundary}\r\n`;
    let close_delim = `\r\n--${boundary}--`;

    let contentType = `Content-Type: application/json\r\n\r\n`;
    let metadata = JSON.stringify(data.metadata);
    let fileContent = JSON.stringify(data.content);
    let ipartRequestBody =
      delimiter +
      contentType +
      metadata +
      delimiter +
      `Content-Type: ${data.mimeType}\r\n` +
      'Content-Transfer-Encoding: utf-8\r\n' +
      '\r\n' +
      fileContent +
      close_delim;

    return ipartRequestBody;
  }

  // imports custom deck data from the user's Google Drive to local storage
  const importDecksGDrive = async () => {
    const fileName = 'flipo_customDecks.json';

    let query = `name='${fileName}' and mimeType='application/json and trashed = false`;
    let url = `https://www.googleapis.com/drive/v3/files?${query}&spaces=appDataFolder`;

    let response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let files = await response.json();
    files = files.files;

    if (files.length > 0) {
      let file = files[0];
      let fileId = file.id;
      let downloadUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;

      let downloadResponse = await fetch(downloadUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      let fileContent = await downloadResponse.text();
      fileContent = JSON.parse(fileContent);

      storeCustomDecks(fileContent);
    } else {
      throw new Error(`No custom decks were not found on your Google Drive.`);
    }
  }

  const deleteDecksGDrive = async () => {
    const fileName = 'flipo_customDecks.json';

    let query = `name='${fileName}' and mimeType='application/json and trashed=false`;
    let url = `https://www.googleapis.com/drive/v3/files?${query}&spaces=appDataFolder`;

    let response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let files = await response.json();
    files = files.files;

    // if a custom decks file exists, delete it
    if (files.length > 0) {
      console.log('file found, deleting it...')
      let file = files[0];

      const fileId = file.id;
      url = `https://www.googleapis.com/drive/v3/files/${fileId}`;

      response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  }

  // exports custom deck data to the user's Google Drive  
  const exportDecksGDrive = async () => {
    await deleteDecksGDrive();
    
    const data = {
      name: 'flipo_customDecks.json',
      mimeType: 'application/json',
      metadata: {
        name: 'flipo_customDecks.json',
        parents: ['appDataFolder'],
      },
      content: await getCustomDecks(),
    }
    let url = `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`;

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/related; boundary=request_body_boundary',
        'Content-Transfer-Encoding': 'utf-8',
      },
      body: generateMultipartBody(data),
    });

    console.log(await response.json());
  }
  
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
        <FlipoFlatButton type='action' onPress={() => exportDecksGDrive()}>
          Export decks to Google Drive
        </FlipoFlatButton>
        <FlipoFlatButton type='action' onPress={() => importDecksGDrive()}>
          Import decks from Google Drive
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