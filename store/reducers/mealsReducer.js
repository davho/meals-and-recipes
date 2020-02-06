//Reducers are just functions! They take two arguments: the current state and an action, then returns the new state.
//You also need to make an initial state object

import { MEALS } from '../../data/dummy-data'
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals'

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS, //meals and filteredMeals are the same in the initial state because we have no filtered meals
    favoriteMeals: [] //favorite meals is an empty array in the initial state because nothing is favorited yet
}

//The structure of the reducer below is just a regular JavaScript function where we have state set to a default value, an object, which we just declared above.
const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:

            const existingIndex = state.favoriteMeals.findIndex(i => i.id === action.mealId)

            //It's a toggle switch so...
            if (existingIndex >= 0) { //If it exists remove it with the below logic
                const updatedFavMeals = [...state.favoriteMeals]
                updatedFavMeals.splice(existingIndex, 1)
                return {...state, favoriteMeals: updatedFavMeals}
            } else { //If it doesn't exist add it with the below logic
            const meal = state.meals.find(i => i.id === action.mealId)
                return {...state, favoriteMeals: state.favoriteMeals.concat(meal)}
            }

        case SET_FILTERS:

            const appliedFilters = action.filters
            const updatedFilteredMeals = state.meals.filter(i => {
                if (appliedFilters.glutenFree && !i.isGlutenFree) {
                    return false
                }
                if (appliedFilters.lactoseFree && !i.isLactoseFree) {
                    return false
                }
                if (appliedFilters.vegetarian && !i.isVegetarian) {
                    return false
                }
                if (appliedFilters.vegan && !i.isVegan) {
                    return false
                }
                return true
            })
            return { ...state, filteredMeals: updatedFilteredMeals }

            default:
                return state
    }
    return state
}

export default mealsReducer
