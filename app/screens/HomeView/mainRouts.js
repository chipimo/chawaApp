import React from "react";
import { View, StatusBar } from "react-native";
import { connect } from "react-redux";
import { BottomNavigation } from "react-native-material-ui";
import { TabNavigator } from "react-navigation";
import Feeds from "./Feeds/Feeds";
import Store from "./store/Store";
import Chat from "./chat/Chat";
import Settings from "./settings/Settings";

export const TabView = TabNavigator(
  {
    Store: {
      screen: Store,
      navigationOptions: {
        tabBarLabel: "Store"
      }
    },
    Feeds: {
      screen: Feeds,
      navigationOptions: {
        tabBarLabel: "Feeds"
      }
    },
    Chat: {
      screen: Chat,
      navigationOptions: {
        tabBarLabel: "Chat"
      }
    },

    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: "Settings"
      }
    }
  },
  {
    animationEnabled: true,
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        <View>
          <BottomNavigation
            active={"tab" + props.navigationState.index}
            hidden={false}
            style={{
              active: {
                color: "#02C2AF"
              }
            }}
          >
            <BottomNavigation.Action
              key="tab0"
              icon="ondemand-video"
              label="Store"
              onPress={() => {
                props.navigation.navigate("Store");
              }}
            />
            <BottomNavigation.Action
              key="tab1"
              icon="queue-music"
              label="Feeds"
              onPress={() => {
                props.navigation.navigate("Feeds");
              }}
            />
            <BottomNavigation.Action
              key="tab2"
              icon="file-download"
              label="Chat"
              onPress={() => {
                props.navigation.navigate("Chat");
              }}
            />
            <BottomNavigation.Action
              key="tab3"
              icon="account-circle"
              label="Settings"
              onPress={() => {
                props.navigation.navigate("Settings");
              }}
            />
          </BottomNavigation>
        </View>
      );
    },
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: "red"
      },
      labelStyle: {
        margin: 0
      },
      iconStyle: {
        color: "#3b3b3b"
      },
      scrollEnabled: true,
      showIcon: true,
      showLabel: false,
      style: {
        display: "none",
        paddingTop: 0,
        height: 50,
        backgroundColor: "#787A7C"
      }
    }
  }
);

class MainRouts extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    StatusBar.setHidden(false, "slide");
    StatusBar.setBarStyle("light-content", true);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ width: "100%", height: 23.5, backgroundColor: "#01B19E" }}
        />
        <TabView />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainRouts);
