import React from "react";
import { View, Animated } from "react-native";
import { AppLoading, Font } from "expo";
import { BlurView } from "expo";
import { createStackNavigator } from "react-navigation";
import * as Screens from "./app/screens";
import AppGlobalReducer from "./app/reducers/AppGlobalConfig/AppGlobalConfig";
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { data } from "./app/data";
import { bootstrap } from "./app/config/bootstrap";
import AppGlobalRoutesReducer from "./app/reducers/routes/AppGlobalRoutes";
import SignUp from "./app/screens/login/signUp";
import LoginV1 from "./app/screens/login/login1";
import AppSocktIdReducer from "./app/reducers/sockt/Sockt_id";
import SplashScreen from "./app/screens/other/splash";

import { RkText } from "react-native-ui-kitten";
import Erorr404 from "./app/screens/other/404Erorr";
import { TabView } from "./app/screens/HomeView/mainRouts";
import UserReducer from "./app/reducers/user/User";
import TopBarReducer from "./app/reducers/comps/TopBar";
import Profile from "./app/screens/login/Profile";
import UserDataReducer from "./app/reducers/user/UserData";

bootstrap();

const AllReducers = combineReducers({
  AppGlobalReducer: AppGlobalReducer,
  AppGlobalRoutes: AppGlobalRoutesReducer,
  AppSocktId: AppSocktIdReducer,
  User: UserReducer,
  TopBar: TopBarReducer,
  UserData:UserDataReducer
});

const store = createStore(AllReducers, applyMiddleware(thunk));
const dispatch = type => store.dispatch(type);

const AppRout = createStackNavigator(
  {
    First: {
      screen: SplashScreen
    },
    AuthLogin: {
      screen: LoginV1
    },
    AuthSignUp: {
      screen: SignUp
    },
    Home: {
      screen: TabView
    },
    Welcome: {
      screen: Screens.WalkthroughScreen
    },
    PasswordRecover: {
      screen: Screens.PasswordRecovery
    },
    Erorr404: {
      screen: Erorr404
    }
  },
  {
    headerMode: "none"
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: AppRout
    },
    RegistrationModal: {
      screen: Profile
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default class App extends React.Component {
  state = {
    isLoaded: false,
    isReg: true,
    dataType: "offline",
    socket: null,
    MainMenuList: new Animated.Value(0),
    DisplayModle: false,
    Topbar: {},
    dataSet: {
      theme: null,
      user: null,
      lang: null
    },
    errors: {
      theme: null,
      user: null,
      lang: null
    }
  };

  componentWillMount() {
    //   var myLat = -15.3896587;
    //   var myLon = 28.3584728;
    //   // var myApiKey = "AIzaSyDJ94tzH3AdScySNesjtB2iizOc-GPweVg";
    //   fetch(
    //     "https://nominatim.openstreetmap.org/search/jack/lusaka?format=json&addressdetails=1&limit=1&polygon_svg=1"
    //   )
    //     .then(response => response.json())
    //     .then(responseJson => {
    //       console.log(
    //         "ADDRESS GEOCODE is BACK!! => " + JSON.stringify(responseJson)
    //       );
    //     });
    this.loadAssets();
    store.subscribe(() => {
      this.setState({
        Topbar: store.getState().TopBar
      });
    });
  }

  handleConnectionChange = isConnected => {
    this.setState({ DisplayModle: isConnected });
  };

  loadAssets = async () => {
    await Font.loadAsync({
      fontawesome: require("./app/assets/fonts/fontawesome.ttf"),
      icomoon: require("./app/assets/fonts/icomoon.ttf"),
      "Righteous-Regular": require("./app/assets/fonts/Righteous-Regular.ttf"),
      "Roboto-Bold": require("./app/assets/fonts/Roboto-Bold.ttf"),
      "Roboto-Medium": require("./app/assets/fonts/Roboto-Medium.ttf"),
      "Roboto-Regular": require("./app/assets/fonts/Roboto-Regular.ttf"),
      "Roboto-Light": require("./app/assets/fonts/Roboto-Light.ttf")
    });

    data.getTheme("theme", value => {
      if (!value) {
        data.setTheme("theme", "light", callback => {
          if (!callback) {
            this.setState({
              errors: {
                ...this.state.data,
                theme: "error"
              },
              dataSet: {
                ...this.state.dataSet,
                theme: "light"
              }
            });
          }
          this.setState({
            errors: {
              ...this.state.data,
              theme: null
            },
            dataSet: {
              ...this.state.dataSet,
              theme: "light"
            }
          });
        });
      } else {
        this.setState({
          dataSet: {
            ...this.state.dataSet,
            theme: value
          }
        });
      }

      this.setState({ isReg: true, isLoaded: true });
    });
  };

  HandleOpenModel = () => {
    Animated.spring(this.state.MainMenuList, {
      toValue: 0
    }).start();
    this.setState({ DisplayModle: true });
  };

  HandleCloseModel = () => {
    Animated.spring(this.state.MainMenuList, {
      toValue: 650
    }).start();
    setTimeout(() => {
      this.setState({ DisplayModle: false });
    }, 300);
  };

  renderLoading = () => <AppLoading />;

  renderApp = () => (
    <View style={{ flex: 1 }}>
      {this.state.Topbar.isShown ? (
        <View
          style={{
            width: "100%",
            height: 23.5,
            backgroundColor: this.state.Topbar.color
          }}
        />
      ) : null}
      {/* Main route */}
      <RootStack />
      {/* Modle */}
      {this.state.DisplayModle ? (
        <BlurView
          tint="dark"
          intensity={90}
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            zIndex: 16000,
            top: 0,
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.3)",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <Animated.View
            style={{
              width: "90%",
              height: "100%",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              paddingTop: 50,
              transform: [
                {
                  translateY: this.state.MainMenuList
                }
              ]
            }}
          >
            <View
              style={{
                width: "100%",
                height: 400,
                backgroundColor: "#fff",
                zIndex: 10,
                borderRadius: 10
              }}
            >
              <RkText>Server Error</RkText> 
            </View>
          </Animated.View>
        </BlurView>
      ) : null}
    </View>
  );

  render = () => (
    <Provider store={store}>
      {this.state.isLoaded ? <Profile/> : this.renderLoading()}
    </Provider>
  );
}
