import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { SCREEN_NAMES } from '../constants/navigation'
import CitiesScreen from '../screens/Cities/CitiesScreen'
import RestaurantDetails from '../screens/RestaurantDetails/RestaurantDetailsScreen'
import RestaurantsScreen from '../screens/Restaurants/RestaurantsScreen'

const HomeStack = createStackNavigator(
  {
    [SCREEN_NAMES.Cities]: CitiesScreen,
    [SCREEN_NAMES.Restaurants]: RestaurantsScreen,
    [SCREEN_NAMES.RestaurantDetails]: RestaurantDetails,
  },
  {
    headerMode: 'none',
    initialRouteName: SCREEN_NAMES.Cities,
  }
)
export default createAppContainer(HomeStack)
