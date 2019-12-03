const UserDataReducer = (state = { state: false, user: null }, action) => {
  switch (action.type) {
    case "UserInfo":
      state = { ...state, state: true, user: action.payload };
      break;
    case "UserErr":
      state = { ...state, state: false, user: null };
      break;
  }
  return state;
};

export default UserDataReducer;
