import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
// import Google from './Google'
import Details from '../Screens/Details'
// import Download from './DownloadFile'
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="ParkScreen"
          component={ParkScreen}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
  );
};
export default AppNavigation;
