import { View, useColorScheme, TextInput, TouchableOpacity, ScrollView} from "react-native";
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
import TextButton from "../../components/pressable/TextButton";

// Localization
import * as Localization from 'expo-localization';
import * as locales from "../../localizations/decks/localizationDeckEditScreen";
import { I18n } from 'i18n-js';

const DeckEditScreen = ({ route, navigation }) => {
  const colorScheme = colorSchemes[useColorScheme()];

  // localization setup
  const [locale, setLocale] = useState(Localization.locale);
  const i18n = new I18n(locales)
  i18n.enableFallback = true;
  i18n.translations = {...locales};
  i18n.defaultLocale = "en";
  i18n.locale = locale;

  // functions for updating the deck states in previous screens
  const updateDecks = route.params.updateDecks;
  const updateDeckProfile = route.params.updateDeckProfile;

  const existing = (route.params.deck != undefined);
  
  const [customDecks, setCustomDecks] = useState({decks: []});

  // header title setup
  navigation.setOptions({
    title: existing ? i18n.t('screenTitleEdit') : i18n.t('screenTitleNew'),
    headerTitleStyle: {
      fontFamily: "Montserrat-ExtraBold",
      color: colorScheme["ui"],
      letterSpacing: 1.8,
      fontSize: 20,
    },
  });
  
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
      console.error('There was an error with loading the decks.');
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
    : i18n.t('screenTitleNew')
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
      'ars': 1,
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

  // saves the deck to storage
  const createDeck = () => {
    // gets custom decks list to append the new deck to
    getDecks();
    let newCustomDecks = customDecks;

    // checks if the conditions for deck creation are met
    if (newDeck['cards'].length < 2) {
      // throws an alert informing the user about deck creation conditions
      setAlert(
        <FlipoModal
         title={i18n.t('cantCreate')}
         visible={true}
         onButtonPress={() => {setAlert('')}}
        >
          <FlipoText weight='medium' className='text-center text-lg text-primary dark:text-primary-dark'>
            {i18n.t('toCreate')}
          </FlipoText>
        </FlipoModal>
      );
    } else {
      // edits or creates the deck and returns to the previous menu
      if (existing) {
        newCustomDecks['decks'][newDeck['id']] = newDeck;
      } else {
        newCustomDecks['decks'].push(newDeck);
      }
      
      setCustomDecks(newCustomDecks);
      storeDecks(customDecks);

      updateDecks();
      navigation.goBack();
    }
  }

  // removes the deck from storage and goes back
  const deleteDeck = () => {
    // gets custom decks list to append the new deck to
    getDecks();

    let newCustomDecks = customDecks
    //console.log(newCustomDecks);
    newCustomDecks['decks'].splice(route.params.deck['id'], 1);
    newCustomDecks['decks'] = reorderObjectArrayId(newCustomDecks['decks']);

    setCustomDecks(newCustomDecks);
    storeDecks(customDecks);

    updateDecks();
    navigation.pop(2);
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
      if (newDeck['cards'].length >= 2 || !existing) {
        // if deck creation/edit conditons are met, proceed
        updateDeckProfile(newDeck);
        return;
      } else {
        // prevent default behavior of leaving the screen
        e.preventDefault();
        setAlert(
          <FlipoModal
            title={i18n.t('cantCreate')}
            visible={true}
            onButtonPress={() => {setAlert('')}}
          >
            <FlipoText weight='medium' className='text-center text-lg text-primary dark:text-primary-dark'>
              {i18n.t('toCreate')}
            </FlipoText>
          </FlipoModal>
        );
      }
    });
  }, [newCard, cards]);

  // resulting component
  return (
    <View>
      <View className='bg-primary dark:bg-primary-dark'>
        <ScrollView
         className="flex-rows h-full space-y-10"
         overScrollMode='never'
         keyboardShouldPersistTaps='always'
        >
          {/* Hero */}
          <View className='items-center space-y-10 px-12'>
            {alert}
            {/*Edit card menu modal*/}
            <EditCardModal card={newCard} editCard={updateCard} i18n={i18n}></EditCardModal>
            <DeckCard title={newDeck.title} className='w-60'/>
            {/* Editable deck title label */}
            <View className='space-y-2'>
              <FlipoText className='text-lg text-center'>{i18n.t('deckName')}</FlipoText>
              <TextInput
                cursorColor={colorScheme['green']}
                maxLength={30}
                multiline
                defaultValue={newDeck.title}
                className='text-secondary dark:text-secondary-dark 
                  border-b border-green-dark dark:border-green-dark
                  text-2xl text-center pb-1'
                autoFocus={route.params.deck == undefined}
                autoComplete='off'
                autoCorrect={false}
                spellCheck={false}
                style={{fontFamily: 'Montserrat-ExtraBold'}}
                onChangeText={(val) => setTitle(val)}
              />
            </View>
            <View className='flex-row mx-8 space-x-4'>
              {existing && <TextButton onPress={() => deleteDeck()} className='text-alert'>{i18n.t('deleteDeck')}</TextButton>}
              <TouchableOpacity onPress={() => createDeck()}>
                <FlipoButton>{existing ? i18n.t('done') : i18n.t('create')}</FlipoButton>
              </TouchableOpacity>
            </View>
          </View>
          {/* Section for adding cards  */}
          <View className='px-12 space-y-4 pb-10'>
            <FlipoText weight='extra-bold' className='text-3xl'>{i18n.t('addCards')}</FlipoText>
            {/* New card touchable */}
            <TouchableOpacity onPress={() => createCard()}>
              <CardCell title={i18n.t('newCard')}></CardCell>
            </TouchableOpacity>
            {cardElements}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DeckEditScreen;
