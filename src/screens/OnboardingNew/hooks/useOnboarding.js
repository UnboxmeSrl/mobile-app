import React, { useRef, useState } from 'react'
import { FirstOnboarding } from '../FirstOnboarding'
import { SecondOnboarding } from '../SecondOnboarding'
import { ThirdOnboarding } from '../ThirdOnboarding'
import { FourthOnboarding } from '../FourthOnboarding'
import { FifthOnboarding } from '../FifthOnboarding'
import { navigate } from '@services'
import { SCREEN_NAMES } from '@const/navigation'

const useOnboarding = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef(null)
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
    setActiveIndex((activeIndex) => activeIndex + 1)
    if (activeIndex > 3) {
      navigate(SCREEN_NAMES.SignUpNew)
    }
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
