import { View, useColorScheme, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import FlipoText from "../../components/FlipoText";
import DeckCard from "../../components/decks/DeckCard";
import FlipoModal from "../../components/FlipoModal";
import FlipoButton from "../../components/pressable/FlipoButton";

// Color schemes
import colorSchemes from "../../assets/colorSchemes";
import CardCell from "../../components/decks/CardCell";

const DeckNewScreen = () => {
  const navigation = useNavigation();
  
  let theme = useColorScheme();
  let colorScheme = colorSchemes[theme];

  let newId = undefined;
  const [title, setTitle] = useState('New deck');

  const [alert, setAlert] = useState('');

  let newDeck = {
    id: newId,
    custom: true,
    title: title,
    coverUrl: undefined,
    cards: [],
  };

  // loads custom deck data
  const getDecks = async () => {
    try {
      return await JSON.parse(AsyncStorage.getItem('customDecks'));
    } catch (e) {
      console.error('There was an error with loading the decks.')
    }
  }

  // stores custom deck data
  const storeDecks = async (data) => {
    try {
      await AsyncStorage.setItem('customDecks', JSON.stringify(data));
    } catch (e) {
      console.error('There was an error with saving the decks.')
    }
  };

  // creates the new deck
  const createDeck = () => {
    // checks if the conditions for deck creation are met
    if (newDeck['cards'].length < 2) {
      setAlert(
        <FlipoModal
         title="Can't create deck"
         visible={true}
         onButtonPress={() => {setAlert('')}}
        >
          <FlipoText weight='medium' className={`text-center text-lg text-primary-${theme}`}>
            To create a deck it has to have at least two cards.
          </FlipoText>
        </FlipoModal>
      )
    }
  }

  return (
    <View>
      <SafeAreaView className={`bg-primary-${theme}`}>
        <ScrollView className="flex-rows h-full space-y-10">
          {/* Hero */}
          <View className='items-center space-y-10 px-12'>
            {alert}
            <FlipoModal 
            title='Create a new deck'
            className='space-y-4'
            >
              <FlipoText weight='medium' className={`text-center text-xl text-primary-${theme}`}>
                Enter new deck name:
              </FlipoText>
              <TextInput 
              cursorColor={colorScheme['green']}
              maxLength={30}
              defaultValue='New Deck'
              className={`text-primary-${theme} text-xl text-center border-b border-primary-${theme} pb-1`}
              autoFocus
              autoComplete='off'
              autoCorrect={false}
              spellCheck={false}
              style={{fontFamily: 'Montserrat-SemiBold'}}
              onChangeText={(val) => setTitle(val)}
              />
            </FlipoModal>
            <DeckCard title={newDeck.title} className='w-60'/>
            <FlipoButton onPress={() => createDeck()}>Create Deck</FlipoButton>
          </View>
          {/* Section for adding cards  */}
          <View className='px-12 space-y-4'>
            <FlipoText weight='extra-bold' className='text-3xl'>Add cards</FlipoText>
            {/* New card touchable */}
            <TouchableOpacity>
              <CardCell></CardCell>
            </TouchableOpacity>
            <View>
              <CardCell card={{id: 4, front: {title: 'kid named Deak'}}}></CardCell>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default DeckNewScreen;
