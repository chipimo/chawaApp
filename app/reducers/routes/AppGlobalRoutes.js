const AppGlobalRoutesReducer = (state = { naviget: { compName: null, goTo: null, goBack: null } }, action) => {
    switch (action.type) {
        case "navigation":
            state = { ...state, naviget: action.payload }
            break
    }
    return state;
}

export default AppGlobalRoutesReducer;