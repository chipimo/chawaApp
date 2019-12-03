const AppModelReducer = (state = { ShowModel: false, Elements: { setContent: 'default', Content: {} } }, action) => {
    switch (action.type) {
        case "ShowModel":
            state = {
                ...state,
                ShowModel: true,
                Elements: {
                    setContent: action.payload.contentType,
                    Content: action.payload.contents
                }
            }
            break
        case "CloseModel":
            state = {
                ...state,
                ShowModel: false,
                Elements: {
                    setContent: 'default',
                    Content: {}
                }
            }
            break
    }
    return state;
}

export default AppModelReducer;