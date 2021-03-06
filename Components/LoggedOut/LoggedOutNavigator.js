/**
* Handles the main/overall flow of the app
* When app is launched by the user, AppNavigator is called and checks if the user has a session.
* If the user doesn't have a session, then the user is redirected to login/register screen.
* If the user has a valid session, then the user is redirected to the appropriate screen based on the type of user.
*/
import { StackNavigator } from 'react-navigation';
import SignUp from './SignUp';
import SignIn from './SignIn';


const routeConfigs = {
  SignUpScreen: {
    screen: SignUp,
    navigationOptions: {
      header: null
    }
  },
  
  SignInScreen: {
    screen: SignIn,
    navigationOptions: {
      header: null
    }
  }
};

const navigatorConfigs = {
    initialRouteName: 'SignInScreen'
};

const LoggedOutNavigator = StackNavigator(routeConfigs, navigatorConfigs);

export default LoggedOutNavigator;
