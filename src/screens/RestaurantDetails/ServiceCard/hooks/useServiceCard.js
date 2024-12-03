import {useDispatch} from 'react-redux';
import {SCREEN_NAMES} from '../../../../constants';
import {setServiceDetails} from '../../../../redux';
import {navigate} from '../../../../services';

const useServiceCard = item => {
  const dispatch = useDispatch();
  const handleCardPress = item => {
    dispatch(setServiceDetails(item));
    navigate(SCREEN_NAMES.ServiceDetails);
  };

  return {
    handleCardPress,
  };
};

export default useServiceCard;
