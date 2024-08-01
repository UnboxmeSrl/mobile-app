import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN_NAMES, STACK_NAMES} from '../constants';
import {Splash} from '../components';
import BottomTabNavigator from './BottomNavigator';
import {Chat, OverlayProvider} from 'stream-chat-react-native';
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
  ChatScreen,
  ContentBriefScreen,
  ContentScreen,
  ContentUploadGuide,
  EditProfileScreen,
  FirstWelcomeScreen,
  LoginOnboarding,
  NewCouponScreen,
  OnboardingNew,
  OtherSignUpOptionsScreen,
  PublishContentScreen,
  RejectedScreen,
  ServiceDetails,
  SettingsNew,
  SignUpNew,
  TutorialsScreen,
  YourScheduleDetailsScreen,
} from '../screens';
import {chatClient} from '../App';

const StackMain = createStackNavigator();

const MainStack = () => {
  return (
    <OverlayProvider>
      <Chat client={chatClient}>
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
          <StackMain.Screen
            name={SCREEN_NAMES.SignUpNew}
            component={SignUpNew}
          />
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
          <StackMain.Screen
            name={SCREEN_NAMES.LoginOnboarding}
            component={LoginOnboarding}
          />
          <StackMain.Screen
            name={SCREEN_NAMES.ContentUploadGuide}
            component={ContentUploadGuide}
          />
          <StackMain.Screen
            name={SCREEN_NAMES.TutorialsScreen}
            component={TutorialsScreen}
          />
          <StackMain.Screen
            name={SCREEN_NAMES.ChatScreen}
            component={ChatScreen}
          />
        </StackMain.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

export default MainStack;
