import {useRoute} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {SCREEN_NAMES} from '../../../../constants';
import {navigate} from '../../../../services';
import FirstScreen from '../FirstScreen';
import SecondScreen from '../SecondScreen';
import ThirdScreen from '../ThirdScreen';

const useLoginOnboarding = () => {
  const route = useRoute();
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const isFromBookRedirected = route.params?.isFromBookRedirected;
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
        navigate(SCREEN_NAMES.ServiceDetails);
      } else {
        navigate(SCREEN_NAMES.Cities);
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
