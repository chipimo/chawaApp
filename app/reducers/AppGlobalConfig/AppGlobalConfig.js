const AppGlobalReducer = (state = { theme: 'AppTheme' }, action) => {
    switch (action.type) {
        case "SocketConnected": 
        state = { ...state, socket: action.payload }
        break
        case "SocketDisconnceted":
        state = { ...state, socket: null }
        break
    }
    return state;
}

export default AppGlobalReducer;