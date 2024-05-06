import {useDispatch} from 'react-redux';
import {updateUserCount} from '../../../redux';
import {STACK_NAMES} from '../../../constants';
import {useNavigation} from '@react-navigation/native';

const useFirstWelcome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleGuestPress = () => {
    navigation.replace(STACK_NAMES.BottomStack);
    dispatch(updateUserCount(2));
  };

  return {
    handleGuestPress,
  };
};

export default useFirstWelcome;
