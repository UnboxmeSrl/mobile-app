import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../../constants';
import {getInterestTopics, navigate} from '../../../../services';
import {setAuthData, setSignUpProcessStage} from '../../../../redux';
import {useNavigation} from '@react-navigation/native';

const useAuthInterestTopics = () => {
  const userDetails = useSelector(state => state.authSlice.authData);
  const [interestTopicsList, setInterestTopicsList] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState(
    userDetails?.userInterests ?? [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const navigation = useNavigation();

  const getInterestTopicsData = async () => {
    const res = await getInterestTopics();
    setIsLoading(false);
    if (res?.data?.length) {
      setInterestTopicsList(res.data);
    }
  };

  const handleInterestSelect = selectedTopic => {
    const filteredRes = selectedInterests?.filter(
      item => item?.id === selectedTopic?.id,
    );
    if (filteredRes.length > 0) {
      const listWithDeletedTopic = selectedInterests?.filter(
        item => item?.id !== selectedTopic?.id,
      );
      setSelectedInterests(listWithDeletedTopic);
    } else {
      setSelectedInterests([...selectedInterests, selectedTopic]);
    }
  };

  const handleBackPress = () => {
    navigation.replace(SCREEN_NAMES.AuthUserTypeScreen);
  };

  const handleNextPress = () => {
    dispatch(setAuthData({userInterests: selectedInterests}));
    dispatch(setSignUpProcessStage(9));
    navigate(SCREEN_NAMES.AuthProfilePictureScreen);
  };

  useEffect(() => {
    getInterestTopicsData();
  }, []);

  useEffect(() => {
    if (selectedInterests?.length !== 0) {
      setIsBtnDisabled(false);
    }
  }, [selectedInterests]);

  return {
    handleBackPress,
    handleInterestSelect,
    handleNextPress,
    interestTopicsList,
    isBtnDisabled,
    isLoading,
    selectedInterests,
  };
};

export default useAuthInterestTopics;
