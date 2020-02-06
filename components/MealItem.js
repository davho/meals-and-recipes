import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'

import DefaultText from './DefaultText'

const MealItem = props => {
    return (
        <View style={styles.mealItem}>
            <TouchableOpacity onPress={props.onSelectMeal}>
                <View>
                    <View style={{...styles.mealRow, ...styles.mealHeader}}>
                        <ImageBackground source={{uri: props.image}} style={styles.bgImage}>
                            <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                        </ImageBackground>
                    </View>
                    <View style={{...styles.mealRow, ...styles.mealDetail}}>
                        <DefaultText>{props.duration}m</DefaultText>
                        <DefaultText>{props.complexities.toUpperCase()}</DefaultText>
                        <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mealItem: {
        height: 200,
        width: '95%',
        margin: '2.5%',
        marginBottom: '1.125%',
        backgroundColor: '#ddd',
        borderRadius: 10,
        overflow: 'hidden',
    },
    bgImage: { //have to make images from the web 100% width and height
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    mealRow: {
        flexDirection: 'row'
    },
    mealHeader: {
        height: '83%'
    },
    mealDetail: {
        height: '17%',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        //fontFamily: 'open-sans-bold',
        fontSize: 22,
        color: 'rgb(255,255,255)',
        backgroundColor: 'rgba(0,0,0,.5)',
        paddingVertical: 5,
        paddingHorizontal: 12,
        textAlign: 'center'
    }
})

export default MealItem
