const initialState = {
    login: false,
}

const IndexReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                login: true,
                // empcode: action.payload.empcode,
                // name: action.payload.name
            }
        case 'LOGOUT':
            return {
                ...state,
                login: false
            }
        default:
            return state
    }
}
export default IndexReducer;
