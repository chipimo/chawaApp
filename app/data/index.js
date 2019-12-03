import _ from 'lodash';
import retrieveData from './getData/get';
import storeData from './storeData/store';

class DataProvider {
  getTheme(value,callback) {
    retrieveData(value, value => {
      return callback(value)
    })
  }

  getUser(id, callback) {
    retrieveData(id, value => { 
      return callback(value)
    })
  }
  
  getLang(id) {
    retrieveData(id, value => {
      return callback(value)
    })
  }
  
  setTheme(id, value, callback) {
    storeData(id, value, responce => {
      callback(responce)
    })
  }

  setUser(id, value, callback) {
    storeData(id, value, responce => {
      callback(responce)
    })
  }

  setLang(type, value, callback) {
    storeData(type, value, responce => {
      callback(responce)
    })
  }

  setTempData(type, value, callback) {
    storeData(type, value, responce => {
      callback(responce)
    })
  }

  
}

export const data = new DataProvider();
