import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
//import { View, Text, StyleSheet, Button, FlatList } from 'react-native'

//import { CATEGORIES, MEALS } from '../data/dummy-data' //We were getting both CATEGORIES and MEALS from the dummy data but now that we have redux set up we want to get MEALS from our redux store since that's where it will always be up to data along with the other features of our global state object such as filteredMeals and favoriteMeals.

import { CATEGORIES } from '../data/dummy-data'

import MealItem from '../components/MealItem'
import MealList from '../components/MealList'
import DefaultText from '../components/DefaultText'

const CategoryMealsScreen = props => {

    //There are two ways to get your params from props.navigation: 1) You can simply drill into the navigation object with props.navigation.state.params.categoryId (or use ES6 extraction as I've demonstrated below) or use the getParam method of the navigation object like this: props.navigation.getParam('categoryId'). So far I don't see any difference between these two techniques.

    //const {categoryId} = props.navigation.state.params

    //const selectedCategory = CATEGORIES.find(i => i.iddd === categoryId)

    //We've imported the CATEGORIES array from '../data/dummy-data' above so we can use the find method on it to extract the title based on the id we now have from props.navigation.state.params.categoryId.

    //const title = selectedCategory.title

    //Note: Now we have the selectedCategory and have extracted the title for use in the nav BUT we can't do it from the component... so read below the component to see how we can get to it.



    const catId = props.navigation.getParam('categoryId')

    const availableMeals = useSelector(state => state.meals.filteredMeals) //useSelector takes a function that gets the state as an argument and returns any data we want from that global state. meals is the identifier we chose for our state in combineReducers in our App.js and filteredMeals is the key we set in our mealsReducer.js for all the filtered meals (initially set to all the meals)

    const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0)

    if (displayedMeals.length === 0) {
        return (
            <View style={styles.content}>
                <DefaultText>No meals found, maybe check your filters.</DefaultText>
            </View>
        )
    }

    return (
        <MealList listData={displayedMeals} navigation={props.navigation}/>
    )
}

//Above we have extracted the title of our category but the scope of that extraction is within the CategoryMealsScreen component so we wouldn't have access to it if we were trying to set it in navigationOptions where navigationOptions is set to an object, as demonstrated in CategoriesScreen component. The good news is navigationOptions can ALSO be a function in the event you need to pass data to it dynamically. The option React Navigation gives you is to set navigationOptions equal to a function, instead of an object, and to pass it some navigation data. This navigation data IS THE SAME AS THE NAVIGATION PROP we get within our component props, and that has the params for us. So we just need to repeat what we created above down here and extract the title the same way.
CategoryMealsScreen.navigationOptions = navigationData => {

    const categoryId = navigationData.navigation.getParam('categoryId')
    const selectedCategory = CATEGORIES.find(i => i.iddd === categoryId)
    return {
        headerTitle: selectedCategory.title
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CategoryMealsScreen
