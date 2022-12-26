import { View, useColorScheme } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react'

// Components
import FlipoText from '../FlipoText'

const FlipoButton = ( props ) => {
  const theme = useColorScheme();

  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.5}
      className={`bg-green-dark px-6 py-2 rounded-lg`}
      style={props.style}>
        <FlipoText weight='black' className={`${props.textSize ? props.textSize : 'text-3xl'} text-primary-${theme} tracking-wider text-center`}>{props.children}</FlipoText>
    </TouchableOpacity>
  );
}

export default FlipoButton;