import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { AppInit } from './AppInit'
import store from '@store/index'

const App: FC = () => (
  <Provider store={store}>
    <AppInit />
  </Provider>
)

export default App
