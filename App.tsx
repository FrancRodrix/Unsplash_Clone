import React from 'react'
import { View, Text } from 'react-native'
import Navigation from './src/Screens/navigation'
import {Provider} from 'react-redux'
import AppRoute from './src/Navigation/Navigator'
import { store } from './src/Store';

export default function App() {
  return (
    <Provider store={store}>
  <AppRoute/>

    </Provider>
  )
}
