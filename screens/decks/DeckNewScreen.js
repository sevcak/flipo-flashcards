import { View, useColorScheme, SafeAreaView, TextInput } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

// Components
import FlipoText from "../../components/FlipoText";
import DeckCard from "../../components/decks/DeckCard";
import FlipoModal from "../../components/FlipoModal";
import FlipoButton from "../../components/pressable/FlipoButton";

// Color schemes
import colorSchemes from "../../assets/colorSchemes";

const DeckNewScreen = () => {
  const navigation = useNavigation();
  
  let theme = useColorScheme();
  let colorScheme = colorSchemes[theme];

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
           className='space-y-4'
          >
            <FlipoText weight='medium' className={`text-center text-xl text-primary-${theme}`}>
              Enter new deck name:
            </FlipoText>
            <TextInput 
             cursorColor={colorScheme['green']}
             maxLength={30}
             defaultValue='New Deck'
             className={`text-primary-${theme} text-xl text-center border-b border-primary-${theme} pb-1`}
             autoFocus
             autoComplete='off'
             autoCorrect={false}
             spellCheck={false}
             style={{fontFamily: 'Montserrat-SemiBold'}}
            />
          </FlipoModal>
          
          <DeckCard title={newDeck.title} className='w-60'/>
          <FlipoButton>Create Deck</FlipoButton>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DeckNewScreen;
