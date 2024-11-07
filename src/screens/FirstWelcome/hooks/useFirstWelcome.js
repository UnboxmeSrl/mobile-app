import {useNavigation} from '@react-navigation/native';
import {STACK_NAMES} from '../../../constants';

const useFirstWelcome = () => {
  const navigation = useNavigation();

  const handleGuestPress = () => {
    navigation.replace(STACK_NAMES.BottomStack);
  };

  return {
    handleGuestPress,
  };
};

export default useFirstWelcome;
