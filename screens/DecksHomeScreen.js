import { Pressable, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

// Example decks
import exampleDecks from '../default_data/example-decks';

// Components
import FlipoText from '../components/FlipoText';
import DeckCard from '../components/DeckCard';

const DecksHomeScreen = () => {
    const navigation = useNavigation();
    let theme = useColorScheme();

    return (
      <SafeAreaView className={`bg-primary-${theme} min-h-screen px-8`}>
        <DeckCard label={true} title='Capitals of Countries' coverUrl={exampleDecks['Capitals of countries']['coverUrl']}/>
      </SafeAreaView>
    );
}

export default DecksHomeScreen;