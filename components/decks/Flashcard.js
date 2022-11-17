import { View, Text, useColorScheme, Animated, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import FlipoText from '../FlipoText'

const Flashcard = ({ card, flipped }) => {
  const theme = useColorScheme();

  const [elevationLevel, setElevationLevel] = useState(5);
  
  const animate = useRef(new Animated.Value(5));
  const interpolateFront = animate.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const interpolateBack = animate.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const handleFlip = () => {
    //setElevationLevel(0);
    Animated.timing(animate.current, {
      duration: 300,
      toValue: flipped ? 0 : 180,
      useNativeDriver: true,
    }).start(() => {
      setElevationLevel(5);
    });
  }

  useEffect(() => {
    handleFlip();

    return () => {
      setElevationLevel(30);
    }
  }, [flipped])
  
  const front = (
      <Animated.View
        className={`bg-card-${theme} w-full h-full rounded-xl`}
        style={{transform: [{rotateY: interpolateBack}], backfaceVisibility: 'hidden', elevation: elevationLevel,}}>
          <View className='grow justify-center p-2'>
            <Text className='text-center m-2'>card {card.id} - front</Text>
            <FlipoText weight='extra-bold' className='text-center text-2xl mb-2'>{card.front.title}</FlipoText>
            <FlipoText weight='semi-bold' className='text-center'>{card.front.content}</FlipoText>
          </View>
          {/* image, if card has one */}
          {card.front.image
          ? (<Image
              source={card.front.image}
              className='w-full h-1/3 rounded-b-lg'
            />)
          : (<></>)}
      </Animated.View>
  );

  const back = (
    <Animated.View
      className={`bg-card-${theme} w-full h-full rounded-xl absolute `}
      style={{transform: [{rotateY: interpolateFront}], backfaceVisibility: 'hidden', elevation: elevationLevel,}}>
        <View className='justify-center grow'>
          <Text className='text-center m-2'>card {card.id} - back</Text>
          <FlipoText weight='extra-bold' className='text-center text-2xl mb-2'>{card.back.title}</FlipoText>
          <FlipoText weight='semi-bold' className='text-center'>{card.back.content}</FlipoText>
        </View>
        {/* image, if card has one */}
        {card.back.image
        ? (<Image
             source={card.back.image}
             className='w-full h-1/3 rounded-b-lg'
           />)
        : (<></>)}
      </Animated.View>
  );
  
  return (
      <View>
        {front}
        {back}
      </View>
  );
}

export default Flashcard;