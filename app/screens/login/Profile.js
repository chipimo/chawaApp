import React from "react";
import { View, Animated, ScrollView, Text, Image } from "react-native";
import { connect } from "react-redux";
import { LinearGradient } from "expo";
import { RkStyleSheet, RkText, RkButton } from "react-native-ui-kitten";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Avatar from "react-native-badge-avatar";
import { Toolbar, ListItem } from "react-native-material-ui";
import ParallaxScrollView from "react-native-parallax-scrollview";

class Profile extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    scrollY: new Animated.Value(0)
  };
  componentWillMount() {
    // this._getLocationAsync();
    this.props.dispatchEvent({
      type: "show",
      payload: {
        color: "#FC7A69"
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatchEvent({
      type: "hide",
      payload: {
        color: "#FC7A69"
      }
    });
  }

  render() {
    return (
      <View style={styles.screen}>
        <ParallaxScrollView
          windowHeight={200}
          backgroundSource="http://i.imgur.com/s4JEY9E.jpg"
          navBarTitle="Custom Title"
          navBarTitleColor="black"
          navBarColor="white"
          headerView={
            <Toolbar
              leftElement="navigate-before"
              centerElement={
                <View>
                  <RkText style={{ color: "#FBFBFB" }} rkType="header6">
                    Melvin chama chipimo
                  </RkText>
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <View
                      style={{
                        marginTop: 7,
                        borderRadius: 50,
                        width: 10,
                        height: 10,
                        backgroundColor: "#9F4A4A"
                      }}
                    />
                    <RkText
                      style={{ marginLeft: 10, color: "#E2E2E2" }}
                      rkType="primary3"
                    >
                      non-subscriber
                    </RkText>
                  </View>
                </View>
              }
              rightElement={[
                <Avatar
                  size={50}
                  style={{ margin: 6 }}
                  placeholder={require("../../assets/images/user-placeholder.png")}
                  onPress={() =>
                    this.setState({
                      modal: true
                    })
                  }
                />,
                {
                  menu: {
                    icon: "more-vert",
                    labels: [
                      "Theme",
                      "Help",
                      "Terms and Conditions",
                      "Privacy ploicy"
                    ]
                  }
                }
              ]}
              style={{
                container: {
                  backgroundColor: "#02C2AF"
                },

                leftElementContainer: {
                  marginTop: 2
                }
              }}
            />
          }
          leftIcon={{
            name: "rocket",
            color: "rgba(228, 117, 125, 1)",
            size: 30,
            type: "font-awesome"
          }}
          leftIconOnPress={() =>
            this.setState({ index: (this.state.index + 1) % 3 })
          }
          rightIcon={{
            name: "user",
            color: "rgba(228, 117, 125, 1)",
            size: 30,
            type: "font-awesome"
          }}
          rightIconOnPress={() =>
            this.setState({ index: (this.state.index + 1) % 3 })
          }
        >
          <ScrollView
            style={{ flex: 1, backgroundColor: "rgba(228, 117, 125, 1)" }}
          >
            <View
              style={{
                height: 300,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 32, color: "white" }}>Custom view</Text>
            </View>
            <View
              style={{
                height: 300,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 32, color: "white" }}>keep going.</Text>
            </View>
            <View
              style={{
                height: 300,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 32, color: "white" }}>keep going..</Text>
            </View>
            <View
              style={{
                height: 300,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 32, color: "white" }}>
                keep going...
              </Text>
            </View>
            <View
              style={{
                height: 300,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 32, color: "white" }}>the end! :)</Text>
            </View>
          </ScrollView>
        </ParallaxScrollView>
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
  imageContener: {
    flex: 1
  },
  Contents: {
    flex: 3
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    position: "absolute",
    top: 23.5,
    left: 0,
    right: 0,
    backgroundColor: "#03A9F4",
    overflow: "hidden"
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: 18
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT
  }
}));

function mapStateToProps(state) {
  return {
    AppGlobalRoutes: state.AppGlobalRoutes,
    AppSocktId: state.AppSocktId,
    User: state.User,
    UserData: state.UserData
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
)(Profile);
