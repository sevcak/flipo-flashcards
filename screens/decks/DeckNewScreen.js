import { View, useColorScheme, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import FlipoText from "../../components/FlipoText";
import DeckCard from "../../components/decks/DeckCard";
import FlipoModal from "../../components/FlipoModal";
import FlipoButton from "../../components/pressable/FlipoButton";

const DeckNewScreen = () => {
  const navigation = useNavigation();
  let theme = useColorScheme();

  let newId = undefined;

  let newDeck = {
    id: newId,
    custom: true,
    title: "New deck",
    coverUrl: undefined,
    cards: [],
  };

  return (
    <View>
      <SafeAreaView className={`bg-primary-${theme}`}>
        <View className="flex-rows items-center pt-10 h-full space-y-10">
          <FlipoModal 
           title='Create a new deck'
          >

          </FlipoModal>
          
          <DeckCard title={newDeck.title} className='w-60'/>
          <FlipoButton>Create Deck</FlipoButton>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DeckNewScreen;
