import { AddNewAddress } from '@screens/AddNewAddress'
import { AddressesScreen } from '@screens/Addresses'
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

import { SCREEN_NAMES } from '@const/navigation'

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
}
