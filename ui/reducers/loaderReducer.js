import * as actions from '../actions/action-type';
const initialState = {
    isLoading: false,
    loadingMsg: ""
}

export default function loaderReducer(state = initialState, action) {
    if (action.type === actions.LOADING_DATA) {
        return {
            isLoading: true,
            loadingMsg: action.payload
        }
    }
    return initialState;
}