/**
* Handles the main/overall flow of the app
* When app is launched by the user, AppNavigator is called and checks if the user has a session.
* If the user doesn't have a session, then the user is redirected to login/register screen.
* If the user has a valid session, then the user is redirected to the appropriate screen based on the type of user.
*/
import { StackNavigator } from 'react-navigation';
import SignUp from './SignUp';
import SignIn from './SignIn';
import UserTypePrompt from './UserTypePrompt';
import Home from '../Professor/Home';
import ProfessorNavigator from '../Professor/ProfessorNavigator';

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
  },

  UserTypePromptScreen: {
    screen: UserTypePrompt,
    navigationOptions: {
      header: null
    }
  }
};

const navigatorConfigs = {
    initialRouteName: 'UserTypePromptScreen'
};

const LoggedOutNavigator = StackNavigator(routeConfigs, navigatorConfigs);

export default LoggedOutNavigator;
