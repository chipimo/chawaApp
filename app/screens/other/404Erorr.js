import React from "react";
import { View, Image } from "react-native";
import { connect } from "react-redux";
import {
  RkButton,
  RkText,
  RkStyleSheet,
  RkTheme
} from "react-native-ui-kitten";
import { BASE_URL } from "../../types";
import { StackActions, NavigationActions } from "react-navigation";
import { data } from "../../data";

window.navigator.userAgent = "react-native";
import io from "socket.io-client/dist/socket.io";

class Erorr404 extends React.Component {
  state = {
    isLoading: false,
    failed: false,
    isConn: false
  };

  getThemeImageSource = theme =>
    theme.name === "light"
      ? require("../../assets/images/Server.png")
      : require("../../assets/images/walkthoughDark.png");

  init = callback => {
    const socket = io(BASE_URL, { jsonp: false });

    socket.on("connect", () => {
      this.props.dispatchEvent({ type: "SocketConnected", payload: socket });
      callback(true);
      this.setState({ isConn: true });
    });

    socket.on("disconnect", () => {
      this.props.dispatchEvent({ type: "SocketDisconnceted", payload: null });
      callback(false);
    });
  };

  redirect = () => {
    this.init(callback => {
      data.getUser("userTemp", UserCallback => {
        if (UserCallback) {
          if (callback) {
            const toLogin = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "AuthLogin" })]
            });
            this.props.dispatchEvent({
              type: "UserConnceted",
              payload: JSON.parse(Usercallback)
            });
            
            this.props.navigation.dispatch(toLogin);
          }
        } else {
          if (callback) {
            const toWelcome = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "Welcome" })]
            });
            this.props.navigation.dispatch(toWelcome);
          }
        }
      });
    });
    if (!this.state.isConn) {
      setTimeout(() => {
        this.setState({
          isLoading: false,
          failed: true
        });
      }, 3000);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10
          }}
        >
          <RkText rkType="h4"> Server Connection Error </RkText>
          <RkText rkType="light">A temporary server error has ocurred.</RkText>
          <RkText rkType="light">Make sure your device is connected</RkText>
          <RkText rkType="light">to the internet and try again</RkText>
        </View>

        <Image
          style={{ width: 224, height: 136, marginTop: 20 }}
          source={this.getThemeImageSource(RkTheme.current)}
        />

        <View
          style={{
            marginTop: 8,
            marginBottom: 5
          }}
        >
          {this.state.isLoading ? (
            <View>
              <RkText>Connecting...</RkText>
            </View>
          ) : null}

          {this.state.failed ? (
            <View>
              <RkText>Faild to connect to server</RkText>
            </View>
          ) : null} 
        </View>

        <RkButton
          onPress={() => {
            this.redirect();
            this.setState({
              isLoading: true,
              failed: false
            });
          }}
          style={{ marginTop: 20 }}
          rkType="outline"
        >
          Retry
        </RkButton>
      </View>
      
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.base,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
}));

function mapStateToProps(state) {
  return {
    AppGlobalRoutes: state.AppGlobalRoutes,
    AppSocktId: state.AppSocktId
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchEvent: data => dispatch(data)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Erorr404);
