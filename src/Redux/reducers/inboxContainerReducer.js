import * as actions from '../actions/inboxContainerActions'

export const initialState = {
    messagesInboxRedux: [],
    allInfoRedux: [],
}

export default function inboxContainerReducer(state=initialState, action) {
    switch (action.type){
        case actions.ADD_INBOX_MESSAGES:
            return {...state, messagesInboxRedux: action.payload}
        case actions.ADD_ALL_INFO:
            return {...state, allInfoRedux: action.payload}
        default:
            return state
    }
}
