import React from 'react';
import {
  View,
  Image,
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTheme,
} from 'react-native-ui-kitten';

export class Walkthrough1 extends React.Component {

  renderImage = () => (
    <Image source={require('../../assets/images/walkthough1.png')} />
  );

  render = () => (
    <View style={styles.screen}>
      {this.renderImage()}
      <RkText rkType='header2' style={styles.text}>Welcome to Chawanangwa Farms</RkText>
    </View>
  )
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.base,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    textAlign: 'center',
    marginHorizontal: 30,
    marginTop: 20,
  },
}));
