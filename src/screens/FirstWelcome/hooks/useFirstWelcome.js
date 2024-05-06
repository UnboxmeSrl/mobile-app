import {useDispatch, useSelector} from 'react-redux';
import {selectIsFirstVisit, updateUserCount} from '../../../redux';
import {STACK_NAMES} from '../../../constants';
import {useNavigation} from '@react-navigation/native';

const useFirstWelcome = () => {
  const navigation = useNavigation();
  const firstVisit = useSelector(selectIsFirstVisit);

  console.log('First Visit', firstVisit);
  const dispatch = useDispatch();

  const handleGuestPress = () => {
    navigation.replace(STACK_NAMES.BottomStack);
    dispatch(updateUserCount(3));
  };

  return {
    handleGuestPress,
  };
};

export default useFirstWelcome;
