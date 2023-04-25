import { View, Modal, useColorScheme, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import FlipoText from "./FlipoText";
import { BlurView } from "expo-blur";

const FlipoModal = (props) => {
  const [open, setOpen] = useState(props.visible);

  useEffect(() => {
    setOpen(props.visible);
  }, [props.visible]);
  
  return (
    <Modal 
     className='justify-center items-center'
     transparent
     visible={open}
     animationType='fade'
    >
      <BlurView 
       className='align-center justify-center h-screen w-screen'
       intensity={120}
       tint={useColorScheme()}
      >
        {/* Modal container */}
        <KeyboardAvoidingView behavior='padding'>
          <BlurView
          className='bg-secondary/50 dark:bg-secondary-dark/50 m-8 rounded-xl'
          intensity={80}
          tint={useColorScheme() == 'light' ? 'dark' : 'light'}
          >
            {/* Modal header */}
            <View className='border-b-2 border-primary dark:border-primary-dark'>
              <FlipoText 
                className='text-primary dark:text-primary-dark text-center text-xl p-4'
                weight='bold'
              >
                {props.title}
              </FlipoText>
            </View>
            {/* Modal content */}
            <View className='p-8'>
              {props.children}
            </View>
            {/* Modal main button */}
            { !props.noDefaultButton && (
              <TouchableOpacity
                className='border-t-2 border-primary dark:border-primary-dark'
                onPress={props.onButtonPress ? props.onButtonPress : () => setOpen(false)}
              >
                <FlipoText 
                  className='text-green text-center text-xl p-4'
                  weight='semi-bold'
                >
                  {props.buttonText ? props.buttonText : 'OK'}
                </FlipoText>
              </TouchableOpacity>
            )}
            {// Cancel button
              props.cancelButton && (
                <TouchableOpacity 
                  className='border-t-2 border-primary dark:border-primary-dark'
                  onPress={props.onCancelPress ? props.onCancelPress : () => setOpen(false)}
                >
                  <FlipoText 
                    className='text-alert text-center text-xl p-4'
                    weight='semi-bold'
                  >
                    {props.cancelButtonText ? props.cancelButtonText : 'Cancel'}
                  </FlipoText>
                </TouchableOpacity>
              )
            }
          </BlurView>
        </KeyboardAvoidingView>
      </BlurView>
    </Modal>
  );
};

export default FlipoModal;
