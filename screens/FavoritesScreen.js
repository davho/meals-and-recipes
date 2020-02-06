import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import MealList from '../components/MealList'
//import { MEALS } from '../data/dummy-data' //we were importing MEALS from dummy data but now that redux is set up we want to get meals from redux.
import DefaultText from '../components/DefaultText'

const FavoritesScreen = props => {

    const favMeals = useSelector(state => state.meals.favoriteMeals)

    if (favMeals.length === 0 || !favMeals) {
        return (
            <View style={styles.content}>
                <DefaultText>No favorite meals found. Start adding some!</DefaultText>
            </View>
        )
    }

    return (
        <MealList listData={favMeals} navigation={props.navigation}/>
    )
}

FavoritesScreen.navigationOptions = {
    headerTitle: 'Your Favorites'
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FavoritesScreen
