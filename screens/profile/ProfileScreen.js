import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, useColorScheme, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

// Color schemes
import colorSchemes from '../../assets/colorSchemes';

// Custom components
import FlipoText from '../../components/FlipoText';
import FlipoIcons from '../../components/FlipoIcons';
import FlipoFlatButton from '../../components/pressable/FlipoFlatButton';
import FlipoModal from '../../components/FlipoModal';

WebBrowser.maybeCompleteAuthSession();

const ProfileScreen = () => {
  const navigation = useNavigation();
  let theme = useColorScheme();
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

  // alert modal state
  const [alert, setAlert] = useState(null);
  
  // user data states
  const [googleAuth, setGoogleAuth] = useState(false);
  const [userName, setUserName] = useState('Guest');
  const [userPicture, setUserPicture] = useState(null);
  
  // stores user data to the local storage
  const storeUserData = async (data) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (e) {
      console.error('ProfileScreen: There was an error with saving the the user data.')
    }
  };

  // loads the user data from local storage
  const getUserData = async () => {
    try {
      let data = await AsyncStorage.getItem('userData');
      data = JSON.parse(data);

      if (data != null) {
        setUserName(data.name);
        setUserPicture(data.picture)
      }
    } catch (e) {
      console.error('There was an error with loading the user data.')
    }
  }

  // returns custom deck data from local storage
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
      console.error('ProfileScreen: There was an error with loading the decks.')
    }
  }

  // stores custom deck data to the local storage
  const storeCustomDecks = async (data) => {
    try {
      await AsyncStorage.setItem('customDecks', JSON.stringify(data));
    } catch (e) {
      console.error('ProfileScreen: There was an error with saving the decks.');
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

  // Checks, if the access token is valid
  const isGoogleTokenValid = async () => {
    const url = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`

    let response = await fetch(url, {
      method: 'GET',
    });

    return (response.status == '200') ? true : false;
  }

  // returns a list of files from Google Drive with specified name
  const getDecksGDrive = async () => {
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
    return files.files;
  }

  // imports custom deck data from the user's Google Drive to local storage
  const importDecksGDrive = async () => {
    // displays a modal so the user has to wait until done
    setAlert(
      <FlipoModal 
          title="Please wait"
          visible={true}
          noDefaultButton
        >
          <FlipoText weight='medium' className={`text-center text-lg text-primary-${theme}`}>
            Importing data from your Google Drive...
          </FlipoText>
        </FlipoModal>
    );
    
    const files = await getDecksGDrive();

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

      // removes modal
      setAlert(null);
    } else {
      setAlert(
        <FlipoModal 
          title="Can't import decks"
          visible={true}
          onButtonPress={() => {setAlert(null)}}
        >
          <FlipoText weight='medium' className={`text-center text-lg text-primary-${theme}`}>
            No custom decks were found on your Google Drive.
          </FlipoText>
        </FlipoModal>
      );
    }
  }

  // deletes the custom decks file from the user's Google Drive, if it exists
  const deleteDecksGDrive = async () => {
    const files = await getDecksGDrive();

    // if a custom decks file exists, delete it
    if (files.length > 0) {
      console.log('ProfileScreen: Decks file found on Google Drive, deleting it...')
      let file = files[0];

      const fileId = file.id;
      const url = `https://www.googleapis.com/drive/v3/files/${fileId}`;

      let response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  }

  // exports custom deck data to the user's Google Drive  
  const exportDecksGDrive = async () => {
    // displays a modal so the user has to wait until done
    setAlert(
      <FlipoModal 
          title="Please wait"
          visible={true}
          noDefaultButton
        >
          <FlipoText weight='medium' className={`text-center text-lg text-primary-${theme}`}>
            Exporting data to your Google Drive...
          </FlipoText>
        </FlipoModal>
    );
    
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
    
    const url = `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`;

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/related; boundary=request_body_boundary',
        'Content-Transfer-Encoding': 'utf-8',
      },
      body: generateMultipartBody(data),
    });

    setAlert(null);
  }

  // updates the user info states from their Google account info
  const fetchUserInfo = async () => {
    let response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    
    const userInfo = await response.json();

    setUserName(userInfo.given_name);
    
    let picture = userInfo.picture;
    picture = picture.slice(0, picture.lastIndexOf('='))
    setUserPicture(picture);
    
    storeUserData({
      name: userInfo.given_name,
      picture: picture,
    });
  }

  // Modal to double-check the user's decision
  // to import decks from Google Drive 
  const importGDriveModal = (
    <FlipoModal
      title="Warning"
      visible={true}
      onButtonPress={() => {
        setAlert(null);
        importDecksGDrive();
      }}
      buttonText='Proceed'
      cancelButton
      onCancelPress={() => {
        setAlert(null);
      }}
    >
      <View className='space-y-4'>
        <FlipoText
          weight='medium'
          className={`text-center text-lg text-primary-${theme}`}
        >
          Importing decks from your Google Drive will overwrite your local decks.
        </FlipoText>
        <FlipoText
          weight='medium'
          className={`text-center text-lg text-primary-${theme}`}
        >
          Do you want to proceed?
        </FlipoText>
      </View>
    </FlipoModal>
  );

  // Modal to double-check the user's decision
  // to export decks to Google Drive
  const exportGDriveModal = (
    <FlipoModal
      title="Warning"
      visible={true}
      onButtonPress={() => {
        setAlert(null);
        exportDecksGDrive();
      }}
      buttonText='Proceed'
      cancelButton
      onCancelPress={() => {
        setAlert('');
      }}
    >
      <View className='space-y-4'>
        <FlipoText
          weight='medium'
          className={`text-center text-lg text-primary-${theme}`}
        >
          Exporting your local decks to your Google Drive 
          will overwrite the decks currently stored there.
        </FlipoText>
        <FlipoText
          weight='medium'
          className={`text-center text-lg text-primary-${theme}`}
        >
          Do you want to proceed?
        </FlipoText>
      </View>
    </FlipoModal>
  );
  
  // If a profile picture is loaded, it has to get a background,
  // so the default profile icon doesn't clip from underneath.
  //
  // This is done instead of hiding the default icon so that in the case
  // the picture can't be loaded, the profile icon isn't blank.
  const [pictureBackground, setPictureBackground] = useState('');

  // Google login determinant buttons
  const loggedInOptions = ( googleAuth
    ? (
      <View>
        <FlipoFlatButton type='action' onPress={() => setAlert(exportGDriveModal)}>
          Export decks to Google Drive
        </FlipoFlatButton>
        <FlipoFlatButton type='action' onPress={() => setAlert(importGDriveModal)}>
          Import decks from Google Drive
        </FlipoFlatButton>
      </View>
    )
    : (<FlipoFlatButton type='action' onPress={() => promptAsync({/*useProxy: true, */showInRecents: true})}>Sign in with Google</FlipoFlatButton>)
  );
  
  // Size of the profile picture/icon
  const pfpSize = (Dimensions.get('window').width * 0.5);

  // on successful Google auth
  useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
      setGoogleAuth(true);
    }
  }, [response, accessToken]);

  useEffect(() => {
    getUserData();
  }, []);

  // logs the user out if the access token has expired
  useEffect(() => {
    const interval = setInterval(() => {
      if (accessToken) {
        console.log('ProfileScreen: Checking if access key is valid');
        if (!isGoogleTokenValid()) {
          setGoogleAuth(false);
        }
      }
    },  600000);
    return () => clearInterval(interval);
  }, []);

  // Profile Screen Component
  return (
    <View className={`bg-primary-${theme}`}>
      {alert}
      <ScrollView
        className='-mt-9 relative'
        showsVerticalScrollIndicator={false}
        overScrollMode='never'
      >
        <View className='h-fit'>
          <View className="items-center justify-center p-10 space-y-6 w-full aspect-square">
            <View className='relative'>
              <View className={`absolute bottom-0 left-0 z-10 ${pictureBackground}`}>
                <Image
                  source={{uri: `${userPicture}=s${pfpSize}-c`}}
                  className='rounded-full'
                  style={{height: pfpSize, width: pfpSize}}
                  onLoad={() => setPictureBackground('bg-primary')}
                />
              </View>
              <FlipoIcons name='profile' size={pfpSize} color={colorSchemes['dark'].green}/>
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
      <View className='h-screen'></View>
    </View>
  );
}

export default ProfileScreen;