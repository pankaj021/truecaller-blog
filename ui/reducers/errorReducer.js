import * as actions from '../actions/action-type';
const initialState = {
    isError: false,
    errMsg: ""
}

export default function errorReducer(state = initialState, action) {
    if (action.type === actions.ERROR_OCCURRED) {
        return {
            isError: true,
            errMsg: action.payload
        }
    }
    return initialState;
}