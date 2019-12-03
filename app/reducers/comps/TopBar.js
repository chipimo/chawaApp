const TopBarReducer = (
  state = { isShown: false, color: "#01B19E" },
  action
) => {
  switch (action.type) {
    case "show":
      state = { ...state, isShown: true, color: action.payload.color };
      break;
    case "hide":
      state = { ...state, isShown: false, color: action.payload.color };
      break;
    case "changeColor":
      state = { ...state, isShown: true, color: action.payload.color };
      break;
  }
  return state;
};

export default TopBarReducer;
