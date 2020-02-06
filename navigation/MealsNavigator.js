//DO: expo install react-navigation react-navigation-drawer react-navigation-tabs react-navigation-stack react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

//ALSO DO: npm install --save react-navigation-header-buttons react-navigation-material-bottom-tabs react-navigation-material-top-tabs react-native-paper

import React from 'react'
import { Platform, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'

import config from '../config'

//Note as of React Navigation 3 React Navigation wraps all you components in a SafeAreaView so you don't have to manually do that from React Native to avoid device notches and/or platform widgets and menus.

import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import FilterScreen from '../screens/FilterScreen'

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? config.colors.primaryNav : '' //Just a demonstation here of how to customize the nav for Android but leave it as default for iOS.
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: { //This is the top left back text to navigate to the previous page
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'rgb(255,255,255)' : config.colors.primaryNav, //Just a demonstation here of how to customize the nav for Android but leave it as default for iOS.
    headerTitle: 'A Screen'
}


const MealsNavigator = createStackNavigator({ //Any component mapped to these screens will get the special navigation prop from React Navigation. We can check this prop out by going to any of the mapped components and simply console.logging it.

//Make your button onPress handler or whatever you're using call props.navigation.navigate({routeName: 'ROUTE-NAME-HERE'}) or props.navigation.navigate('ROUTE-NAME-HERE') and replace 'ROUTE-NAME-HERE' with any of the keys within the same navigator in ''.

//props.navigation.push('ROUTE-NAME-HERE') will allow you to navigate to the same screen. Why would you need this? Imagine you need the visual image of showing the same JSX with an update here or there. Imagine a dropbox where you're adding folders.

//props.navigation.goBack() will allow you to go back the same as if you tapped the back button or chevron in the navigator margin. You can also use props.navigation.pop() to go back, the only differerce is that it can only be used for the stack navigator while props.navigation.goBack() can be used for some of the others.

//props.navigation.popToTop() will take you back to your first screen (the landing screeen) in the navigation object.

//props.navigation.replace('ROUTE-NAME-HERE') will take you to a screen without allowing you to navigate back to the screen you came from. This works for a login screen and things like that. (Of course you could also use switch navigator for login)

    Categories: {
        screen: CategoriesScreen,
        //You can set up navigation options on a per screen basis like this, and note that they take precedence over both the defaultNavigationOptions AND any navigation options set forth in the component, which will probably seem counter intuitive

        // navigationOptions: {
        //     headerStyle: {
        //         backgroundColor: Platform.OS === 'android' ? config.colors.primaryNav : '' //Just a demonstation here of how to customize the nav for Android but leave it as default for iOS.
        //     },
        //     headerTintColor: Platform.OS === 'android' ? 'rgb(255,255,255)' : '' //Just a demonstation here of how to customize the nav for Android but leave it as default for iOS.
        // }
    },
    CategoryMeals: {
        screen: CategoryMealsScreen,
        //You can set up navigation options on a per screen basis like this, and note that they take precedence over both the defaultNavigationOptions AND any navigation options set forth in the component, which will probably seem counter intuitive

        // navigationOptions: {
        //     headerStyle: {
        //         backgroundColor: Platform.OS === 'android' ? config.colors.primaryNav : '' //Just a demonstation here of how to customize the nav for Android but leave it as default for iOS.
        //     },
        //     headerTintColor: Platform.OS === 'android' ? 'rgb(255,255,255)' : '' //Just a demonstation here of how to customize the nav for Android but leave it as default for iOS.
        // }
    },
    MealDetail: {
        screen: MealDetailScreen,
    },
},

{ //BELOW IS THE WAY TO SET UP DEFAULT NAVIGATION OPTIONS FOR THE ENTIRE NAVIGATOR
    //initialRouteName: Categories, //You don't need to put initialRouteName, you can just make the screen you want as your initial route to be the first in the object.
    mode: 'card', //The default is 'card' which is left-right but you can also make it 'modal'
    defaultNavigationOptions: defaultStackNavOptions
})

const FavNavigator = createStackNavigator(
    {
        Favorites: {
            screen: FavoritesScreen
        },
        MealDetail: {
            screen: MealDetailScreen
        }
    },
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
)

const tabScreenConfig = ({
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarLabel: 'Meals!',
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor}/>
                )
            }, //NOTE: tabBarIcon is a function, not an object
            tabBarColor: config.colors.primaryNav,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals!!</Text> : null
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarLabel: 'Favorites!',
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons name='ios-star' size={25} color={tabInfo.tintColor}/>
                )
            }, //NOTE: tabBarIcon is a function, not an object
            tabBarColor: config.colors.secondaryNav,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favs!!</Text> : null
        }
    }
})

const MealsFavTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabScreenConfig, { //Style the tab bar here. This argument actually does have to be different between the two platforms because react-navigation-material-bottom-tabs works a bit differently than react-navigation-tabs
    activeColor: 'rgb(255,255,255)',
    shifting: true //This makes the active tab grow, which is the way Android apps' navs are usually styled.
})
: createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: { //Style the tab bar here.
        labelStyle: {
            fontFamily: 'open-sans-bold' //You can change labelStyle here but of course it won't be reflected on Android where you're using createMaterialBottomTabNavigator. The way to do it for createMaterialBottomTabNavigator is to set your tabBarLabel to an actual Text component that has your label with an inline style and you can see that I did that in tabScreenConfig.
        },
        activeTintColor: config.colors.secondaryNav
    }
})

const FilterNavigator = createStackNavigator({ //Just needs one screen so that we have a header for this page, otherwise it's just the FiltersScreen
    AnyName: FilterScreen
},
{
    navigationOptions: {
        drawerLabel: 'Filter!!!'
    }
},
{
    defaultNavigationOptions: defaultStackNavOptions
})

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals!!!'
        }
    },
    Filter: FilterNavigator
}, {
    contentOptions: {
        activeTintColor: config.colors.secondaryNav,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
})

export default createAppContainer(MainNavigator)
