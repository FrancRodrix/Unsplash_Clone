import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';

// import Download from './DownloadFile'
const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
      <Stack.Navigator>
      <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />  
      </Stack.Navigator>
  );
};
export default AuthNavigation;
