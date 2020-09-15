import * as actions from '../actions/requestsActions'

export const initialState = {
    requestCount: 0,
    isMessageRequest: false,
}

export default function requestsReducer(state=initialState, action) {
    switch(action.type) {
        case actions.ADD_REQUEST_COUNT:
            return {...state, requestCount: action.payload}
        case actions.IS_MESSAGE_REQUEST:
            return {...state, isMessageRequest: action.payload}
        default:
            return state
    }
}