import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
import { useDispatch } from 'react-redux'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../components/HeaderButton'
import FilterSwitch from '../components/FilterSwitch'
import { setFilters } from '../store/actions/meals'


const FilterScreen = props => {

    const [isGlutenFree, setIsGlutenFree] = useState(false)
    const [isLactoseFree, setIsLactoseFree] = useState(false)
    const [isVegan, setIsVegan] = useState(false)
    const [isVegetarian, setIsVegetarian] = useState(false)

    const dispatch = useDispatch()

    //Let me explain the structure of this funtion: The saveFilters function is a function that stores an object set to the current state of all of our filters which we then wrap in the useCallback hook, which takes a second argument which is an array of dependencies which govern when the hook should update. We use the useCallback hook to avoid unnecessary rebuilds of this function. (because setParams() causes the component to rebuild because its props, the navigation prop, changes). We had to do this because saveFilters itself is a dependency of useEffect and you'd end up with an infinite loop. By wrapping it around a function declaration and defining the dependencies of the function, it ensures that the function is only re-created if its dependencies changed. Hence the function is NOT re-built on every render cycle anymore => You break out of the infinite loop!
    const saveFilters = useCallback(() => {
        const appliedFilters ={
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegetarian: isVegetarian, 
            vegan: isVegan
        }
        dispatch(setFilters(appliedFilters))
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch])

    useEffect(() => { //From our useEffect, which can call a function everytime our component renders, we make that functionp rops.navigation.setParams() and pass our saveFilters function in to that as the value of a key we made up called 'save'. So now when we call navData.navigation.getParam('save') from the onPress in our nav we are calling saveFilters, which saves our filter settings.
        props.navigation.setParams({save: saveFilters})
    }, [saveFilters]) //We pass saveFilters to the array as the second argument for our useEffect which says that this effect should only happen when saveFilters changes.


    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>

            <FilterSwitch label='Gluten Free' value={isGlutenFree} onUpdatee={newValue => setIsGlutenFree(newValue)}/>

            <FilterSwitch label='Lactose Free' value={isLactoseFree} onUpdatee={newValue => setIsLactoseFree(newValue)}/>

            <FilterSwitch label='Vegetarian' value={isVegetarian} onUpdatee={newValue => setIsVegetarian(newValue)}/>

            <FilterSwitch label='Vegan' value={isVegan} onUpdatee={newValue => setIsVegan(newValue)}/>
        </View>
    )
}

FilterScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}><Item title='Menu' iconName='ios-menu' onPress={() => navData.navigation.toggleDrawer()}/></HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}><Item title='Save' iconName='ios-save' onPress={navData.navigation.getParam('save')}/></HeaderButtons>,
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    }
})

export default FilterScreen
