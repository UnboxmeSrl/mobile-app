import React from 'react'
import 'react-native-gesture-handler'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import i18n from '@services/i18n'
import { ThemeProvider } from '@components/ThemeProvider'
import { AppGlobalHooks } from '@components/AppGlobalHooks'
import { NavigationContainer } from '@nav/NavigationContainer'
import { MainStack } from '@nav/MainStack'
import { store } from '@redux/store'
import { Splash } from '@components/Splash'
import { StyledStatusBar } from '@components/StatusBar'

const App: React.FC = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
          <NavigationContainer>
            <StyledStatusBar />
            <MainStack />
            <AppGlobalHooks />
            <Splash />
          </NavigationContainer>
      </ThemeProvider>
    </I18nextProvider>
  </Provider>
)

export default App
