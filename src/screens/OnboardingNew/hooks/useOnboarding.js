import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { SCREEN_NAMES } from '@const/navigation'
import { navigate } from '@services'

import { setOnboardingData } from '../../../redux/slices/authSlice'
import { FifthOnboarding } from '../FifthOnboarding'
import { FirstOnboarding } from '../FirstOnboarding'
import { FourthOnboarding } from '../FourthOnboarding'
import { SecondOnboarding } from '../SecondOnboarding'
import { ThirdOnboarding } from '../ThirdOnboarding'

const useOnboarding = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef(null)
  const dispatch = useDispatch()
  const carouselItems = [
    {
      id: 1,
      component: <FirstOnboarding />,
    },
    {
      id: 2,
      component: <SecondOnboarding />,
    },
    {
      id: 3,
      component: <ThirdOnboarding />,
    },
    {
      id: 4,
      component: <FourthOnboarding />,
    },
    {
      id: 5,
      component: <FifthOnboarding />,
    },
  ]

  const handleNextPress = () => {
    setActiveIndex((activeIndex) => {
      const active = activeIndex + 1
      if (active > 4) {
        navigate(SCREEN_NAMES.SignUpNew)
        dispatch(setOnboardingData(true))
      }
      return active
    })

    //   // Use carouselRef to scroll to the next item
    //   if (carouselRef.current) {
    //     carouselRef.current.snapToItem(newIndex)
    //   }
    // navigate(SCREEN_NAMES.SignUpNew)
  }
  return {
    carouselRef,
    activeIndex,
    setActiveIndex,
    carouselItems,
    handleNextPress,
  }
}
export default useOnboarding
