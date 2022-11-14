import { View, Text, Image, useColorScheme, ImageBackground } from 'react-native'
import React from 'react'
import FlipoText from './FlipoText';

const DeckCard = ( { title, coverUrl, label } ) => {
    let theme = useColorScheme();

    title = title ? title : 'Sample Deck';
    label = label 
        ? (<FlipoText weight='extra-bold' className={`text-center py-4 text-lg text-secondary-${theme}`}>{ title }</FlipoText>)
        : (<Text></Text>);
    let card = coverUrl
        ? (<ImageBackground source={coverUrl} resizeMode='cover' imageStyle={{borderRadius: 10}} className='rounded-lg h-full'></ImageBackground>)
        : (<View className={`${theme == 'light' ? 'bg-gray-400' : 'bg-gray-700'} p-6 rounded-lg h-full`}>
             <FlipoText weight='black' className='text-white text-center text-xl tracking-wider'>{title}</FlipoText>
           </View>);
  
    return (
    <View className='h-72 w-52'>
      {card}
      {label}
    </View>
  )
}

export default DeckCard