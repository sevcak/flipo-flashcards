import { TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// Example decks
import exampleDecksData from '../../default_data/example-decks';

// Components
import FlipoText from '../../components/FlipoText';
import DeckCard from '../../components/decks/DeckCard';
import { ScrollView } from 'react-native-gesture-handler';

const DecksHomeScreen = () => {
    const navigation = useNavigation();
    let theme = useColorScheme();

    {/* Example decks variable */}
    const exampleDecks = exampleDecksData.map(deck => (
      <TouchableOpacity
        key={deck['id']}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DeckProfileScreen', {
          deck,
        })}
        >
          <DeckCard labelUnder title={deck['title']} coverUrl={deck['coverUrl']} className='w-52'/>
      </TouchableOpacity>
    ))

    return (
      <SafeAreaView className={`bg-primary-${theme} min-h-screen px-8`}>
        {/* Example decks */}
        <View className='flex flex-col space-y-6'>
          <View>
            <FlipoText weight='extra-bold' className={`text-4xl text-secondary-${theme}`}>Example decks</FlipoText>
            <FlipoText 
              weight='semi-bold'
              className={`text-base text-${theme == 'light' ? 'ui-dark' : 'primary-light'}`}>
                Play pre-created decks
            </FlipoText>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} overScrollMode='never' className='w-screen -ml-8'>
            <View className='flex flex-row space-x-10 px-14'>
              {exampleDecks}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
}

export default DecksHomeScreen;