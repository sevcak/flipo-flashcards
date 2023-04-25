import { View } from "react-native";
import React from "react";
import FlipoText from "../FlipoText";

const CardCell = ({ card, title }) => {
  const label = card 
    ? (card['front']['title'])
    : (title ? title : ('New Card'));
  const img = card
    ? (card['front']['image']
        ? card['front']['image']
        : (<FlipoText weight='semi-bold' className='text-xl text-center'>{card['id']}</FlipoText>))
    : (<FlipoText weight='semi-bold' className='text-4xl text-center'>+</FlipoText>);

  return (
    <View className='flex-row space-x-4'>
      {/* Card */}
      <View className='bg-card dark:bg-card-dark rounded-lg w-16 h-24 justify-center'>
        {img}
      </View>
      {/* Text*/}
      <View className='justify-center'>
          <FlipoText weight='semi-bold' className='text-lg'>{label}</FlipoText>
      </View>
    </View>
  );
};

export default CardCell;
