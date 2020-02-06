import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import config from '../config'

import { CATEGORIES } from '../data/dummy-data'

import HeaderButton from '../components/HeaderButton'

const CategoriesScreen = props => {

    let TouchableComp = Platform.OS === 'android' && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity

    const renderGridItem = itemData => { //The only reason this needs to be inside our component is because we're passing props to it from navigation. Otherwise it would be fine to sit outside the component.
        return ( //How do you pass more than just the route name onPress? i.e. how do you pass other information from the CategoriesScreen to the CategoryMealsScreen such as the nav title we want to display? We use the params property, which itself takes an object of as many key value pairs as you want. In our case we want to pass itemData.item.iddd as the categoryId.
            <View style={styles.gridItem}>
                <TouchableComp style={{flex: 1}} onPress={()=>{props.navigation.navigate({routeName: 'CategoryMeals', params: {categoryId: itemData.item.iddd}})}}>
                <View style={[{backgroundColor: itemData.item.color}, styles.container]}>
                    <Text style={styles.title} numberOfLines={2}>{itemData.item.title}</Text>
                </View>
                </TouchableComp>
            </View>
        )
    }

    return ( //Setting the numColumns property on FlatList gives you a grid effect. If you ever need to change the number of columns in numColumns you have to stop and restart the dev server, don't ask me why. Also, calling our id in the Category class iddd just to demo again how key extractor works here in this component.
        <FlatList keyExtractor={(item, index) => item.iddd} data={CATEGORIES} renderItem={renderGridItem} numColumns={2}/>
    )
}

//After our component we can set our header title. Here's one option how to do this: Every React component is just a JavaScript function. It's just a function that receives some props and returns some JSX. JavaScript functions are just objects, and on objects we can add properties. Hence, we can add a property after creating it. With dot notation we can add the navigationOptions property which is one that React Navigation will pick up and that's the navigationOptions property. Within that property you build an object of options, one being the headerTitle.
CategoriesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Meal Categories',
        //Commenting out the below because we want to demonstate how to do this in from MealsNavigator.js in defaultNavigationOptions. If you want to override defaultNavigationOptions you'd do it on a per page basis as commented out below, but if you were to do it on a per page basis from the actual navigation route in MealsNavigator.js the one in MealsNavigator.js would actually overwrite the component... NOT INTUITIVE BEHAVIOR, TAKE NOTE OF THIS:

        // headerStyle: {
        //     backgroundColor: Platform.OS === 'android' ? config.colors.primaryNav : '' //Just a demonstation here of how to customize the nav for Android but leave it as default for iOS.
        // },
        // headerTintColor: Platform.OS === 'android' ? 'rgb(255,255,255)' : '' //Just a demonstation here of how to customize the nav for Android but leave it as default for iOS.
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}><Item title='Menu' iconName='ios-menu' onPress={() => navData.navigation.toggleDrawer()}/></HeaderButtons>
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridItem: { //In the case of a 2 column layout our flex: 1 automatically takes up half the available width. In the case of 3 columns it would take a third, etc. It is automatically responsive to the FlatList grid.
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        elevation: 5,
        overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible' //The only reason we need overflow set to hidden is to hide the ripple effect on TouchableOpacity on android. If we were to hide it on iOS too we'd lose our shadow properties in the child... and EVEN IF WE MOVE THE SHADOW PROPERTIES HERE IN THE PARENT WE'LL LOSE THEM!! That's a strange platform difference between Android and iOS. Also note, none of the shadow properties even work on Android, only the elevation which is Android specific. So the optimal solution is just to put elevation here in the parent and make the overflow property platform specific. We set borderRadius to 10 in the parent and overflow to hidden to make sure that children of this can't display anything outside of that wrapping view and this is important because we're using TouchableNativeFeedback on Android which has a ripple effect that would otherwise bleed outside the boundaries of the rounded corners.
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'rgb(0,0,0)',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        textAlign: 'right'
    }
})

export default CategoriesScreen
