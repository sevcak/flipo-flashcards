import { useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

// Components
import FlipoText from "../../components/FlipoText";
import DeckCard from "../../components/decks/DeckCard";
import FlipoButton from "../../components/pressable/FlipoButton";

// Color schemes
import colorSchemes from "../../assets/colorSchemes";

const DeckProfileScreen = () => {
  const navigation = useNavigation();
  let theme = useColorScheme();
  let colorScheme = colorSchemes[useColorScheme()];

  // unpacks deck passed from parameters
  const {
    params: { deck },
  } = useRoute();

  navigation.setOptions({
    title: deck.title,
    headerTitleStyle: {
      fontFamily: "Montserrat-ExtraBold",
      color: colorScheme["ui"],
      letterSpacing: 1.8,
      fontSize: 380 / deck.title.length,
    },
  });

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
        <FlipoButton
          className="my-10"
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
    </SafeAreaView>
  );
};

export default DeckProfileScreen;
