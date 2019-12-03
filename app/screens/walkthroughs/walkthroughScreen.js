import React from 'react';
import { View } from 'react-native';
import { RkStyleSheet } from 'react-native-ui-kitten';
import {
  GradientButton,
  PaginationIndicator,
} from '../../components/';
import { Walkthrough } from '../../components/walkthrough';
import { Walkthrough1 } from './walkthrough1';
import { Walkthrough2 } from './walkthrough2';
import {
  StackActions,
  NavigationActions,
} from 'react-navigation';

export class WalkthroughScreen extends React.Component {

  state = { 
    index: 0,
  };

  onWalkThroughIndexChanged = (index) => {
    this.setState({ index });
  };

  onStartButtonPressed = () => {
    const toLogin = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'AuthSignUp' })],
    });
    this.props.navigation.dispatch(toLogin);
  };

  render = () => (
    <View style={styles.screen}>
      <Walkthrough onChanged={this.onWalkThroughIndexChanged}>
        <Walkthrough1 />
        <Walkthrough2 />
      </Walkthrough>
      <PaginationIndicator length={2} current={this.state.index} />
      <GradientButton
        rkType='large'
        style={styles.button}
        text="GET STARTED"
        onPress={this.onStartButtonPressed}
      />
    </View>
  )
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.base,
    paddingVertical: 28,
    alignItems: 'center',
    flex: 1,
  },
  button: {
    marginTop: 25,
    marginHorizontal: 16,
  },
}));
