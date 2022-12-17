import { Pressable, TouchableOpacity, useColorScheme, View } from 'react-native';
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

const DeckPlayScreen = () => {
    const navigation = useNavigation();
    let theme = useColorScheme();
    let colorScheme = colorSchemes[useColorScheme()];

    // unpacks deck passed from parameters
    const {
      params: {
        deck
      }
    } = useRoute();

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
      const cardIndex = Math.floor(Math.random() * cards.length);
      return cards[cardIndex];
    }
    // flips the current card
    function flipCard() {
      setFlipButton(prevFlipButton => (!prevFlipButton));
      setRateButtons(prevRateButtons => (!prevRateButtons));
      setFlipped(prevFlipped => (!prevFlipped));
    }

    // deals the next card
    function nextCard(cards, prevCard) {
      let nextCard;
      do {
        nextCard = getNextCard(cards)
      } while (prevCard.id == nextCard.id);
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
            {/*Flip Button*/}
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
                    <RateButton key={button} onPress={() => nextCard(deck.cards, flashcard)}>{button}</RateButton>)
                  )
                }
              </View>
            </View>
          </View>
      </SafeAreaView>
    );
}

export default DeckPlayScreen;