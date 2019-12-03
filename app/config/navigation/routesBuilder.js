import {
  SwitchNavigator
} from "react-navigation";
import * as Screens from '../../screens';

export const createRootNavigator = (mainRout = 'Login') => {
  return SwitchNavigator(
    {
      Login: {
        screen: Screens.LoginV1,
      },
      SignUp: {
        screen: Screens.SignUp
      },
      Home: {
        screen: Screens.MainScreen,
      },
    },
    {
      initialRouteName: mainRout
    }, {
      headerMode: 'none',
    }
  );
};