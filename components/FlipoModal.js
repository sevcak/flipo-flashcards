import { View, Modal, useColorScheme, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FlipoText from "./FlipoText";

const FlipoModal = (props) => {
  let theme = useColorScheme();

  const [open, setOpen] = useState(props.visible);
  
  return (
    <Modal className="justify-center items-center" transparent visible={open}>
      <View className="align-center justify-center h-screen w-screen">
        <View className={`bg-secondary-${theme}/50 m-8 rounded-xl`}>
          {/*Modal header*/}
          <View className={`border-b-2 border-primary-${theme}`}>
            <FlipoText 
             className={`text-primary-${theme} text-center text-lg p-4`}
             weight='bold'
            >
              {props.title}
            </FlipoText>
          </View>
          {/*Modal content*/}
          <View className='p-8'>
            {props.children}
          </View>
          {/*Modal main button*/}
          <TouchableOpacity className={`border-t-2 border-primary-${theme}`}
           onPress={props.onButtonPress ? props.onButtonPress : () => setOpen(false)}
          >
            <FlipoText 
             className={`text-green-${theme} text-center text-lg p-4`}
             weight='bold'
            >
              {props.buttonText ? props.buttonText : 'OK'}
            </FlipoText>
          </TouchableOpacity>
          {// Cancel button, if
            props.cancelButton
            ? (<TouchableOpacity className={`border-t-2 border-primary-${theme}`}
                onPress={props.onCancelPress ? props.onCancelPress : () => setOpen(false)}
              >
                <FlipoText 
                  className={`text-alert text-center text-lg p-4`}
                  weight='bold'
                >
                  {props.buttonText ? props.buttonText : 'Cancel'}
                </FlipoText>
              </TouchableOpacity>)
            : (<></>)
          }
        </View>
      </View>
    </Modal>
  );
};

export default FlipoModal;
