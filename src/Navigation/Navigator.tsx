import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigation';
import AuthNavigator from './AuthNavigaation';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../Redux/AuthSlice';


const AppRoute = () => {

    // const [isLoggedIn, setIsLoggedIn] = React.useState(true);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <NavigationContainer>
            {/* Conditional stack navigator rendering based on login state */}

            {
                isLoggedIn ? <AppNavigator /> : <AuthNavigator />
            }
        </NavigationContainer>
    )
}

export default AppRoute