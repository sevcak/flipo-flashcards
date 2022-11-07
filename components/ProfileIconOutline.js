import { View, Text, useColorScheme} from 'react-native'
import React from 'react'
import Svg, { Path, Mask } from "react-native-svg"
import colorSchemes from '../assets/colorSchemes'

const ProfileIconOutline = (props) => {
  let color = colorSchemes[useColorScheme()].secondary
  
  if (props.color != undefined){
    color = props.color
  }
  // const color = colorSchemes[useColorScheme()].secondary;
  
  
  return (
    <Svg
    width={50}
    height={50}
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M35.709 12.437c0 5.724-4.754 10.438-10.709 10.438S14.291 18.16 14.291 12.437 19.045 2 25 2s10.709 4.713 10.709 10.437Z"
        stroke={color}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <Mask id="a" fill="#fff">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M.206 46.374C-.459 48.19.974 50 2.908 50h44.184c1.934 0 3.367-1.81 2.702-3.626C45.83 35.558 36.224 27.926 25 27.926c-11.223 0-20.831 7.632-24.794 18.448Z"
        />
      </Mask>
      <Path
        d="m49.794 46.374-3.756 1.376 3.756-1.376Zm-49.588 0-3.755-1.376 3.755 1.376ZM2.908 54h44.184v-8H2.908v8ZM25 31.926c9.3 0 17.563 6.34 21.038 15.824l7.512-2.752C49.099 32.85 38.147 23.926 25 23.926v8ZM3.962 47.75C7.437 38.266 15.701 31.926 25 31.926v-8c-13.147 0-24.099 8.924-28.55 21.072l7.512 2.752ZM47.092 54c4.333 0 8.206-4.227 6.458-9.002l-7.512 2.752a1.414 1.414 0 0 1 .196-1.303c.227-.299.554-.447.858-.447v8ZM2.908 46c.304 0 .631.148.858.447.25.328.366.84.196 1.303l-7.511-2.752C-5.3 49.773-1.425 54 2.908 54v-8Z"
        fill={color}
        mask="url(#a)"
      />
    </Svg>
  )
}

/*
const ProfileIconSolid = () => {
  const colorScheme = colorSchemes[useColorScheme()];
  
  return (
 
  )
}
*/

export default ProfileIconOutline