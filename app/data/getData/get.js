import { AsyncStorage } from 'react-native';

const retrieveData = async (TASKS, callback) => {
    try {
        const value = await AsyncStorage.getItem(TASKS);
        if (value !== null) {
            return callback(value)
        }
        return callback(false)
    } catch (error) {
        return callback(error)
    }
};

export default retrieveData