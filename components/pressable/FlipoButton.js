import { View, useColorScheme } from 'react-native'
import React from 'react'

// Components
import FlipoText from '../FlipoText'
import { TouchableOpacity } from 'react-native-gesture-handler';

const FlipoButton = ( props ) => {
  const theme = useColorScheme();

  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.5}
      className={`bg-green-dark px-6 py-2 rounded-lg`}
      style={props.style}>
        <FlipoText weight='black' className={`text-3xl text-primary-${theme} tracking-wider`}>{props.children}</FlipoText>
    </TouchableOpacity>
  );
}

export default FlipoButton;