import { View, Text } from "react-native";
import React from "react";

const FlipoText = (props) => {
  let fontFamily = 'Montserrat'
  const italicSuffix = props.italic ? '-Italic' : ''

  switch (props.weight) {
      case 'thin':
      case 100:
          fontFamily = 'Montserrat-Thin' + italicSuffix;
          break;
      case 'light':
      case 300:
          fontFamily = 'Montserrat-Light' + italicSuffix;
          break;
      case 'medium':
      case 500:
          fontFamily = 'Montserrat-Medium' + italicSuffix;
          break;
      case 'semi-bold':
      case 600:
          fontFamily = 'Montserrat-SemiBold' + italicSuffix;
          break;
      case 'bold':
      case 700:
          fontFamily = 'Montserrat-Bold' + italicSuffix;
          break;
      case 'extra-bold':
      case 800:
          fontFamily = 'Montserrat-Bold' + italicSuffix;
          break;
      case 'black':
      case 900:
              fontFamily = 'Montserrat-Black' + italicSuffix;
              break;
      default:
          fontFamily = 'Montserrat' + italicSuffix;
          break;
  }

  return (
    <View>
      <Text className='text-secondary-light dark:text-secondary-dark' style={props.style}>
        <Text style={{ fontFamily: fontFamily }}>{props.children}</Text>
      </Text>
    </View>
  );
};

export default FlipoText;
