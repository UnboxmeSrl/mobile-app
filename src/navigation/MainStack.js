import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN_NAMES, STACK_NAMES} from '../constants';
import {Splash} from '../components';
import BottomTabNavigator from './BottomNavigator';
import {
  AppliedScreen,
  AuthAgencyScreen,
  AuthCityScreen,
  AuthCodeFromFriendScreen,
  AuthDateOfBirthScreen,
  AuthGenderScreen,
  AuthInterestTopicsScreen,
  AuthNationalityScreen,
  AuthPersonalDetailsScreen,
  AuthProfilePictureScreen,
  AuthSocialNetworkScreen,
  AuthUserTypeScreen,
  BookingDetailsScreen,
  BookingOnApprovalScreen,
  ContentBriefScreen,
  ContentScreen,
  EditProfileScreen,
  FirstWelcomeScreen,
  NewCouponScreen,
  OnboardingNew,
  OtherSignUpOptionsScreen,
  PublishContentScreen,
  RejectedScreen,
  ServiceDetails,
  SettingsNew,
  SignUpNew,
  YourScheduleDetailsScreen,
} from '../screens';

const StackMain = createStackNavigator();

const MainStack = () => {
  return (
    <StackMain.Navigator
      initialRouteName={SCREEN_NAMES.Splash}
      screenOptions={{
        headerShown: false,
      }}>
      <StackMain.Screen name={SCREEN_NAMES.Splash} component={Splash} />
      <StackMain.Screen
        name={STACK_NAMES.BottomStack}
        component={BottomTabNavigator}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.ServiceDetails}
        component={ServiceDetails}
      />
      <StackMain.Screen name={SCREEN_NAMES.SignUpNew} component={SignUpNew} />
      <StackMain.Screen
        name={SCREEN_NAMES.BookingDetails}
        component={BookingDetailsScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.BookingOnApprovalScreen}
        component={BookingOnApprovalScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.ContentScreen}
        component={ContentScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.ContentBriefScreen}
        component={ContentBriefScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.NewCouponScreen}
        component={NewCouponScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.YourScheduleDetailsScreen}
        component={YourScheduleDetailsScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.PublishContentScreen}
        component={PublishContentScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.SettingsNew}
        component={SettingsNew}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.EditProfile}
        component={EditProfileScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.FirstWelcomeScreen}
        component={FirstWelcomeScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.AppliedScreen}
        component={AppliedScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.RejectedScreen}
        component={RejectedScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.OnboardingNew}
        component={OnboardingNew}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.OtherSignUp}
        component={OtherSignUpOptionsScreen}
      />

      <StackMain.Screen
        name={SCREEN_NAMES.AuthPersonalDetailsScreen}
        component={AuthPersonalDetailsScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.AuthGenderScreen}
        component={AuthGenderScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.AuthDateOfBirthScreen}
        component={AuthDateOfBirthScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.AuthNationalityScreen}
        component={AuthNationalityScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.AuthCityScreen}
        component={AuthCityScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.AuthAgencyScreen}
        component={AuthAgencyScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.AuthInterestTopicsScreen}
        component={AuthInterestTopicsScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.AuthProfilePictureScreen}
        component={AuthProfilePictureScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.AuthCodeFromFriendScreen}
        component={AuthCodeFromFriendScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.AuthUserTypeScreen}
        component={AuthUserTypeScreen}
      />
      <StackMain.Screen
        name={SCREEN_NAMES.AuthSocialNetworkScreen}
        component={AuthSocialNetworkScreen}
      />
    </StackMain.Navigator>
  );
};

export default MainStack;
