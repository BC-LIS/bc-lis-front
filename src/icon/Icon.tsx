import React from 'react'
import { Icon } from '@iconify/react';

export default function icon( {icon} : {icon: string} ) {
  return (
    <div>
      <Icon 
        icon={icon} 
        className="w-5 h-5 mx-3 text-gray-400"
      />
    </div>
  )
}
