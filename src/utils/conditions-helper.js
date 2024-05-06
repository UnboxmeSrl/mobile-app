import {SCREEN_NAMES} from '../constants';
import {navigate} from '../services';

export const checkSignUpProgress = signUpProcessStage => {
  switch (signUpProcessStage) {
    case 1:
      navigate(SCREEN_NAMES.AuthPersonalDetailsScreen);
      break;
    case 2:
      navigate(SCREEN_NAMES.AuthGenderScreen);
      break;
    case 3:
      navigate(SCREEN_NAMES.AuthDateOfBirthScreen);
      break;
    case 4:
      navigate(SCREEN_NAMES.AuthNationalityScreen);
      break;
    case 5:
      navigate(SCREEN_NAMES.AuthCityScreen);
      break;
    case 6:
      navigate(SCREEN_NAMES.AuthAgencyScreen);
      break;
    case 7:
      navigate(SCREEN_NAMES.AuthUserTypeScreen);
      break;
    case 8:
      navigate(SCREEN_NAMES.AuthInterestTopicsScreen);
      break;
    case 9:
      navigate(SCREEN_NAMES.AuthProfilePictureScreen);
      break;
    case 10:
      navigate(SCREEN_NAMES.AuthCodeFromFriendScreen);
      break;
    case 11:
      navigate(SCREEN_NAMES.AuthSocialNetworkScreen);
      break;
  }
};
