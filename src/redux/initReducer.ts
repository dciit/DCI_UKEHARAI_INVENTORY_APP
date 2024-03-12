const initialState = {
    login: false,
    emp: '',
    rev: 0
}

const IndexReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                login: true,
                emp: action.payload.data
                // empcode: action.payload.empcode,
                // name: action.payload.name
            }
        case 'LOGOUT':
            return {
                ...state,
                login: false
            }
        case 'SET_VERSION':
            return {
                ...state,
                rev: action.payload
            }
        default:
            return state
    }
}
export default IndexReducer;
