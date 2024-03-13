import React, { useRef, useState } from 'react'
import FirstScreen from '../FirstScreen'
import SecondScreen from '../SecondScreen'
import ThirdScreen from '../ThirdScreen'
import { navigate } from '../../../../services'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { useNavigationParam } from 'react-navigation-hooks'

const useLoginOnboarding = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef(null)
  const isFromBookRedirected = useNavigationParam('isFromBookRedirected')
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
  ]

  const handleNextPress = () => {
    setActiveIndex((activeIndex) => activeIndex + 1)
    if (activeIndex > 1) {
      if (isFromBookRedirected) {
        navigate(SCREEN_NAMES.ServiceDetails)
      } else {
        navigate(SCREEN_NAMES.Cities)
      }
    }
  }
  return {
    carouselRef,
    activeIndex,
    setActiveIndex,
    carouselItems,
    handleNextPress,
  }
}

export default useLoginOnboarding
