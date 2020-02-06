import React, { useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView, Image} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import DefaultText from '../components/DefaultText'
import { toggleFavorite } from '../store/actions/meals'

import HeaderButton from '../components/HeaderButton'

const MealDetailScreen = props => {

    const availableMeals = useSelector(state => state.meals.meals)

    const mealId = props.navigation.state.params.mealId

    const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(i => i.id === mealId))

    //Note: you could also simply pass itemData.item from CategoryMealsScreen.js which is probably the more intuitive way to do it, but for this exercise I'm leveraging the import of MEALS and using .find again based on a smaller passing of data, i.e. the id.

    const selectedMeal = availableMeals.find(i => i.id === mealId)

    const dispatch = useDispatch()

    const toggleFavoriteHandler = useCallback(() => { //we wrap the function in useCallback and pass useCallback an array with our dependencies, dispatch and mealId, to prevent an infinite loop
        dispatch(toggleFavorite(mealId))
    }, [dispatch, mealId])

    useEffect(() => {
        props.navigation.setParams({toggleFav: toggleFavoriteHandler})
    }, [toggleFavoriteHandler])

    useEffect(() => {
        props.navigation.setParams({isFav: currentMealIsFavorite})
    }, [currentMealIsFavorite])

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
                <View style={styles.details}>
                    <DefaultText>{selectedMeal.duration}m</DefaultText>
                    <DefaultText>{selectedMeal.complexities.toUpperCase()}</DefaultText>
                    <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
                </View>
                <Text style={styles.title}>Ingredients</Text>
                {selectedMeal.ingredients.map(i => {
                    return <Text key={i} style={styles.ingredientsAndSteps}><Text style={styles.bulletsAndNumbering}>•</Text> {i}</Text>
                }) }
                <Text style={styles.title}>Steps</Text>
                {selectedMeal.steps.map(i => {
                    return <Text key={i} style={styles.ingredientsAndSteps}><Text style={styles.bulletsAndNumbering}>{selectedMeal.steps.indexOf(i) + 1})</Text> {i}</Text>
                }) }
        </ScrollView>
    )
}

MealDetailScreen.navigationOptions = navigationData => {

    //Now we need information from our redux store in our navigation data but we can't use useSelector() within our navigationOptions function. How do we solve that? There are two possible fixes, we can use props.navigation.setParams() from the component, the use useEffect so we don't create an infinte loop, but the problem with this is it takes a while for the title to display useEffect runs after the component has rendered. The other approach is to simply pass the titles from either of the two screens we're coming from, the FavoritesScreen or the CategoryMealsScreen, which is actually a far better solution, and we simply do that from MealList.js

    const mealTitle = navigationData.navigation.getParam('mealTitle')
    const toggleFav = navigationData.navigation.getParam('toggleFav')
    const isFav = navigationData.navigation.getParam('isFav')
    const icon = isFav ? 'ios-star' : 'ios-star-outline'

    return {
        headerTitle: mealTitle,
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Favorite'
                iconName={icon} onPress={toggleFav}/>
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center',
        paddingBottom: 10
    },
    ingredientsAndSteps: {
        fontFamily: 'open-sans',
        fontSize: 16,
        paddingHorizontal: 20,
        paddingVertical: 4
    },
    bulletsAndNumbering: {
        fontFamily: 'open-sans-bold'
    }
})

export default MealDetailScreen
