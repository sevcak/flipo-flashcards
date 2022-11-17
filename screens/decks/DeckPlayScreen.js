import { useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

// Components
import FlipoText from '../../components/FlipoText';
import FlipoButton from '../../components/FlipoButton';

// Color schemes
import colorSchemes from "../../assets/colorSchemes";
import Flashcard from '../../components/decks/Flashcard';

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
        fontFamily: 'Montserrat-ExtraBold',
            color: colorScheme['ui'],
            letterSpacing: 1.8,
            fontSize: 380 / deck.title.length,
      }
    });

    // function that picks the next card to give the user
    function getNextCard(cards) {
      const cardIndex = Math.floor(Math.random() * cards.length);
      return cards[cardIndex];
    }
    // function that flips the current card
    function flipCard() {
      setFlipped(prevFlipped => (!prevFlipped));
    }

    const firstCard = getNextCard(deck.cards);
    
    const [flipped, setFlipped] = useState(false);
    const [flashcard, setFlashcard] = useState(firstCard);

    return (
      <SafeAreaView className={`bg-primary-${theme} p-10`}>
          <View className="flex-rows items-center h-full">
            <View className='h-96 w-full'>
              <Flashcard card={flashcard} flipped={flipped}/>
            </View>
            <FlipoButton 
              className='my-10 px-16'
              onPress={() => flipCard()}>
                <FlipoText weight='black' className={`text-2xl text-primary-${theme} tracking-wide`}>Flip</FlipoText>
            </FlipoButton>
          </View>
      </SafeAreaView>
    );
}

export default DeckPlayScreen;