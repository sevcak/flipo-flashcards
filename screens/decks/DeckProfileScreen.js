import { Dimensions, ScrollView, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";

// Components
import FlipoText from "../../components/FlipoText";
import DeckCard from "../../components/decks/DeckCard";
import FlipoButton from "../../components/pressable/FlipoButton";
import TextButton from "../../components/pressable/TextButton";

// Color schemes
import colorSchemes from "../../assets/colorSchemes";
import { getDeckArs } from "../../utils/deckStatUtils";
import CardCell from "../../components/decks/CardCell";

const DeckProfileScreen = ({ navigation, route }) => {
  let theme = useColorScheme();
  let colorScheme = colorSchemes[useColorScheme()];
  
  // unpacks deck passed from parameters
  const [deck, setDeck] = useState(route.params.deck);
  
  // function for updating the decks state in the homepage
  const getDecks = route.params.getDecks;

  // deck stats state
  const [deckStats, setDeckStats] = useState({
    'ars': getDeckArs(deck).toFixed(2),
  });

  // deck card elements
  const [cardElements, setCardElements] = useState([]);

  // function that refreshes the card elements
  const refreshCardElements = () => {
    setCardElements(deck['cards'].map(card => (
      <View key={card['id']}>
        <View className='flex-row items-center'>
          <CardCell card={card}></CardCell>
          <View className='grow'></View>
          <FlipoText weight='medium' className='text-left'>
            {card['ars'].toFixed(2)}
          </FlipoText>
        </View>
      </View>
    )));
  }

  // header title setup
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

  const updateDeckProfile = (passedDeck) => {
    setDeck(passedDeck);
    setDeckStats({
      'ars': getDeckArs(deck).toFixed(2),
    });
    refreshCardElements();
  }

  //refreshCardElements();
  useEffect(() => {
    console.log('DeckProfileScreen: useEffect called.')
    refreshCardElements();
  }, []);


  return (
    <SafeAreaView className={`bg-primary-${theme}`}>
      <ScrollView
        className='-mt-9'
        showsVerticalScrollIndicator={false}
        overScrollMode='never'
      >
      <View className="flex-rows items-center h-full p-10">
        <DeckCard
          labelCover
          className="w-full rounded-xl"
          coverUrl={deck.coverUrl}
          title={deck.title}
          cardCount={deck.cards.length}
          style={{ elevation: 5 }}
        ></DeckCard>
        {/* Buttons */}
        <View className='m-10 space-y-4'>
          {/* Play button */}
          <TouchableOpacity 
            onPress={() =>
              navigation.navigate("DeckPlayScreen", {
                deck: deck,
                updateDeckProfile: updateDeckProfile,
                getDecks: getDecks,
              })
            }
            activeOpacity={0.5}
          >
            <FlipoButton>
              <FlipoText
                weight="black"
                className={`text-2xl text-primary-${theme} tracking-wide`}
              >
                Play Deck
              </FlipoText>
            </FlipoButton>
          </TouchableOpacity>
          {/* Edit button
              only custom decks can be edited */}
          {
            deck.custom &&
              <TextButton
                onPress={() => {
                  navigation.navigate("DeckEditScreen", {
                    setDeck,
                    getDecks,
                    deck,
                  })
                }}
                className={`text-center text-strong-${theme}`}
              >
                Edit deck
              </TextButton>
          }
        </View>
        {/* Deck Stats */}
        <View className='w-full space-y-8'>
          <View>
            <FlipoText weight='bold' className='text-3xl text-left'>Deck stats</FlipoText>
            {/* Average Recall Score */}
            <View>
              <View className='flex-row w-full items-center py-2'>
                <View>
                  <FlipoText className='text-transparent py-2'>x</FlipoText>
                  <FlipoText weight='bold' className={`text-xl grow`}>ARS:</FlipoText>
                </View>
                <View className='grow'>
                  <FlipoText weight='semi-bold' className={`text-ui-${theme} tracking-wider text-center py-2`}>
                    Deck Average Recall Score
                  </FlipoText>
                  <FlipoText weight='bold' className={`text-xl text-center text-strong-${theme} scale-[2]`}>
                    {deckStats.ars}
                  </FlipoText>
                </View>
              </View>
            </View>
          </View>
          {/* Cards */}
          <View className='space-y-4'>
            <FlipoText weight='bold' className='text-3xl text-left'>Cards</FlipoText>
            <View className='pl-6 flex-row w-full'>
              <FlipoText weight='bold' className={`text-left text-strong-${theme}`}>
                ID
              </FlipoText>
              <View className='grow'></View>
              <FlipoText weight='bold' className={`text-right text-strong-${theme}`}>
                ARS
              </FlipoText>
            </View>
            <View className='space-y-3'>{cardElements}</View>
          </View>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeckProfileScreen;
