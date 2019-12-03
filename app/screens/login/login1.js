import React from "react";
import {
  View,
  Image,
  Dimensions,
  Keyboard,
  TextInput,
  Animated,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import {
  RkButton,
  RkText,
  RkStyleSheet,
  RkTheme
} from "react-native-ui-kitten";
import { GradientButton } from "../../components/gradientButton";
import { scaleModerate, scaleVertical } from "../../utils/scale";
import NavigationType from "../../config/navigation/propTypes";
import { MaterialIcons, EvilIcons, Entypo } from "@expo/vector-icons";
import { connect } from "react-redux";
import { StackActions, NavigationActions } from "react-navigation";
import { Facebook } from "expo";

const screenSize = Dimensions.get("window");

const width = screenSize.width;
const height = screenSize.height;

const ImageMoveUp = height / 2;
const InputMoveUp = height / 2 - 120;


class LoginV1 extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired
  };
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props)
    this.asyncFunc = this.asyncFunc.bind(this)
  }

  state = {
    y: new Animated.Value(0),
    inputs: new Animated.Value(0),
    yModal: new Animated.Value(ImageMoveUp),
    value: false,
    errorColor: "red",
    iconColor: "green",
    usernameErrorMsg: "",
    passwordErrorMsg: "",
    isModalOpen: false,
    isLoading: true,
    userTemp: {
      username: "",
      password: ""
    },
    errors: {
      username: true,
      password: true
    }
  };

  async asyncFunc() {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync("269970757256483", {
        permissions: ["public_profile", "email"]
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        this.navigetTo()
        await fetch(
          `https://graph.facebook.com/v2.5/me?fields=email,name,picture.type(large)&access_token=${token}`
          )
          .then(response => response.json())
          .then(json => {
            // Souserme user object has been set up somewhere, build that user here
            this.props.dispatchEvent({
              type: "UserInfo",
              payload: json
            });
          });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  navigetTo = () => this.props.navigation.navigate("RegistrationModal");

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow.bind(this)
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide.bind(this)
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    Animated.spring(this.state.y, {
      toValue: -ImageMoveUp
    }).start();
    Animated.spring(this.state.inputs, {
      toValue: -InputMoveUp
    }).start();
  }

  _keyboardDidHide() {
    Animated.spring(this.state.y, {
      toValue: 0
    }).start();
    Animated.spring(this.state.inputs, {
      toValue: 0
    }).start();
  }

  openModal = () => {
    this.setState({
      isModalOpen: true
    });
    Animated.spring(this.state.yModal, {
      toValue: 0
    }).start();
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false
    });
    Animated.spring(this.state.yModal, {
      toValue: ImageMoveUp
    }).start();
  };

  getThemeImageSource = theme =>
    theme.name === "light"
      ? require("../../assets/images/walkthough.png")
      : require("../../assets/images/walkthoughDark.png");

  renderImage = () => {
    const imageSize = {
      width: screenSize.width,
      height: screenSize.height - scaleModerate(375, 1)
    };
    return (
      <Image
        style={[styles.image, imageSize]}
        source={this.getThemeImageSource(RkTheme.current)}
      />
    );
  };

  _LoginWithFB = () => {
    LoginManager.logInWithReadPermissions(["public_profile"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
              result.grantedPermissions.toString()
          );
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  };

  onLoginButtonPressed = () => {
    this.setState({
      isLoading: true
    });
    if (!this.state.userTemp.username) {
      this.setState({
        usernameErrorMsg: "User name is requred",
        errors: {
          ...this.state.errors,
          username: false
        }
      });
    } else if (!this.state.userTemp.password) {
      this.setState({
        passwordErrorMsg: "Password is requred",
        errors: {
          ...this.state.errors,
          password: false
        }
      });
    } else {
      Keyboard.dismiss();
      this.openModal();
      this.props.AppSocktId.socket.emit("VERIFY_USER", this.state.userTemp);
      this.props.AppSocktId.socket.on("USER_IS_VERIFYED", callback => {
        console.log(callback);
        this.closeModal();
        const toHome = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Home" })]
        });
        this.props.navigation.dispatch(toHome);
      });
      this.props.AppSocktId.socket.on("USER_NOT_VERIFYED", callback => {
        this.closeModal();
        this.setState({
          passwordErrorMsg: "Invalid Password",
          errors: {
            ...this.state.errors,
            password: false
          }
        });
      });
      this.props.AppSocktId.socket.on("USER_NOT_EXIST", callback => {
        this.setState({
          isLoading: false
        });
      });
    }
  };

  onPasswordRecoverPressed = () => {
    this.props.navigation.navigate("PasswordRecover");
  };

  onSignUpButtonPressed = () => {
    this.props.AppGlobalRoutes.naviget.compName === "signUp"
      ? this.props.navigation.goBack()
      : (this.props.navigation.navigate("AuthSignUp"),
        this.props.dispatchEvent({
          type: "navigation",
          payload: { compName: "signIn", goTo: "signUp", goBack: "signIn" }
        }));
  };

  render = () => (
    <View style={styles.screen}>
      <Animated.View
        style={{
          alignItems: "center",
          transform: [
            {
              translateY: this.state.y
            }
          ]
        }}
      >
        {this.renderImage()}
      </Animated.View>
      <Animated.View
        style={{
          alignItems: "center",
          flex: 1,
          padding: 10,
          paddingTop: 15,
          transform: [
            {
              translateY: this.state.inputs
            }
          ]
        }}
      >
        <RkText>Welcome</RkText>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10
          }}
        >
          <View
            style={[
              styles.input,
              {
                borderColor: this.state.errors.username
                  ? RkTheme.current.colors.screen.borderColor
                  : this.state.errorColor
              }
            ]}
          >
            <EvilIcons
              style={styles.InputIcon}
              name="user"
              size={42}
              color={
                this.state.errors.username
                  ? this.state.iconColor
                  : this.state.errorColor
              }
            />
            <TextInput
              placeholder="Phone number"
              style={styles.textInput}
              onChangeText={text =>
                this.setState({
                  userTemp: {
                    ...this.state.userTemp,
                    username: text
                  },
                  errors: {
                    ...this.state.errors,
                    username: true
                  }
                })
              }
              underlineColorAndroid="transparent"
            />
          </View>

          {this.state.errors.username ? null : (
            <RkText rkType="danger primary3">
              {this.state.usernameErrorMsg}
            </RkText>
          )}
        </View>

        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10
          }}
        >
          <View
            style={[
              styles.input,
              {
                borderColor: this.state.errors.password
                  ? RkTheme.current.colors.screen.borderColor
                  : this.state.errorColor
              }
            ]}
          >
            <MaterialIcons
              style={styles.InputIcon}
              name="lock-outline"
              size={32}
              color={
                this.state.errors.password
                  ? this.state.iconColor
                  : this.state.errorColor
              }
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={[styles.textInput, { paddingLeft: 5 }]}
              onChangeText={text =>
                this.setState({
                  userTemp: {
                    ...this.state.userTemp,
                    password: text
                  },
                  errors: {
                    ...this.state.errors,
                    password: true
                  }
                })
              }
              underlineColorAndroid="transparent"
            />
          </View>
          {this.state.errors.password ? null : (
            <RkText rkType="danger primary3">
              {this.state.passwordErrorMsg}
            </RkText>
          )}
        </View>

        <GradientButton
          style={styles.save}
          rkType="large"
          onPress={this.onLoginButtonPressed}
          text="LOGIN"
        />

        <View style={styles.buttons}>
          <RkButton
            rkType="clear"
            style={{
              flexDirection: "row",
              padding: 10
            }}
          >
            <Entypo
              name="facebook"
              size={15}
              color="#3578E5"
              style={{
                marginRight: 10
              }}
            />
            <RkText color="#3578E5" rkType="facebook" onPress={this.asyncFunc}>
              Continue with Facebook
            </RkText>
          </RkButton>
        </View>
        <View style={{ flex: 1, width: "100%", padding: 10 }}>
          <View style={{ marginBottom: 10, paddingTop: 10 }}>
            <View style={styles.textRow}>
              <RkButton rkType="clear">
                <RkText
                  rkType="header6"
                  onPress={this.onPasswordRecoverPressed}
                >
                  forgot password
                </RkText>
              </RkButton>
            </View>

            <View style={styles.textRow}>
              <RkText rkType="primary3">Don’t have an account? </RkText>
              <RkButton rkType="clear">
                <RkText rkType="header6" onPress={this.onSignUpButtonPressed}>
                  Sign up now
                </RkText>
              </RkButton>
            </View>
          </View>
        </View>
      </Animated.View>
      {this.state.isModalOpen ? (
        <TouchableOpacity
          style={{
            width: width,
            height: height,
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.6)"
          }}
          onPress={this.closeModal}
        />
      ) : null}

      <Animated.View
        style={{
          height: 200,
          width: "100%",
          position: "absolute",
          bottom: 0,
          backgroundColor: "#fff",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          transform: [
            {
              translateY: this.state.yModal
            }
          ]
        }}
      >
        {this.state.isLoading ? (
          <View>
            <ActivityIndicator size="large" color="#0000ff" />
            <RkText rkType="primary3">Loading</RkText>
          </View>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <RkText>Varification faild</RkText>
            <RkText rkType="primary3">This user doesnt exist</RkText>
            <RkText rkType="primary3 danger">
              {this.state.userTemp.username}
            </RkText>
            <GradientButton
              style={styles.save}
              rkType="large"
              onPress={this.onSignUpButtonPressed}
              text="Create Account"
            />
            <RkButton onPress={this.closeModal}>Cancel</RkButton>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.screen.base
  },
  image: {
    margin: 10,
    resizeMode: "cover",
    marginBottom: scaleVertical(10)
  },
  input: {
    width: screenSize.width - 50,
    height: 50,
    borderRadius: 30,
    borderColor: theme.colors.screen.borderColor,
    borderWidth: 1,
    borderStyle: "solid",
    paddingLeft: 10,
    flexDirection: "row"
  },
  textInput: {
    height: 50,
    width: "80%",
    backgroundColor: "transparent",
    borderColor: "transparent",
    marginLeft: 10
  },
  InputIcon: {
    marginTop: 5
  },
  textRow: {
    justifyContent: "center",
    flexDirection: "row"
  },
  save: {
    marginVertical: 9
  },
  buttons: {
    flexDirection: "row",
    marginTop: 10
  },
  button: {
    marginHorizontal: 14
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
)(LoginV1);
