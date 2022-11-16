import { useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

// Components
import FlipoText from '../../components/FlipoText';
import DeckCard from '../../components/decks/DeckCard';

const DeckProfileScreen = () => {
    const navigation = useNavigation();
    let theme = useColorScheme();

    // unpacks deck passed from parameters
    const {
      params: {
        deck
      }
    } = useRoute();

    return (
      <SafeAreaView className={`bg-primary-${theme} p-10`}>
          <View className="flex-rows items-center h-full">
            <DeckCard labelCover
              className='w-full rounded-xl'
              coverUrl={deck.coverUrl}
              title={deck.title}
              cardCount={deck.cards.length}
              style={{elevation: 5}}
            ></DeckCard>
          </View>
      </SafeAreaView>
    );
}

export default DeckProfileScreen;