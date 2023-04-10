import React from 'react';
import FlipoIcon from './icons/FlipoIcon';

interface IconProps {
  name: string;
  color?: string;
  size?: number;
}

const Icon = ({ name, color, size }: IconProps) => {
  let icon: JSX.Element = (<div></div>);

  switch (name) {
    case 'flipo':
      icon = <FlipoIcon color={color} size={size} />
      break;
  }
  
  return (icon);
}

export default Icon;