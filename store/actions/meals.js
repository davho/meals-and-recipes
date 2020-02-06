export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE' //the value you store here is typically the same name as the const
export const SET_FILTERS = 'SET_FILTERS'

export const toggleFavorite = id => { //now you need a function that creates you an action
    return {
        type: TOGGLE_FAVORITE,
        mealId: id
    }
}

export const setFilters = filterSettings => {
    return {
        type: SET_FILTERS,
        filters: filterSettings
    }
}
