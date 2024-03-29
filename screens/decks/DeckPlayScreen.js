import { Dimensions, Pressable, useColorScheme, View } from 'react-native';
import React, { useState } from 'react';

// Components
import FlipoText from '../../components/FlipoText';
import FlipoButton from '../../components/pressable/FlipoButton';

// Color schemes
import colorSchemes from "../../assets/colorSchemes";
import Flashcard from '../../components/decks/Flashcard';
import RateButton from '../../components/pressable/RateButton';
import { weightedRandom } from '../../utils/deckStatUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeckPlayScreen = ({route, navigation}) => {
    let colorScheme = colorSchemes[useColorScheme()];

    // unpacks deck passed from parameters and creates state for it
    const [deck, setDeck] = useState(route.params.deck);
    const updateDeckProfile = route.params.updateDeckProfile;
    const updateDecks = route.params.updateDecks;

    // stores custom deck data
    const storeDeck = async (deck) => {
      let data = [];
      const storageKey = deck['custom'] ? 'customDecks' : 'exampleDecks';

      try {
        data = await AsyncStorage.getItem(storageKey);
        data = JSON.parse(data);

        data['decks'][deck['id']]['cards'] = deck['cards'];
      } catch (e) {
        console.error('There was an error with loading deck data.');
      }

      try {
        await AsyncStorage.setItem(storageKey, JSON.stringify(data));
      } catch (e) {
        console.error('There was an error with saving deck data.')
      }
    };

    // header setup
    navigation.setOptions({
      title: deck.title,
      headerTitleStyle: {
        fontFamily: "Montserrat-ExtraBold",
        color: colorScheme["ui"],
        letterSpacing: 1.8,
        fontSize: deck.title.length < 20
          ? 20
          : Dimensions.get("window").width / deck.title.length,
      },
    });

    // States and variable data
    const firstCard = getNextCard(deck.cards);
    const [flipped, setFlipped] = useState(false);
    const [flashcard, setFlashcard] = useState(firstCard);
    const [flipButton, setFlipButton] = useState(true);
    const [rateButtons, setRateButtons] = useState(false);
    const rateButons = [1, 2, 3, 4, 5];

    // picks and returns the next card to give the user
    function getNextCard(cards) {
      const arsList = cards.map(card => card['ars']);
      
      // calculates a weighted random based on ARSw
      const weightList = arsList.map(ars => 5.1 - ars)

      return weightedRandom(cards, weightList);
    }
    
    // updates deck stats based on recall rating
    const rateRecall = (card, rating) => {
      let newDeck = deck;

      // updates the history of recalls
      if (card['recentRecalls'] == undefined) {
        card['recentRecalls'] = [];
      } else if (card['recentRecalls'].length == 5) {
        card['recentRecalls'].shift();
      }
      card['recentRecalls'].push(rating);
      
      // calculates new ARS (Average Recall Score)
      card['ars'] = card['recentRecalls'].reduce((a, b) => a + b, 0) / card['recentRecalls'].length;

      newDeck['cards'][card['id']] = card;
      setDeck(newDeck);
      storeDeck(deck);
      updateDeckProfile(deck);
      updateDecks();
      
      nextCard(deck.cards, card);
    }

    // flips the current card
    function flipCard() {
      setFlipButton(prevFlipButton => (!prevFlipButton));
      setRateButtons(prevRateButtons => (!prevRateButtons));
      setFlipped(prevFlipped => (!prevFlipped));
    }

    // deals the next card
    function nextCard(cards, prevCard) {
      const nextCard = getNextCard(cards.slice(0,prevCard['id']).concat(cards.slice(prevCard['id'] + 1)));

      flipCard();
      setTimeout(() => {
        setFlashcard(nextCard);
      }, 150);
    }

    return (
      <View className='bg-primary dark:bg-primary-dark'>
          <View className="flex-rows items-center h-full">
            <Pressable className='h-96 w-full px-10 my-10' onPress={() => flipCard()}>
              <Flashcard card={flashcard} flipped={flipped}/>
            </Pressable>
            {/* Card flip button */}
            <FlipoButton 
              className={`my-10 px-16 ${flipButton ? '' : 'hidden'}`}
              onPress={() => flipCard()}>
                <FlipoText
                  weight='black'
                  className='text-2xl text-primary tracking-wide'
                >
                  Flip
                </FlipoText>
            </FlipoButton>
            {/* Recall rating button bar */}
            <View className={`w-full grow justify-end ${rateButtons ? '' : 'hidden'}`}>
              <FlipoText weight='bold' className='px-10 mb-6 text-lg text-center'>
                How well did you recall this card?
              </FlipoText>
              <View className={'flex-row w-full justify-center'}>
                {
                  rateButons.map((button) => (
                    <RateButton key={button} onPress={() => rateRecall(flashcard, button)}>{button}</RateButton>)
                  )
                }
              </View>
            </View>
          </View>
      </View>
    );
}

export default DeckPlayScreen;