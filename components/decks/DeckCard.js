import { View, Text, Image, useColorScheme, ImageBackground } from 'react-native'
import React from 'react'
import FlipoText from '../FlipoText';

const DeckCard = ( { title, coverUrl, labelUnder, labelCover, style, customDeck, cardCount} ) => {
    let theme = useColorScheme();

    
    title = title ? title : 'Sample Deck';
    
    labelCover = labelCover
      ? (<View className={`bg-card-${theme} rounded-b-lg p-4`}>
          <FlipoText weight='bold' className={`text-xl text-center text-secondary-${theme}`}>{title}</FlipoText>
          <FlipoText weight='semi-bold' className={`text-center capitalize text-strong-${theme}`}>{customDeck ? 'Custom deck' : 'Example deck'}</FlipoText>
          {cardCount
            ? (<View>
                 <FlipoText weight='bold' className={`text-2xl mt-3 text-center text-secondary-${theme}`}>{cardCount}</FlipoText>
                 <FlipoText weight='semi-bold' className={`text-center text-strong-${theme}`}>cards</FlipoText>
               </View>)
            : (<></>)}
      </View>)
      : (<></>);
    labelUnder = labelUnder
      ? (<FlipoText weight='extra-bold' className={`text-center py-4 text-lg text-secondary-${theme}`}>{ title }</FlipoText>)
      : (<></>);
    let card = coverUrl
      ? (<ImageBackground source={coverUrl} resizeMode='cover' imageStyle={{borderRadius: 10}} className='rounded-lg w-full h-full justify-end'>
            {labelCover}
          </ImageBackground>)
      : (<View className={`${theme == 'light' ? 'bg-gray-400' : 'bg-gray-700'} p-6 rounded-xl w-full h-full`}>
            <FlipoText weight='black' className='text-primary text-center text-xl tracking-wider'>{title}</FlipoText>
          </View>);
    
    return (
    <View style={style}>
      <View className='aspect-[3/4]'>{card}</View>
      {labelUnder}
    </View>
  )
}

export default DeckCard