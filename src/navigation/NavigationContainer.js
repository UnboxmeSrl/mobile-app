import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { createAppContainer, NavigationContext } from 'react-navigation'
import { DARK, LIGHT } from 'src/constants/navigation'
import MainStack from 'src/navigation/MainStack'
import { setTopLevelNavigator } from 'src/services'

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
        <Toast ref={(ref) => Toast.setRef(ref)} topOffset={50} />
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
