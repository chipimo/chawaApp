import React from "react";
import { StyleSheet, Image, View, Dimensions, StatusBar } from "react-native";
import { RkText, RkTheme, RkStyleSheet } from "react-native-ui-kitten";
import { StackActions, NavigationActions } from "react-navigation";
import { ProgressBar } from "../../components";
import { AppTheme } from "../../config/theme";
import { scale, scaleVertical } from "../../utils/scale";
import NavigationType from "../../config/navigation/propTypes";
import { data } from "../../data";
import { BASE_URL } from "../../types";
import { connect } from "react-redux";

window.navigator.userAgent = "react-native";
import io from "socket.io-client/dist/socket.io";

const delay = 500;

var isServerConn = false;

class SplashScreen extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired
  };
  state = {
    progress: 0
  };

  initiSockt = () => {
    if (isServerConn) {
      this.setState({ dataType: "online" });
      data.getUser("userTemp", Usercallback => { 
        if (!Usercallback) {
          StatusBar.setHidden(false, "slide");
          const toWelcome = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Welcome" })]
          });
          this.props.navigation.dispatch(toWelcome);
        } else {
          StatusBar.setHidden(false, "slide");

          const toHome = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "AuthLogin" })]
          });

          this.props.dispatchEvent({
            type: "UserConnceted",
            payload: JSON.parse(Usercallback)
          });

          this.props.navigation.dispatch(toHome);
        }
      });
    } else {
      const to404Erorr = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Erorr404" })]
      });
      this.props.navigation.dispatch(to404Erorr);
    }
  };

  componentWillMount() {
    const socket = io(BASE_URL, { jsonp: false });

    socket.on("connect", () => {
      this.props.dispatchEvent({ type: "SocketConnected", payload: socket });
      isServerConn = true;
    });

    socket.on("disconnect", () => {
      this.props.dispatchEvent({ type: "SocketDisconnceted", payload: null });
    });

  }

  componentDidMount() {
    StatusBar.setHidden(true, "none");
    // RkTheme.setTheme(DarkKittenTheme);
    this.timer = setInterval(this.updateProgress, delay);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getThemeImageSource = theme =>
    theme.name === "light"
      ? require("../../assets/images/splashBack.png")
      : require("../../assets/images/splashDark.png");

  updateProgress = () => {
    if (this.state.progress === 1) {
      clearInterval(this.timer);
      setTimeout(this.onLoaded, delay);
    } else {
      const randProgress = this.state.progress + Math.random() * 0.1;
      this.setState({ progress: randProgress > 1 ? 1 : randProgress });
    }
  };

  onLoaded = () => {
    this.initiSockt();
  };

  render = () => (
    <View style={styles.container}>
      <View>
        <Image
          style={[styles.image, { width: Dimensions.get("window").width }]}
          source={this.getThemeImageSource(RkTheme.current)}
        />
        <View style={styles.text}>
          <RkText rkType="light" style={styles.hero}>
            Fresh Foods
          </RkText>
          <RkText rkType="logo" style={styles.appName}>
            Better
          </RkText>
        </View>
      </View>
      <ProgressBar
        color={RkTheme.current.colors.accent}
        style={styles.progress}
        progress={this.state.progress}
        width={scale(320)}
      />
    </View>
  );
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.base,
    justifyContent: "space-between",
    flex: 1
  },
  image: {
    resizeMode: "cover",
    height: scaleVertical(430)
  },
  text: {
    alignItems: "center"
  },
  hero: {
    fontSize: 37
  },
  appName: {
    fontSize: 62
  },
  progress: {
    alignSelf: "center",
    marginBottom: 35,
    backgroundColor: theme.colors.screen.base
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
)(SplashScreen);
