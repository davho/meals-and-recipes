import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { enableScreens } from 'react-native-screens' //enableScreens (it used to be called useScreens) is a package you download when you import react-navigation and the rest and it makes use of the native screen animations for better navigation performance. To use it simply import it into App.js and then call it before your App.js component. THIS MAKE NAVIGATION NOTICEABLY MORE PERFORMANT
import { createStore, combineReducers } from 'redux' //DO: npm install redux react-redux --save
import { Provider } from 'react-redux'

import MealsNavigator from './navigation/MealsNavigator'
import mealsReducer from './store/reducers/mealsReducer'

enableScreens() //enableScreens (it used to be called useScreens) is a package you download when you import react-navigation and the rest and it makes use of the native screen animations for better navigation performance. To use it simply import it into App.js and then call it before your App.js component. THIS MAKE NAVIGATION NOTICEABLY MORE PERFORMANT

const rootReducer = combineReducers({ //combineReducers takes one argument, an obeject, which maps the individual reducers to keys.
    meals: mealsReducer
})

const store = createStore(rootReducer) //Now call your store, which takes one argument, a reducer, and set it to a const (can be called any name). In larger apps you'll have more than one reducer and so need to use combineReducers() to merge your reducers into an obejct and pass them in. We do that with rootReducer (could be any name) above and simply pass it to createStore.

//Finally, the store needs to be provided to the application and for that we use Provider from react-redux

const fetchFonts = () => {
    Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })
}

const App = () => {

    const [fontLoaded, setFontLoaded] = useState(false)

    const setFontLoadedToTrue = () => {
        setTimeout(() => {
            setFontLoaded(true)
        }, 1000)
    }

    if (!fontLoaded) { //Technically you should be able to make onFinish={() => setFontLoaded(true)} but there's some bug in Expi where AppLoading moves too quickly from startAsync to onFinish so that the fonts actually haven't loaded by the time setFontLoaded is set to true. My hacky solution was to simply call a function that nests setFontLoaded(true) from a setTimeout set to 1000ms. I wanted to share this solution on Expo forums where numerous developers were complaining about it but all the threads had closed, even though they were relatively recent.
        return <AppLoading startAsync={() => fetchFonts()} onFinish={() => {
            setFontLoadedToTrue()
        }}/>
    }

  return ( //Now we simply wrap the root of our app, which is the MealsNavigator, in Provider and pass our store to it. That gives us everything we need to interact with the redux store from any component in our application.
    <Provider store={store}><MealsNavigator/></Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
