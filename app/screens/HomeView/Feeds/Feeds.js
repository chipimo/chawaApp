import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

 class Feeds extends React.Component {
 

  render() {
    return (
      <View>
        <Text> Feeds </Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Feeds)
