import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FlipoText from "./FlipoText";

const RateButton = (props) => {
  return (
    <View className='h-20 grow'>
      <TouchableOpacity
        onPress={props.onPress}
        className={`bg-rate-${props.children} h-full justify-center`}
        activeOpacity={0.5}
      >
        <FlipoText
          weight="extra-bold"
          className={`text-primary-light text-4xl text-center pt-1`}
        >
          {props.children}
        </FlipoText>
      </TouchableOpacity>
    </View>
  );
};

export default RateButton;
