import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import MealItem from './MealItem'


const MealList = props => {

    const favoriteMeals = useSelector(state => state.meals.favoriteMeals)

    const renderMealItem = itemData => {

        const isFav = favoriteMeals.some(i => i.id === itemData.item.id)

        return (
            <MealItem
            title={itemData.item.title}
            complexities={itemData.item.complexities.toUpperCase()}
            affordability={itemData.item.affordability.toUpperCase()}
            duration={itemData.item.duration} image={itemData.item.imageUrl}
            onSelectMeal={()=>props.navigation.navigate({routeName: 'MealDetail', params: {mealId: itemData.item.id, mealTitle: itemData.item.title, isFav: isFav}})}/>
        )
    }

    return (
        <View style={styles.list}>
            <FlatList
            data={props.listData}
            keyExtractor={(item, index) => item.id}
            renderItem={renderMealItem}
            style={{width: '100%'}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MealList
