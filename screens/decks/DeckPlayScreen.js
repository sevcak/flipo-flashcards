import { Dimensions, Pressable, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

// Components
import FlipoText from '../../components/FlipoText';
import FlipoButton from '../../components/pressable/FlipoButton';

// Color schemes
import colorSchemes from "../../assets/colorSchemes";
import Flashcard from '../../components/decks/Flashcard';
import RateButton from '../../components/pressable/RateButton';

const DeckPlayScreen = ({route, navigation}) => {
    let theme = useColorScheme();
    let colorScheme = colorSchemes[useColorScheme()];

    // unpacks deck passed from parameters and creates state for it
    const [deck, setDeck] = useState(route.params.deck);
    const updateDeck = route.params.updateDeck;
    const getDecks = route.params.getDecks;

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
      let lowestRecallCards = [];
      const arsList = cards.map(card => card['ars']);
      minArs = Math.min(...arsList);
      
      for (let i = 0; i < cards.length; i += 1) {
        if (cards[i]['ars'] == minArs) {
          lowestRecallCards.push(cards[i]);
        }
      }
      console.log(lowestRecallCards);

      // if more cards have the lowest ARS, picks randomly between them
      if (lowestRecallCards.length > 1) {
        const nextCardIndex = Math.floor(Math.random() * lowestRecallCards.length);
        
        return lowestRecallCards[nextCardIndex];
      } else {
        return lowestRecallCards[0];
      }
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
      updateDeck(deck);

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
      console.log(nextCard);

      flipCard();
      setTimeout(() => {
        setFlashcard(nextCard);
      }, 150);
    }

    return (
      <SafeAreaView className={`bg-primary-${theme}`}>
          <View className="flex-rows items-center h-full">
            <Pressable className='h-96 w-full px-10 my-10' onPress={() => flipCard()}>
              <Flashcard card={flashcard} flipped={flipped}/>
            </Pressable>
            {/*Card flip Button*/}
            <FlipoButton 
              className={`my-10 px-16 ${flipButton ? '' : 'hidden'}`}
              onPress={() => flipCard()}>
                <FlipoText weight='black' className={`text-2xl text-primary-${theme} tracking-wide`}>Flip</FlipoText>
            </FlipoButton>
            {/*Recall rating button bar*/}
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
      </SafeAreaView>
    );
}

export default DeckPlayScreen;