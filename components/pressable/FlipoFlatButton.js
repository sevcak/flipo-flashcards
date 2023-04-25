import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import FlipoText from '../FlipoText';
import FlipoIcons from '../FlipoIcons';

const FlipoFlatButton = ( props ) => {
  let buttonContent;

  if (props.type == undefined || props.type == 'text') {
    buttonContent = (
      <FlipoText className='text-lg' weight='semi-bold' >{props.children}</FlipoText>
    );
  } else if (props.type == 'setting') {
    if (props.title == undefined || props.value == undefined) {
      console.warn("FlipoFlatButton of type 'setting' requires"
      + "'title' and 'value' string props. "
      + "FlipoFlatButton not rendered.");
      
      return undefined;
    }
    
    buttonContent = (
      <View>
        {/* setting title */}
        <FlipoText weight='medium' className='uppercase tracking-wider'>{props.title}</FlipoText>
        {/* setting value */}
        <FlipoText weight='bold' className={`text-2xl text-green-dark`} style={props.style}>{props.value}</FlipoText>
      </View>
    )
  } else if (props.type == 'action' || props.type == 'action-red') {
    buttonContent = (
      <FlipoText
        className={`
          text-lg uppercase text-center 
          text-${props.type == 'action-red' ? 'alert' : 'strong'}
          dark:text-${props.type == 'action-red' ? 'alert' : 'strong'}-dark
        `}
        weight='medium'
      >
          {props.children}
      </FlipoText>
    );
  } else if (props.type == 'custom') {
    buttonContent = (
      <View>{props.children}</View>
    ); 
  } else if (props.type == 'googleLogin') {
    buttonContent = (
      <View className='flex-row justify-center'>
        <View
          // className='flex-row items-center space-x-2 p-0.25 rounded-sm dark:bg-[#4285f4]'
          className='flex-row items-center space-x-2 p-0.25 rounded-sm bg-[#4285f4]'
        >
          <FlipoIcons name='google-button' size={46}/>
          <FlipoText 
            weight='bold'
            className='text-base text-[#fff] tracking-tight pr-3'
          >
            {props.text ? props.text : "Sign in with Google"}
          </FlipoText>
        </View>
      </View>
    );
  } else if (props.type == 'google-action') {
    buttonContent = (
      <View
            className='flex-row items-center space-x-2'
          >
            <FlipoIcons name='google-button' size='45'/>
            <FlipoText
              className={`text-xl ${props.textClassName}`}
              style = {props.textStyle}
            >
              {props.children}
            </FlipoText>
      </View>
    );
  }

  return (props.onPress == undefined
    ? (
        <View className='border-ui dark:border-ui-dark border-b-2 p-4 min-h-[10vh] justify-center'>
          {buttonContent}
        </View>
      )
    : (
        <TouchableOpacity
          onPress={props.onPress}
          className='border-ui dark:border-ui-dark
            border-b-2 p-4 min-h-[10vh] justify-center'
        >
          {buttonContent}
        </TouchableOpacity>
      )
  );
}

export default FlipoFlatButton;