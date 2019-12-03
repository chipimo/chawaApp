import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { Toolbar } from "react-native-material-ui";

class Store extends React.Component {
  render() {
    return (
      <View>
        <Toolbar
          leftElement="menu"
          centerElement="Searchable"
          searchable={{
            autoFocus: true,
            placeholder: "Search"
          }}
          rightElement={{
            menu: {
              icon: "more-vert",
              labels: ["item 1", "item 2"]
            }
          }}
          onRightElementPress={label => {
            console.log(label);
          }}
          style={{
            container: {
              backgroundColor: "#02C2AF"
            },

            leftElementContainer: {
              marginTop: 2
            }
          }}
        />
        <Text> Store </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Store);
