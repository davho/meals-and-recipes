import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'

import config from '../config'

const CustomHeaderButton = props => { //the IconComponent prop is one that the HeaderButton package expects
    return <HeaderButton {...props} IconComponent={Ionicons} color={Platform.OS === 'android' ? 'rgb(255,255,255)' : config.colors.primaryNav} iconSize={23}/>
}

export default CustomHeaderButton
