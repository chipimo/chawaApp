import React from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Toolbar, ListItem } from "react-native-material-ui";
import Avatar from "react-native-badge-avatar";
import {
  RkText,
  RkButton,
  RkStyleSheet,
  RkSwitch
} from "react-native-ui-kitten";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import { StackActions, NavigationActions } from "react-navigation";

class Settings extends React.Component {
  state = {
    modal: false,
    users: [],
    light: true,
    dark: false
  };

  onSwitchValueChange = (value, type) => {
    if (type === "light") {
      this.setState({ light: true, dark: false });
    } else {
      this.setState({ light: false, dark: true });
    }
  };

  logOut = () => {
    const toLogin = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "AuthLogin" })]
    });
    this.props.navigation.dispatch(toLogin);
  };

  render() {
    return (
      <View style={styles.content}>
        <Toolbar
          leftElement={
            <Avatar
              size={50}
              style={{ margin: 6 }}
              placeholder={require("../../../assets/images/user-placeholder.png")}
              onPress={() =>
                this.setState({
                  modal: true
                })
              }
            />
          }
          centerElement={
            <View>
              <RkText style={{ color: "#FBFBFB" }} rkType="header6">
                {this.props.User.user.user_name}
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
          rightElement={
            <MaterialIcons name="settings" size={38} color="#E4E5E5" />
          }
          style={{
            container: {
              backgroundColor: "#02C2AF"
            },

            leftElementContainer: {
              marginTop: 2
            }
          }}
        />

        <View>
          <ScrollView
            style={{
              padding: 10,
              marginBottom: 55
            }}
          >
            <View
              style={{
                paddingBottom: 20
              }}
            >
              <View
                style={{
                  borderColor: "transparent",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderBottomColor: "#AFB1B1",
                  marginBottom: 10,
                  paddingBottom: 10,
                  backgroundColor: "#fff",
                  borderRadius: 5
                }}
              >
                <View style={{}}>
                  <RkText
                    style={{
                      color: "#AFB1B1",
                      paddingLeft: 5,
                      paddingTop: 4
                    }}
                  >
                    Profile settings
                  </RkText>
                </View>
                <View
                  style={{
                    marginLeft: 10
                  }}
                >
                  <ListItem
                    divider
                    leftElement={
                      <MaterialIcons
                        name="add-shopping-cart"
                        size={30}
                        color="#56D6C9"
                      />
                    }
                    centerElement={{
                      primaryText: "Subscription"
                    }}
                    onPress={() => {}}
                  />
                  <ListItem
                    divider
                    leftElement={
                      <MaterialIcons
                        name="lock-open"
                        size={30}
                        color="#56D6C9"
                      />
                    }
                    centerElement={{
                      primaryText: "Change password"
                    }}
                    onPress={() => {}}
                  />
                  <ListItem
                    divider
                    leftElement={
                      <MaterialIcons name="person" size={30} color="#56D6C9" />
                    }
                    centerElement={{
                      primaryText: "Profile pictuer"
                    }}
                    onPress={() => {}}
                  />
                  <ListItem
                    divider
                    leftElement={
                      <MaterialIcons name="person" size={30} color="#56D6C9" />
                    }
                    centerElement={{
                      primaryText: "User name"
                    }}
                    onPress={() => {}}
                  />
                </View>
              </View>

              <View
                style={{
                  borderColor: "transparent",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderBottomColor: "#AFB1B1",
                  marginBottom: 10,
                  paddingBottom: 10,
                  backgroundColor: "#fff",
                  borderRadius: 5
                }}
              >
                <View style={{}}>
                  <RkText
                    style={{
                      color: "#AFB1B1",
                      paddingLeft: 5,
                      paddingTop: 4
                    }}
                  >
                    Themes
                  </RkText>
                </View>
                <View
                  style={{
                    marginLeft: 10
                  }}
                >
                  <ListItem
                    divider
                    leftElement={
                      <MaterialIcons
                        name="color-lens"
                        size={30}
                        color="#56D6C9"
                      />
                    }
                    centerElement={{
                      primaryText: "Light theme"
                    }}
                    rightElement={
                      <RkSwitch
                        value={this.state.light}
                        onValueChange={value =>
                          this.onSwitchValueChange(value, "light")
                        }
                      />
                    }
                    onPress={() => {}}
                  />
                  <ListItem
                    divider
                    leftElement={
                      <MaterialIcons
                        name="color-lens"
                        size={30}
                        color="#4B5252"
                      />
                    }
                    centerElement={{
                      primaryText: "Dark theme"
                    }}
                    rightElement={
                      <RkSwitch
                        value={this.state.dark}
                        onValueChange={value =>
                          this.onSwitchValueChange(value, "dark")
                        }
                      />
                    }
                    onPress={() => {}}
                  />
                </View>
              </View>

              <View
                style={{
                  borderColor: "transparent",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderBottomColor: "#AFB1B1",
                  marginBottom: 10,
                  paddingBottom: 10,
                  backgroundColor: "#fff",
                  borderRadius: 5
                }}
              >
                <View style={{}}>
                  <RkText
                    style={{
                      color: "#AFB1B1",
                      paddingLeft: 5,
                      paddingTop: 4
                    }}
                  >
                    Support
                  </RkText>
                </View>
                <View
                  style={{
                    marginLeft: 10
                  }}
                >
                  <ListItem
                    divider
                    leftElement={
                      <MaterialIcons name="help" size={30} color="#56D6C9" />
                    }
                    centerElement={{
                      primaryText: "Help"
                    }}
                    onPress={() => {}}
                  />
                  <ListItem
                    divider
                    leftElement={
                      <MaterialIcons
                        name="assignment"
                        size={30}
                        color="#4B5252"
                      />
                    }
                    centerElement={{
                      primaryText: "Privacy ploicy"
                    }}
                    onPress={() => {}}
                  />
                  <ListItem
                    divider
                    leftElement={
                      <MaterialIcons name="class" size={30} color="#4B5252" />
                    }
                    centerElement={{
                      primaryText: "Terms and Conditions"
                    }}
                    onPress={() => {}}
                  />
                  <ListItem
                    divider
                    leftElement={
                      <MaterialIcons
                        name="power-settings-new"
                        size={30}
                        color="red"
                      />
                    }
                    centerElement={{
                      primaryText: "Logout"
                    }}
                    onPress={this.logOut}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <Modal isVisible={this.state.modal}>
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <RkText>I am the modal content!</RkText>
          </View>
          <RkButton onPress={() => this.setState({ modal: false })}>
            Close
          </RkButton>
        </Modal>
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  content: {
    flex: 1,
    backgroundColor: "#E4E5E5"
  }
}));

function mapStateToProps(state) {
  return {
    AppGlobalRoutes: state.AppGlobalRoutes,
    AppSocktId: state.AppSocktId,
    User: state.User
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
)(Settings);
