import React from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Animated,
  Dimensions,
  TextInput,
  TouchableOpacity
} from "react-native";
import {
  RkButton,
  RkText,
  RkStyleSheet,
  RkTheme
} from "react-native-ui-kitten";
import { GradientButton } from "../../components/";
import { scaleVertical } from "../../utils/scale";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { data } from "../../data";
import { StackActions, NavigationActions } from "react-navigation";
import PhoneInput from "react-native-phone-input";

const screenSize = Dimensions.get("window");

const width = screenSize.width;
const height = screenSize.height;

const ImageMoveUp = height / 2;
const InputMoveUp = height / 2 - 120;

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      y: new Animated.Value(0),
      yModal: new Animated.Value(ImageMoveUp),
      errorColor: "red",
      iconColor: "green",
      isModalOpen: false,
      isLoading: false,
      phoneErrorMsg: "",
      userTemp: {
        phone: "",
        email: "",
        password: "",
        ComfirmPass: "",
        isSingedin: false,
        img: "../../../assets/images/user-placeholder.png"
      },
      passErrorMsg: "",
      emailErrorMsg: "",
      errors: {
        phone: true,
        email: true,
        password: true,
        ComfirmPass: true
      }
    };
  }

  renderImage = () => (
    <Image
      style={styles.image}
      source={require("../../assets/images/logo.png")}
    />
  );

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

  validatePhone = number => {
    var numbers = /^[0-9]+$/;
    let num = number.replace(".", "");
    var sub = num.substr(1);

    if (!sub.match(numbers)) {
      this.setState({
        phoneErrorMsg: "Invalid phone number",
        errors: {
          ...this.state.errors,
          phone: false
        }
      });
      return false;
    } else if (sub.length === 12) {
      var p_number = "+" + sub;

      this.setState({
        userTemp: {
          ...this.state.userTemp,
          phone: p_number
        }
      });
      return true;
    } else {
      this.setState({
        phoneErrorMsg: "Invalid phone number 2",
        errors: {
          ...this.state.errors,
          phone: false
        }
      });
      return false;
    }
  };

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validatePassword = pass => {
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if (!pass.match(lowerCaseLetters)) {
      this.setState({
        passErrorMsg: "Must contain at least one lowercase letter",
        errors: {
          ...this.state.errors,
          password: false
        }
      });
      return false;
    } else if (!pass.match(upperCaseLetters)) {
      this.setState({
        passErrorMsg: "Must contain at least one uppercase case letter",
        errors: {
          ...this.state.errors,
          password: false
        }
      });

      return false;
    } else if (!pass.match(numbers)) {
      this.setState({
        passErrorMsg: "Must contain at least one number",
        errors: {
          ...this.state.errors,
          password: false
        }
      });

      return false;
    } else if (pass.length <= 7) {
      this.setState({
        passErrorMsg: "Must be at least 8 or more characters",
        errors: {
          ...this.state.errors,
          password: false
        }
      });
      return false;
    } else {
      return true;
    }
  };

  onSignUpButtonPressed = () => {
    if (!this.state.userTemp.phone) {
      this.setState({
        phoneErrorMsg: "Phone number is required",
        errors: {
          ...this.state.errors,
          phone: false
        }
      });
    } else if (!this.validatePhone(this.state.userTemp.phone)) {
    } else if (!this.validateEmail(this.state.userTemp.email)) {
      this.setState({
        emailErrorMsg: "Invalid email",
        errors: {
          ...this.state.errors,
          email: false
        }
      });
    } else if (!this.state.userTemp.email) {
      this.setState({
        emailErrorMsg: "Email is required",
        errors: {
          ...this.state.errors,
          email: false
        }
      });
    } else if (!this.state.userTemp.password) {
      this.setState({
        passErrorMsg: "Password is required",
        errors: {
          ...this.state.errors,
          password: false
        }
      });
    } else if (!this.validatePassword(this.state.userTemp.password)) {
    } else if (
      this.state.userTemp.password !== this.state.userTemp.ComfirmPass
    ) {
      this.setState({
        errors: {
          ...this.state.errors,
          ComfirmPass: false
        }
      });
    } else {
      this.setState({ isSingedin: true, isModalOpen: true });
      this.openModal();

      this.props.AppSocktId.socket.emit(
        "USER_REGSTRATION",
        this.state.userTemp
      );

      this.props.AppSocktId.socket.on("USER_IS_REGSTARTED", callback => {
        if (callback.isRegistered) {
          data.setTempData("userTemp", JSON.stringify(callback), responce => {
            if (responce) {
              this.props.dispatchEvent({
                type: "UserConnceted",
                payload: callback
              });

              const toHome = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Home" })]
              });
              this.props.navigation.dispatch(toHome);
            } else {
              // console.log('else');
            }
          });
        } else {
        }
      });
    }
  };

  onSignInButtonPressed = () => {
    this.props.AppGlobalRoutes.naviget.compName === "signIn"
      ? this.props.navigation.goBack()
      : (this.props.navigation.navigate("AuthLogin"),
        this.props.dispatchEvent({
          type: "navigation",
          payload: { compName: "signUp", goTo: "signIn", goBack: "signUp" }
        }));
  };

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
      toValue: -100
    }).start();
  }

  _keyboardDidHide() {
    Animated.spring(this.state.y, {
      toValue: 0
    }).start();
  }

  render = () => (
    <KeyboardAvoidingView style={styles.screen} behavior="padding" enabled>
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
        <RkText rkType="h1">Registration</RkText>
      </Animated.View>
      <View style={styles.content}>
        <View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View
              style={[
                styles.input,
                {
                  marginBottom: 10,
                  borderColor: this.state.errors.phone
                    ? RkTheme.current.colors.screen.borderColor
                    : this.state.errorColor
                }
              ]}
            >
              <PhoneInput
                ref="phone"
                style={{
                  width: "90%"
                }}
                initialCountry="zm"
                allowZeroAfterCountryCode={false}
                onChangePhoneNumber={number => {
                  console.log(number);

                  this.setState({
                    userTemp: {
                      ...this.state.userTemp,
                      phone: number
                    },
                    errors: {
                      ...this.state.errors,
                      phone: true
                    }
                  });
                }}
                textProps={{
                  placeholder: "Telephone number"
                }}
              />
            </View>
            {this.state.errors.phone ? null : (
              <RkText rkType="danger primary3">
                {this.state.phoneErrorMsg}
              </RkText>
            )}
          </View>

          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View
              style={[
                styles.input,
                {
                  marginBottom: 10,
                  borderColor: this.state.errors.email
                    ? RkTheme.current.colors.screen.borderColor
                    : this.state.errorColor
                }
              ]}
            >
              <MaterialIcons
                style={styles.InputIcon}
                name="mail-outline"
                size={38}
                color={
                  this.state.errors.email
                    ? this.state.iconColor
                    : this.state.errorColor
                }
              />
              <TextInput
                placeholder="Email Address"
                keyboardType="email-address"
                onChangeText={text =>
                  this.setState({
                    userTemp: {
                      ...this.state.userTemp,
                      email: text
                    },
                    errors: {
                      ...this.state.errors,
                      email: true
                    }
                  })
                }
                style={styles.textInput}
                underlineColorAndroid="transparent"
              />
            </View>
            {this.state.errors.email ? null : (
              <RkText rkType="danger primary3">
                {this.state.emailErrorMsg}
              </RkText>
            )}
          </View>

          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View
              style={[
                styles.input,
                {
                  marginBottom: 10,
                  borderColor: this.state.errors.password
                    ? RkTheme.current.colors.screen.borderColor
                    : this.state.errorColor
                }
              ]}
            >
              <MaterialIcons
                style={styles.InputIcon}
                name="lock-outline"
                size={38}
                color={
                  this.state.errors.password
                    ? this.state.iconColor
                    : this.state.errorColor
                }
              />
              <TextInput
                placeholder="New Password"
                onChangeText={text =>
                  this.setState({
                    userTemp: { ...this.state.userTemp, password: text },
                    errors: {
                      ...this.state.errors,
                      password: true
                    }
                  })
                }
                secureTextEntry={true}
                style={styles.textInput}
                underlineColorAndroid="transparent"
              />
            </View>
            {this.state.errors.password ? null : (
              <RkText rkType="danger primary3">
                {this.state.passErrorMsg}
              </RkText>
            )}
          </View>

          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View
              style={[
                styles.input,
                {
                  marginBottom: 10,
                  borderColor: this.state.errors.ComfirmPass
                    ? RkTheme.current.colors.screen.borderColor
                    : this.state.errorColor
                }
              ]}
            >
              <MaterialIcons
                style={styles.InputIcon}
                name="lock"
                size={38}
                color={
                  this.state.errors.ComfirmPass
                    ? this.state.iconColor
                    : this.state.errorColor
                }
              />
              <TextInput
                placeholder="Comfirm Password"
                secureTextEntry={true}
                onChangeText={text =>
                  this.setState({
                    userTemp: { ...this.state.userTemp, ComfirmPass: text },
                    errors: {
                      ...this.state.errors,
                      ComfirmPass: true
                    }
                  })
                }
                style={styles.textInput}
                underlineColorAndroid="transparent"
              />
            </View>
            {this.state.errors.ComfirmPass ? null : (
              <RkText rkType="danger primary3">Password did not match</RkText>
            )}
          </View>

          <GradientButton
            style={styles.save}
            rkType="large"
            text="CONTINUE"
            onPress={() => {
              this.props.navigation.navigate("RegistrationModal");
            }}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.textRow}>
            <RkText rkType="primary3">Already have an account?</RkText>
            <RkButton rkType="clear" onPress={this.onSignInButtonPressed}>
              <RkText rkType="header6">Sign in now</RkText>
            </RkButton>
          </View>
        </View>
      </View>
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
            <RkText>Enter varification number sent in sms</RkText>
            <TextInput
              placeholder="Valification number"
              keyboardType="numeric"
              onChangeText={text => {}}
              style={styles.textInput}
              underlineColorAndroid="transparent"
            />
            <GradientButton
              style={styles.save}
              rkType="large"
              onPress={() => {
                this.props.navigation.navigate("RegistrationModal");
              }}
              text="Continue "
            />
            <RkButton onPress={this.closeModal}>Cancel</RkButton>
          </View>
        )}
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    padding: 5,
    justifyContent: "space-around",
    backgroundColor: theme.colors.screen.base
  },
  inputs: {
    backgroundColor: theme.colors.screen.base
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
    paddingLeft: 5,
    paddingRight: 5
  },
  image: {
    marginBottom: 5,
    height: scaleVertical(77),
    resizeMode: "contain"
  },
  content: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  save: {
    marginVertical: 20
  },
  buttons: {
    flexDirection: "row",
    marginBottom: 24,
    marginHorizontal: 24,
    justifyContent: "space-around"
  },
  footer: {
    justifyContent: "flex-end"
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "center"
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
)(SignUp);
