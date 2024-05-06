import {useDispatch} from 'react-redux';
import {STACK_NAMES} from '../../../constants';
import {resetLogin} from '../../../redux';
import {navigate} from '../../../services';

const useReject = () => {
  const dispatch = useDispatch();

  const handleGuestPress = () => {
    dispatch(resetLogin());
    navigate(STACK_NAMES.BottomStack);
  };

  return {
    handleGuestPress,
  };
};

export default useReject;
