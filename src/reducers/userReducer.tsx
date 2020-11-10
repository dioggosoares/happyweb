import { useReducer } from "react";

export const initialState = {
  name: '',
  email: '',
};

export const UserReducer = (state: any, action: any) => {
    switch(action.type){
        case 'setName':
            return { ...state, name: action.payload.name };
        break;
        default:
            return state;
    }
}
