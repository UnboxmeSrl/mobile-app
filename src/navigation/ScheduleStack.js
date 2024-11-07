import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN_NAMES} from '../constants';
import {ArchiveScreen, YourScheduleScreen} from '../screens';

const StackSchedule = createStackNavigator();

const ScheduleStack = () => {
  return (
    <StackSchedule.Navigator
      initialRouteName={SCREEN_NAMES.YourScheduleScreen}
      screenOptions={{
        headerShown: false,
      }}>
      <StackSchedule.Screen
        name={SCREEN_NAMES.YourScheduleScreen}
        component={YourScheduleScreen}
      />
      <StackSchedule.Screen
        name={SCREEN_NAMES.ArchiveScreen}
        component={ArchiveScreen}
      />
    </StackSchedule.Navigator>
  );
};

export default ScheduleStack;
