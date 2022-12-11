import { View, useColorScheme, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Modal, Pressable } from "react-native";
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
import EditCardModal from "../../components/decks/EditCardModal";

const DeckNewScreen = () => {
  const navigation = useNavigation();
  
  const theme = useColorScheme();
  const colorScheme = colorSchemes[theme];

  let newId = undefined;
  const [title, setTitle] = useState('New deck');
  const [cards, setCards] = useState([]);
  const [cardElements, setCardElements] = useState(cards);

  const [alert, setAlert] = useState('');

  // new deck boilerplate
  newDeck = {
    id: newId,
    custom: true,
    title: title,
    coverUrl: undefined,
    cards: cards,
  };

  const [newCard, setNewCard] = useState(false);

  // adds or changes a card in the deck
  const editCard = (card) => {
    let cardsUpdate = newDeck['cards']


    if (card['id'] >= newDeck['cards'].length) {
      cardsUpdate.push(card);
    }
    else {
      cardsUpdate[card['id']] = card;
    }

    setCards(cardsUpdate);
    
    setCardElements(newDeck['cards'].map(card => (
      <View key={card['id']}>
        <CardCell card={card}></CardCell>
      </View>
    )));
    setNewCard(false);
  }

  // creates a boilerplate for the new card in the new deck
  const createCard = () => {
    setNewCard({
      'id': newDeck['cards'].length,
      'front': {
          'title': '',
          'content': '',
          'image': undefined,
      }, 
      'back': {
          'title': '',
          'content': '',
          'image': undefined,
      }
    });
  }

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

  // resulting component
  return (
    <View>
      <SafeAreaView className={`bg-primary-${theme}`}>
        <ScrollView
         className="flex-rows h-full space-y-10"
         overScrollMode='never'
         keyboardShouldPersistTaps='always'
        >
          {/* Hero */}
          <View className='items-center space-y-10 px-12'>
            {alert}
            {/*Edit card menu modal*/}
            <EditCardModal card={newCard} editCard={editCard}></EditCardModal>
            {/*Enter name modal, shows first on deck creation*/}
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
          <View className='px-12 space-y-4 pb-10'>
            <FlipoText weight='extra-bold' className='text-3xl'>Add cards</FlipoText>
            {/* New card touchable */}
            <TouchableOpacity onPress={() => createCard()}>
              <CardCell></CardCell>
            </TouchableOpacity>
            {cardElements}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default DeckNewScreen;
