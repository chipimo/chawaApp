import React from 'react';
import {
  View,
  Image,
  Dimensions,
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTheme,
} from 'react-native-ui-kitten';

export class Walkthrough2 extends React.Component {

  renderImage = () => (
    <Image
      style={{ width: Dimensions.get('window').width }}
      source={require('../../assets/images/walkthough.png')}
    />
  );

  render = () => (
    <View style={styles.screen}>
      {this.renderImage()} 
      <RkText rkType='header2' style={styles.text}>We meet customer needs and deliver</RkText>
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
    marginTop: 20,
    marginHorizontal: 30,
  },
}));
