const initialState = {
    login: false,
    emp: ''
}

const IndexReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            console.log(action.payload.data)
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
        default:
            return state
    }
}
export default IndexReducer;
