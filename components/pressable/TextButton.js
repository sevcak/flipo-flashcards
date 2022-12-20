import { TouchableOpacity } from 'react-native'
import React from 'react'
import FlipoText from '../FlipoText';
import { useTheme } from '@react-navigation/native';

const TextButton = ( props ) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={props.onPress}>
      <FlipoText weight='bold' className={`text-lg text-strong-${theme}`} text- style={props.style}>{`${props.children} >`}</FlipoText>
    </TouchableOpacity>
  );
}

export default TextButton;