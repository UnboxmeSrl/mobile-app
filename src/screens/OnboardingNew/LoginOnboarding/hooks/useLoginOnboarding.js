import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {SCREEN_NAMES} from '../../../../constants';
import {setVisitCount} from '../../../../redux';
import FirstScreen from '../FirstScreen';
import SecondScreen from '../SecondScreen';
import ThirdScreen from '../ThirdScreen';

const useLoginOnboarding = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const isFromBookRedirected = route.params?.isFromBookRedirected;
  const dispatch = useDispatch();
  const carouselItems = [
    {
      id: 1,
      component: <FirstScreen />,
    },
    {
      id: 2,
      component: <SecondScreen />,
    },
    {
      id: 3,
      component: <ThirdScreen />,
    },
  ];

  const handleNextPress = () => {
    setActiveIndex(activeIndex => activeIndex + 1);
    if (activeIndex > 1) {
      if (isFromBookRedirected) {
        navigation.replace(SCREEN_NAMES.ServiceDetails);
      } else {
        // dispatch(updateUserCount(3));
        dispatch(setVisitCount());
        navigation.replace(SCREEN_NAMES.FirstWelcomeScreen);
      }
    }
  };
  return {
    carouselRef,
    activeIndex,
    setActiveIndex,
    carouselItems,
    handleNextPress,
  };
};

export default useLoginOnboarding;
