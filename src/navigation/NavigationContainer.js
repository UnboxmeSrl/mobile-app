import React from 'react'
import { createAppContainer, NavigationContext } from 'react-navigation'
import { DARK, LIGHT } from 'src/constants/navigation'
import MainStack from 'src/navigation/MainStack'
import { captureException, setTopLevelNavigator } from 'src/services'

import { useTheme } from '@hooks/useTheme'

class NavigationProvider extends MainStack {
  static contextType = NavigationContext

  constructor(props) {
    super(props)

    setTopLevelNavigator(props.navigation)
  }

  render() {
    const { children, ...props } = this.props
    const navigation = this.context || this.props.navigation

    return (
      <NavigationContext.Provider value={navigation}>
        <MainStack {...props} />
        {children}
      </NavigationContext.Provider>
    )
  }
}

const AppContainer = createAppContainer(NavigationProvider)

const NavigationConainer = (props) => {
  const theme = useTheme(LIGHT, DARK)

  return <AppContainer {...props} theme={theme} />
}

export default NavigationConainer
