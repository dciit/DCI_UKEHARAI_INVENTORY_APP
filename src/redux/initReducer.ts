import { MInitialState } from "../interface";

const initialState: MInitialState = {
  login: false,
  emp: "",
  rev: 0,
  privilege: [],
  menuActive: "ukeharai",
};

const IndexReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        login: true,
        emp: action.payload.data,
      };
    case "LOGOUT":
      return {
        ...state,
        menuActive: "home",
        login: false,
      };
    case "SET_VERSION":
      return {
        ...state,
        rev: action.payload,
      };
    case "RESET":
      return initialState;
    case "SET_PRIVILEGE":
      return {
        ...state,
        privilege: action.payload,
      };
    case "MENU_ACTIVE":
      return {
        ...state,
        menuActive: action.payload,
      };
    default:
      return state;
  }
};
export default IndexReducer;
