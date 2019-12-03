import React from 'react';
import {
  View,
  Image,
  Keyboard,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';
import {
  RkStyleSheet,
  RkText,
  RkTheme
} from 'react-native-ui-kitten';
import { GradientButton } from '../../components/';
import { scaleVertical } from '../../utils/scale';
import NavigationType from '../../config/navigation/propTypes';
import { MaterialIcons } from '@expo/vector-icons';
import { Toolbar } from 'react-native-material-ui';

const screenSize = Dimensions.get('window');

export class PasswordRecovery extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    header: null,
  };

  onSendButtonPressed = () => {

  };

  onBackButtonPressed = () => {
    this.props.navigation.goBack();
  };

  // getThemeImageSource = (theme) => (
  //   theme.name === 'light' ?
  //     require('../../assets/images/logo.png') : require('../../assets/images/logoDark.png')
  // );

  renderImage = () => (
    <Image style={styles.image} source={require('../../assets/images/logo.png')} />
  );

  render = () => (
    <KeyboardAvoidingView style={styles.screen} behavior="padding" enabled>
      <View style={{ marginTop: 24 }}>
        <Toolbar
          leftElement="navigate-before"
          centerElement="Recovery"
          onLeftElementPress={() => {
            this.onBackButtonPressed();
          }}
          style={{
            container: { backgroundColor: RkTheme.current.colors.screen.base, },
            titleText: { color: RkTheme.current.colors.text.secondary },
            leftElement: { color: RkTheme.current.colors.text.secondary } 
          }}
        />
      </View>

      <View style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: scaleVertical(24),
        justifyContent: 'space-between'
      }}>

        <View style={styles.header}>
          {this.renderImage()}
          <RkText rkType='h1'>Password Recovery</RkText>
        </View>
        <View style={styles.content}>
          <View style={styles.input}>
            <MaterialIcons
              style={styles.InputIcon}
              name="email"
              size={32}
              color="green" />
            <TextInput
              placeholder="Email"
              style={[styles.textInput, { paddingLeft: 5, }]}
              underlineColorAndroid="transparent"
            />
          </View>
          <RkText rkType='secondary5 secondaryColor center'>
            Enter your email below to receive your password reset instructions
        </RkText>
        </View>
        <View style={{ paddingBottom: 20 }}>
          <GradientButton
            style={styles.save}
            rkType='large'
            text='SEND'
            onPress={this.onSendButtonPressed}
          />
        </View>
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.screen.base,
  },
  header: {
    alignItems: 'center',
  },
  image: {
    marginVertical: scaleVertical(27),
    height: scaleVertical(77),
    resizeMode: 'contain',
  },
  content: {
    alignItems: 'center',
  },
  input: {
    width: screenSize.width - 50,
    height: 50,
    borderRadius: 30,
    borderColor: theme.colors.screen.borderColor,
    borderWidth: 1,
    borderStyle: 'solid',
    paddingLeft: 10,
    flexDirection: 'row',

  },
  textInput: {
    height: 50,
    width: '80%',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginLeft: 10,
  },
  InputIcon: {
    marginTop: 5,
  },
}));
