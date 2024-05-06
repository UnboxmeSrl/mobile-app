import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN_NAMES} from '../constants';
import {ProfileScreen, YourScheduleScreen} from '../screens';

const StackProfile = createStackNavigator();

const ProfileStack = () => {
  return (
    <StackProfile.Navigator
      initialRouteName={SCREEN_NAMES.Profile}
      screenOptions={{
        headerShown: false,
      }}>
      <StackProfile.Screen
        name={SCREEN_NAMES.Profile}
        component={ProfileScreen}
      />
      {/* <StackProfile.Screen name={SCREEN_NAMES.EditProfile} component={CitiesScreen} />
       <StackProfile.Screen name={SCREEN_NAMES.ProfileScreenPresenter}  component={CitiesScreen}/> */}
    </StackProfile.Navigator>
  );
};

export default ProfileStack;
