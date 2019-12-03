import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { GiftedChat } from "react-native-gifted-chat";
import { Toolbar } from "react-native-material-ui";
import Avatar from "react-native-badge-avatar";
import { RkText } from "react-native-ui-kitten";

class Chat extends React.Component {
  state = {
    messages: []
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
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
                Melvin chipimo
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
          style={{
            container: {
              backgroundColor: "#02C2AF"
            },

            leftElementContainer: {
              marginTop: 2
            }
          }}
        />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
