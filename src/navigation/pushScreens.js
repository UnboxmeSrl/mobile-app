import { AddNewAddress } from '@screens/AddNewAddress'
import { AddressesScreen } from '@screens/Addresses'
import { AwardScreen } from '@screens/AwardScreen'
import { AwardScreenPresenter } from '@screens/AwardScreen/AwardScreenPresenter'
import { BoxBriefScreen } from '@screens/BoxBrief'
import { BoxBrief2Screen } from '@screens/BoxBrief2'
import { BoxContentUploadScreen } from '@screens/BoxContantUpload'
import { CodeFromFriend } from '@screens/CodeFromFriend'
import { ContentApprovedScreen } from '@screens/ContentApproved'
import { EditProfileScreen } from '@screens/EditProfile'
import { OnboardingScreen } from '@screens/Onboarding'
import { OtherSingUpOptionsScreen } from '@screens/OtherSignUpOptions'
import { ProductSelectionScreen } from '@screens/ProductSelection'
import { QuestionnaireScreen } from '@screens/Questionnaire'
import { SettingsScreen } from '@screens/Settings'
import { SignInScreen } from '@screens/SignIn'
import { SignUpScreen } from '@screens/SignUp'
import { WizardScreen } from '@screens/Wizard'
import BookingDetailsScreen from '../screens/BookingDetails/BookingDetailsScreen'
import BookingOnApprovalScreen from '../screens/BookingOnApproval/BookingOnApprovalScreen'
import ContentScreen from '../screens/Content/ContentScreen'
import ContentBriefScreen from '../screens/ContentBrief/ContentBriefScreen'
import { NewCouponScreen } from '../screens/NewCoupon'
import ServiceDetails from '../screens/ServiceDetails/ServiceDetailsScreen'
import YourScheduleDetailsScreen from '../screens/YourScheduleDetails/YourScheduleDetailsScreen'
import { PublishContentScreen } from '../screens/PublishContent'
import {
  AuthAgencyScreen,
  AuthCityScreen,
  AuthDateOfBirthScreen,
  AuthGenderScreen,
  AuthInterestTopicsScreen,
  AuthNationalityScreen,
  AuthPersonalDetailsScreen,
  AuthProfilePictureScreen,
  AuthUserTypeScreen,
} from '../screens/Auth'
import { SCREEN_NAMES } from '../constants/navigation'

export default {
  [SCREEN_NAMES.Onboarding]: {
    screen: OnboardingScreen,
  },
  [SCREEN_NAMES.SignUp]: {
    screen: SignUpScreen,
  },
  [SCREEN_NAMES.OtherSignUp]: {
    screen: OtherSingUpOptionsScreen,
  },
  [SCREEN_NAMES.SignIn]: {
    screen: SignInScreen,
  },
  [SCREEN_NAMES.Wizard]: {
    screen: WizardScreen,
  },
  [SCREEN_NAMES.Questionnaire]: {
    screen: QuestionnaireScreen,
  },
  [SCREEN_NAMES.ProductSelection]: {
    screen: ProductSelectionScreen,
  },
  [SCREEN_NAMES.Addresses]: {
    screen: AddressesScreen,
  },
  [SCREEN_NAMES.AddNewAddress]: {
    screen: AddNewAddress,
  },
  [SCREEN_NAMES.BoxBrief]: {
    screen: BoxBriefScreen,
  },
  [SCREEN_NAMES.BoxBrief2]: {
    screen: BoxBrief2Screen,
  },
  [SCREEN_NAMES.BoxContentUploadScreen]: {
    screen: BoxContentUploadScreen,
  },
  [SCREEN_NAMES.ContentApproved]: {
    screen: ContentApprovedScreen,
  },
  [SCREEN_NAMES.AddCode]: {
    screen: CodeFromFriend,
  },
  [SCREEN_NAMES.Settings]: {
    screen: SettingsScreen,
  },
  [SCREEN_NAMES.EditProfile]: {
    screen: EditProfileScreen,
  },
  [SCREEN_NAMES.AwardScreen]: {
    screen: AwardScreen,
  },
  [SCREEN_NAMES.ServiceDetails]: {
    screen: ServiceDetails,
  },
  [SCREEN_NAMES.BookingDetails]: {
    screen: BookingDetailsScreen,
  },
  [SCREEN_NAMES.BookingOnApprovalScreen]: {
    screen: BookingOnApprovalScreen,
  },
  [SCREEN_NAMES.YourScheduleDetailsScreen]: {
    screen: YourScheduleDetailsScreen,
  },
  [SCREEN_NAMES.ContentScreen]: {
    screen: ContentScreen,
  },
  [SCREEN_NAMES.ContentBriefScreen]: {
    screen: ContentBriefScreen,
  },
  [SCREEN_NAMES.NewCouponScreen]: {
    screen: NewCouponScreen,
  },
  [SCREEN_NAMES.PublishContentScreen]: {
    screen: PublishContentScreen,
  },
  [SCREEN_NAMES.AuthPersonalDetailsScreen]: {
    screen: AuthPersonalDetailsScreen,
  },
  [SCREEN_NAMES.AuthGenderScreen]: {
    screen: AuthGenderScreen,
  },
  [SCREEN_NAMES.AuthDateOfBirthScreen]: {
    screen: AuthDateOfBirthScreen,
  },
  [SCREEN_NAMES.AuthNationalityScreen]: {
    screen: AuthNationalityScreen,
  },
  [SCREEN_NAMES.AuthCityScreen]: {
    screen: AuthCityScreen,
  },
  [SCREEN_NAMES.AuthAgencyScreen]: {
    screen: AuthAgencyScreen,
  },
  [SCREEN_NAMES.AuthUserTypeScreen]: {
    screen: AuthUserTypeScreen,
  },
  [SCREEN_NAMES.AuthInterestTopicsScreen]: {
    screen: AuthInterestTopicsScreen,
  },
  [SCREEN_NAMES.AuthProfilePictureScreen]: {
    screen: AuthProfilePictureScreen,
  },
}
