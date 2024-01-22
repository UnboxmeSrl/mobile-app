import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { SCREEN_NAMES } from '../constants/navigation'
import CitiesScreen from '../screens/Cities/CitiesScreen'
import RestaurantsScreen from '../screens/Restaurants/RestaurantsScreen'
import RestaurantDetails from '../screens/RestaurantDetails'

// const Home = createStackNavigator()

// export const HomeStack = () => {
//   return (
//     <Home.Navigator
//       initialRouteName={SCREEN_NAMES.Cities}
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Home.Screen component={CitiesScreen} name={SCREEN_NAMES.Cities} />
//       <Home.Screen component={RestaurantsScreen} name={SCREEN_NAMES.Restaurants} />
//     </Home.Navigator>
//   )
// }

const HomeStack = createStackNavigator(
  {
    [SCREEN_NAMES.Cities]: CitiesScreen,
    [SCREEN_NAMES.Restaurants]: RestaurantsScreen,
    [SCREEN_NAMES.RestaurantDetails]: RestaurantDetails,

  },
  {
    initialRouteName: SCREEN_NAMES.Cities,
    headerMode: 'none',
  }
)
export default createAppContainer(HomeStack)
