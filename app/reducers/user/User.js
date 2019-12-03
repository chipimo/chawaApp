const UserReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case "UserConnceted": 
        state = { ...state, user: action.payload }
        break
        case "UserDisconnceted":
        state = { ...state, user: null }
        break
    }
    return state;
}

export default UserReducer;