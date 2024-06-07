import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../../constants';
import {getInterestTopics, navigate} from '../../../../services';
import {setAuthData, setSignUpProcessStage} from '../../../../redux';
import {useNavigation} from '@react-navigation/native';

const useAuthAgency = () => {
  const userDetails = useSelector(state => state.authSlice.authData);
  const [interestTopicsList, setInterestTopicsList] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState(
    userDetails?.userInterests ?? [],
  );
  const [selectedUserType, setSelectedUserType] = useState(
    userDetails?.userType ?? {},
  );
  const [selectedValue, setSelectedValue] = useState(
    userDetails?.agencyData?.freelance ? 1 : 2,
  );
  const [agencyName, setAgencyName] = useState(
    userDetails?.agencyData?.hasAgency ?? '',
  );
  const userTypeList = [
    {
      id: 7,
      name: 'Model',
    },
    {
      id: 8,
      name: 'Influencer',
    },
    {
      id: 3,
      name: 'Both',
      data: [7, 8],
    },
  ];
  const dispatch = useDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.replace(SCREEN_NAMES.AuthProfilePictureScreen);
  };

  const handleNextPress = () => {
    const prepData =
      selectedValue == 1
        ? {hasAgency: '', freelance: true}
        : {hasAgency: agencyName, freelance: false};
    dispatch(
      setAuthData({
        agencyData: prepData,
        userInterests: selectedInterests,
        userType: selectedUserType,
      }),
    );
    dispatch(setSignUpProcessStage(1));
    navigate(SCREEN_NAMES.AuthCodeFromFriendScreen);
  };
  const getInterestTopicsData = async () => {
    const res = await getInterestTopics();
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
  useEffect(() => {
    getInterestTopicsData();
  }, []);
  useEffect(() => {
    if (
      selectedValue === 1 ||
      (selectedValue === 2 && agencyName?.length > 0)
    ) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [selectedValue, agencyName, selectedInterests]);

  return {
    isBtnDisabled,
    selectedValue,
    setSelectedValue,
    agencyName,
    setAgencyName,
    handleBackPress,
    handleNextPress,
    handleInterestSelect,
    interestTopicsList,
    selectedInterests,
    userTypeList,
    setSelectedUserType,
    selectedUserType,
  };
};

export default useAuthAgency;
