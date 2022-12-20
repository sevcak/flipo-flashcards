import { TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Example decks
import exampleDecksData from '../../default_data/example-decks';

// Components
import FlipoText from '../../components/FlipoText';
import DeckCard from '../../components/decks/DeckCard';
import { ScrollView } from 'react-native-gesture-handler';

// Functions
import { useEffect, useState } from 'react';

const DecksHomeScreen = () => {
  const navigation = useNavigation();
  let theme = useColorScheme();

  // Custom deck states
  const [customDecks, setCustomDecks] = useState([]);
  const [customDeckElements, setCustomDeckElements] = useState([]);

  // loads custom deck data
  const getDecks = async () => {
    try {
      let data = await AsyncStorage.getItem('customDecks');
      data = JSON.parse(data);

      // checks if the custom decks have updated, if they have, sets new state
      // has to convert object to string so it works if the objects are the same
      if (data != null && JSON.stringify(data.decks) != JSON.stringify(customDecks)) {
        console.log('Found new custom deck changes')
        setCustomDecks(data.decks);
      } else if (data == null && JSON.stringify(customDecks) != '[]') {
        setCustomDecks([]);
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

    // Updates the custom decks list on re-render
    useEffect(() => {
      console.log('useEffect called.')
      getDecks();
      updateCustomDeckElements();
    }, [customDecks]);

    const updateCustomDeckElements = () => {
      console.log('Refreshed custom decks.');
      setCustomDeckElements(customDecks.map(deck => (
        <TouchableOpacity 
          key={deck.id}
          onPress={() => navigation.navigate('DeckProfileScreen', {
            getDecks,
            deck,
          })}
        >
          <DeckCard
          labelUnder
          title={deck.title}
          className='w-52'
          coverUrl={deck.coverUrl}
          />
        </TouchableOpacity>
      )));
    }

    // Example decks variable
    const exampleDecks = exampleDecksData.map(deck => (
      <TouchableOpacity
        key={deck['id']}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DeckProfileScreen', {
          deck,
        })}
        >
          <DeckCard 
            labelUnder
            title={deck['title']}
            coverUrl={deck['coverUrl']}
            className='w-52'/>
      </TouchableOpacity>
    ))

    return (
      <SafeAreaView className={`bg-primary-${theme} min-h-screen`}>
        <ScrollView
         className='space-y-8 -mt-9 pt-8 h-screen'
         showsVerticalScrollIndicator={false}
         overScrollMode='never'
        >
          {/* User decks */}
          <View className='flex flex-col space-y-6'>
            <View className='px-8'>
              <FlipoText weight='extra-bold' className={`text-4xl text-secondary-${theme}`}>Your decks</FlipoText>
              <FlipoText 
                weight='semi-bold'
                className={`text-base text-${theme == 'light' ? 'ui-dark' : 'primary-light'}`}>
                  Play your created decks
              </FlipoText>
            </View>
            <ScrollView 
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              overScrollMode='never'
              className='w-screen'
            >
              <View className='flex flex-row space-x-10 px-14'>
              {/*New dec card (always apears at the end)*/}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('DeckEditScreen', {
                  getDecks,
                })}
              >
                  <DeckCard 
                   labelUnder title='Create new deck'
                   className='w-52'
                   coverUrl={require('../../assets/decks/new-deck.png')}
                  />
              </TouchableOpacity>
              {/* Custom Decks */}
              {customDeckElements}
              </View>
            </ScrollView>
          </View>
          
          {/* Example decks */}
          <View className='flex flex-col space-y-6 mb-48'>
            <View className='px-8'>
              <FlipoText
                weight='extra-bold'
                className={`text-4xl text-secondary-${theme}`}
              >
                Example decks
              </FlipoText>
              <FlipoText 
                weight='semi-bold'
                className={`text-base text-${theme == 'light' ? 'ui-dark' : 'primary-light'}`}
              >
                Play pre-created decks
              </FlipoText>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              overScrollMode='never'
              className='w-screen'
            >
              <View className='flex flex-row space-x-10 px-14'>
                {exampleDecks}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}

export default DecksHomeScreen;