import { View, Modal, useColorScheme, SafeAreaView, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BlurView } from 'expo-blur';
import FlipoButton from '../pressable/FlipoButton';
import EditableFlashcard from './EditableFlashcard';

const EditCardModal = ({ card, editCard }) => {
  const [flipped, setFlipped] = useState(false);
  const [newCard, setNewCard] = useState(card);

  /*
    If the card prop changes, it means a different card is being edited/created.
    Hence this useEffect, which takes care of loading it into the modal.
  */
  useEffect(() => {
    setNewCard(card ? card : undefined);
  }, [card]);

  const submitCard = () => {
    editCard(newCard);
    setFlipped(false);
  }

  return (
    <Modal 
      className='justify-center items-center'
      transparent
      visible={card ? true : false}
      animationType='fade'
    >
      <SafeAreaView>
        <BlurView 
          className='align-center justify-center h-screen w-screen px-10'
          intensity={100}
          tint={useColorScheme()}
        >
          {/*Card*/}
          <View className='h-96 w-full'>
            <EditableFlashcard card={card} flipped={flipped} setCard={setNewCard}/>
          </View>
          <TouchableOpacity onPress={() => setFlipped(prevFlipped => (!prevFlipped))} activeOpacity={0.8} className='mt-4 mb-8 items-center'>
            <FlipoButton className='w-20 px-4 align-center' textSize='text-lg'>Flip</FlipoButton>
          </TouchableOpacity>
          {/* Submit card edit button */}
          <TouchableOpacity onPress={() => submitCard()} activeOpacity={0.8}>
            <FlipoButton>Confirm</FlipoButton>
          </TouchableOpacity>
        </BlurView>
      </SafeAreaView>
      
    </Modal>
  )
}

export default EditCardModal