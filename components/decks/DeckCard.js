import { View, ImageBackground } from 'react-native'
import React from 'react'
import FlipoText from '../FlipoText';

const DeckCard = ( { title, coverUrl, labelUnder, labelCover, style, customDeck, cardCount} ) => {
    title = title ? title : 'Untitled deck';
    
    labelCover = labelCover
      ? (<View className='bg-card dark:bg-card-dark rounded-b-lg p-4 w-full'>
          <FlipoText 
            weight='bold'
            className='text-xl text-center text-secondary dark:text-secondary-dark'
          >
            {title}
          </FlipoText>
          <FlipoText
            weight='semi-bold'
            className='text-center capitalize text-strong dark:text-strong-dark'
          >
            {customDeck ? 'Custom deck' : 'Example deck'}
          </FlipoText>
          {cardCount
            ? (
              <View>
                <FlipoText 
                  weight='bold'
                  className='text-2xl mt-3 text-center
                    text-secondary dark:text-secondary-dark'
                >
                  {cardCount}
                </FlipoText>
                  <FlipoText
                    weight='semi-bold'
                    className='text-center text-strong dark:text-strong-dark'
                  >cards</FlipoText>
              </View>
            )
            : (<></>)}
      </View>)
      : (<></>);
    labelUnder = labelUnder
      ? (
        <FlipoText
          weight='extra-bold'
          className='text-center py-4 text-lg text-secondary dark:text-secondary-dark'
        >
          {title}
        </FlipoText>
      )
      : (<></>);
    let card = coverUrl
      ? (
        <ImageBackground 
          source={coverUrl}
          resizeMode='cover'
          imageStyle={{borderRadius: 10}}
          className='rounded-xl w-full h-full justify-end
            bg-gray-400 dark:bg-gray-700'
        >
          {labelCover}
        </ImageBackground>)
      : (
        <View
          className='rounded-xl w-full h-full
          bg-gray-400 dark:bg-gray-700'
        >
          <FlipoText
            weight='black'
            className='text-primary text-center text-xl tracking-wider m-6'
          >
            {title}
          </FlipoText>
          <View className='grow'></View>
          {labelCover}
        </View>
        );
    
    return (
    <View style={style}>
      <View className='aspect-[3/4]'>{card}</View>
      {labelUnder}
    </View>
  )
}

export default DeckCard