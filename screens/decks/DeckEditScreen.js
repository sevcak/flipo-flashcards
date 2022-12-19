import { View, useColorScheme, SafeAreaView, TextInput, TouchableOpacity, ScrollView} from "react-native";
import React, { useEffect, useState } from "react";
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
import { reorderObjectArrayId } from "../../utils/organisationUtils";

const DeckEditScreen = ({ route, navigation }) => {
  const theme = useColorScheme();
  const colorScheme = colorSchemes[theme];

  // functions for updating the deck states in previous screens
  const updateDecks = route.params.getDecks;
  const updateDeckProfile = route.params.setDeck;

  const existing = (route.params.deck != undefined);
  
  const [customDecks, setCustomDecks] = useState({decks: []});
  
  // loads custom deck data
  const getDecks = async () => {
    try {
      const data = await AsyncStorage.getItem('customDecks');
      if (data != null) {
        setCustomDecks(JSON.parse(data));
      } else {
        setCustomDecks({decks: []});
      }
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

  const [title, setTitle] = useState( existing
    ? route.params.deck['title']
    : 'New deck'
  );
  const [cards, setCards] = useState( existing
    ? route.params.deck['cards']
    : []);
  const [cardElements, setCardElements] = useState([]);
  const [alert, setAlert] = useState('');

  // new deck boilerplate
  let newDeck = ( existing
    ? {
        id: route.params.deck['id'],
        custom: true,
        title: title,
        coverUrl: route.params.deck['coverUrl'],
        cards: cards,
      }
    : {
        id: customDecks['decks'].length,
        custom: true,
        title: title,
        coverUrl: undefined,
        cards: cards,
      }
  );


  const [newCard, setNewCard] = useState(false);

  // adds or changes a card in the deck
  const updateCard = (card) => {
    let cardsUpdate = newDeck['cards'];

    // If a new card is being created
    if (card['id'] >= newDeck['cards'].length) {
      cardsUpdate.push(card);
    } else { // if an existing card is being edited
      cardsUpdate[card['id']] = card;
    }

    setCards(cardsUpdate);
    
    setNewCard(false);
  }

  // removes a card from the deck
  const removeCard = (index) => {
    let cardsUpdate = newDeck['cards'];

    try {
      cardsUpdate.splice(index, 1);
      cardsUpdate = reorderObjectArrayId(cardsUpdate);
      
      setCards(cardsUpdate);
      refreshCardElements();
    } catch (e) {
      console.error('Could not remove card. Most likely, card with specified id was not found.');
    }
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

  const createDeck = () => {
    // gets custom decks list to append the new deck to
    getDecks();

    // checks if the conditions for deck creation are met
    if (newDeck['cards'].length < 2) {
      // throws an alert informing the user about deck creation conditions
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
      );
    } else {
      // edits or creates the deck and returns to the previous menu
      if (existing) {
        customDecks['decks'][newDeck['id']] = newDeck;
        updateDeckProfile(newDeck);
      } else {
        customDecks['decks'].push(newDeck);
      }
      
      storeDecks(customDecks);

      updateDecks();
      navigation.goBack();
    }
  }

  // function that refreshes the card elements
  const refreshCardElements = () => {
    setCardElements(newDeck['cards'].map(card => (
      <View key={card['id']}>
        <View className='flex-row items-center'>
          <TouchableOpacity className='grow' onPress={() => setNewCard(card)}>
            <CardCell card={card}></CardCell>
          </TouchableOpacity>
          {/* <View className='grow'></View> */}
          <TouchableOpacity onPress={() => removeCard(card['id'])}>
            <FlipoText weight='bold' className='text-lg text-alert pl-6'>X</FlipoText>
          </TouchableOpacity>
        </View>
      </View>
    )));
  }

  // Updates the custom decks list on data change
  useEffect(() => {
    getDecks();
    refreshCardElements();

    // deck conditions check before leaving the screen
    navigation.addListener('beforeRemove', (e) => {
      if (newDeck['cards'].length >= 2) {
        // if deck creation/edit conditons are met, proceed
        return;
      } else {
        // prevent default behavior of leaving the screen
        e.preventDefault();
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
        );
      }
    });
  }, [newCard, cards]);

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
            <EditCardModal card={newCard} editCard={updateCard}></EditCardModal>
            <DeckCard title={newDeck.title} className='w-60'/>
            {/* Editable deck title label */}
            <View className='space-y-2'>
              <FlipoText className='text-lg text-center'>Deck Name:</FlipoText>
              <TextInput
                cursorColor={colorScheme['green']}
                maxLength={30}
                defaultValue={newDeck.title}
                className={
                  `text-secondary-${theme} text-2xl text-center border-b border-green-${theme} pb-1`
                }
                autoFocus={route.params.deck == undefined}
                autoComplete='off'
                autoCorrect={false}
                spellCheck={false}
                style={{fontFamily: 'Montserrat-ExtraBold'}}
                onChangeText={(val) => setTitle(val)}
              />
            </View>
            <FlipoButton onPress={() => createDeck()}>{existing ? 'Done' : 'Create Deck'}</FlipoButton>
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

export default DeckEditScreen;
