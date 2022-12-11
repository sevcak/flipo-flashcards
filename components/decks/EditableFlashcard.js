import { View, useColorScheme, Animated, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import FlipoText from '../FlipoText'
import colorSchemes from '../../assets/colorSchemes';

const EditableFlashcard = ({ card, flipped, setCard}) => {
  const theme = useColorScheme();
  const colorScheme = colorSchemes[theme];

  const updateCard = (side, prop, value) => {
    let newCard = card;

    newCard[side][prop] = value;

    setCard(newCard);
  }

  // flashcard component states
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
  }, [flipped]);
  
  const front = (
        <Animated.View
          className={`bg-card-${theme} w-full h-full rounded-xl`}
          style={{transform: [{rotateY: interpolateBack}], backfaceVisibility: 'hidden', elevation: elevationLevel,}}
          collapsable={false}
        >
          <View className='grow justify-center p-2 space-y-4 content-between'>
            <FlipoText className='text-center m-2'>Card {card.id} - Front</FlipoText>
              <TextInput
                defaultValue={card['front']['title']}
                placeholder='Front title'
                className={`text-${theme}-secondary text-2xl text-center pb-1`}
                cursorColor={colorScheme['green']}
                placeholderTextColor={colorScheme['ui']}
                autoFocus
                maxLength={30}
                autoComplete='off'
                autoCorrect={false}
                spellCheck={false}
                style={{fontFamily: 'Montserrat-SemiBold',}}
                onChangeText={(val) => updateCard('front', 'title', val)}
                //ref={inputRefFront}
              />
            <View>
              <TextInput
                defaultValue={card['front']['content']}
                placeholder='Front content'
                className={`text-${theme}-secondary text-center pb-1`}
                cursorColor={colorScheme['green']}
                placeholderTextColor={colorScheme['ui']}
                maxLength={124}
                autoComplete='off'
                autoCorrect={false}
                spellCheck={false}
                style={{fontFamily: 'Montserrat-SemiBold'}}
                //onChangeText={(val) => updateCard('front', 'content', val)}
              />
            </View>
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
      className={`bg-card-${theme} w-full h-full rounded-xl absolute`}
      style={{transform: [{rotateY: interpolateFront}], backfaceVisibility: 'hidden', elevation: elevationLevel, zIndex: (flipped ? 1 : -99)}}>
        <View className='grow justify-center p-2 space-y-4 content-between'>
            <FlipoText className='text-center m-2'>Card {card.id} - Back</FlipoText>
              <TextInput
                defaultValue={card['back']['title']}
                placeholder='Back title'
                className={`text-${theme}-secondary text-2xl text-center pb-1`}
                cursorColor={colorScheme['green']}
                placeholderTextColor={colorScheme['ui']}
                maxLength={30}
                autoComplete='off'
                autoCorrect={false}
                spellCheck={false}
                style={{fontFamily: 'Montserrat-SemiBold'}}
                //onChangeText={(val) => updateCard('front', 'title', val)}
                //ref={inputRefBack}
              />
            <View>
              <TextInput
                defaultValue={card['back']['content']}
                placeholder='Back content'
                className={`text-${theme}-secondary text-center pb-1`}
                cursorColor={colorScheme['green']}
                placeholderTextColor={colorScheme['ui']}
                maxLength={124}
                autoComplete='off'
                autoCorrect={false}
                spellCheck={false}
                style={{fontFamily: 'Montserrat-SemiBold'}}
                //onChangeText={(val) => updateCard('front', 'content', val)}
              />
            </View>
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
  
  return (
      <View>
        {/* 
          I haven't figured out why, but this Pressable has to be here
          so the text inputs are focusable.
        */}
        <Pressable>
          {front}
        </Pressable>
        {back}
      </View>
  );
}

export default EditableFlashcard;