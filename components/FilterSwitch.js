import React from 'react'
import { View, Text, Switch, StyleSheet } from 'react-native'

import config from '../config'

const FilterSwitch = props => {
    return ( //Note: trackColor.false only works on android
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                value={props.value}
                onValueChange={props.onUpdatee}
                trackColor={{true: config.colors.primaryNav, false: 'red'}}
                thumbColor={config.colors.secondaryNav}/>
        </View>
    )
}

const styles = StyleSheet.create({
    filterContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15
    }
})

export default FilterSwitch
