import {AsyncStorage} from 'react-native'

const storeData = async (key, value, callback) => {
    try {
      await AsyncStorage.setItem(key, value);
      callback(true)
    } catch (error) {
      
      callback(false)      
    }
  };

  export default storeData