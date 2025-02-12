import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CitiesScreen, RestaurantDetails, RestaurantsScreen} from '../screens';
import {SCREEN_NAMES} from '../constants';
import {useNotification} from '../hooks';
import {useRestaurants} from '../screens/Restaurants/hooks';

const StackHome = createStackNavigator();

const HomeStack = () => {
  const {requestLocationPermission, cityData} = useRestaurants();
  useEffect(() => {
    console.log('check_requestLocationPermission_HomeStack');
    requestLocationPermission();
  }, [requestLocationPermission]);
  return (
    <StackHome.Navigator
      initialRouteName={SCREEN_NAMES.Cities}
      screenOptions={{
        headerShown: false,
      }}>
      <StackHome.Screen name={SCREEN_NAMES.Cities} component={CitiesScreen} />
      <StackHome.Screen
        name={SCREEN_NAMES.Restaurants}
        component={RestaurantsScreen}
      />
      <StackHome.Screen
        name={SCREEN_NAMES.RestaurantDetails}
        component={RestaurantDetails}
      />
    </StackHome.Navigator>
  );
};

export default HomeStack;
