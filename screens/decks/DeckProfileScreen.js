import { Dimensions, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";

// Components
import FlipoText from "../../components/FlipoText";
import DeckCard from "../../components/decks/DeckCard";
import FlipoButton from "../../components/pressable/FlipoButton";
import TextButton from "../../components/pressable/TextButton";

// Color schemes
import colorSchemes from "../../assets/colorSchemes";

const DeckProfileScreen = ({ navigation, route }) => {
  let theme = useColorScheme();
  let colorScheme = colorSchemes[useColorScheme()];

  // unpacks deck passed from parameters
  const [deck, setDeck] = useState(route.params.deck);

  // function for updating the custom decks state in the homepage
  const getDecks = route.params.getDecks;

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

  useEffect(() => {
    setDeck(route.params.deck);
  }, [route.params.deck]);

  return (
    <SafeAreaView className={`bg-primary-${theme} p-10`}>
      <View className="flex-rows items-center h-full">
        <DeckCard
          labelCover
          className="w-full rounded-xl"
          coverUrl={deck.coverUrl}
          title={deck.title}
          cardCount={deck.cards.length}
          style={{ elevation: 5 }}
        ></DeckCard>
        <View className='flex-row m-10 space-x-4'>
          {/* only custom decks can be edited */}
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
              >
                Edit deck
              </TextButton>
          }
          <FlipoButton
            onPress={() =>
              navigation.navigate("DeckPlayScreen", {
                deck,
              })
            }
          >
            <FlipoText
              weight="black"
              className={`text-2xl text-primary-${theme} tracking-wide`}
            >
              Play Deck
            </FlipoText>
          </FlipoButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeckProfileScreen;
