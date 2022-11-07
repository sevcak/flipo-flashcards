import { View, Text } from 'react-native'
import React from 'react'
import {ProfileIcon} from './FlipoIcons'

const Navbar = () => {
  return (
    <View className="p-4">
      <ProfileIcon type="outline"/>
    </View>
  )
}

export default Navbar