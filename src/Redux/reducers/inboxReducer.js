import * as actions from '../actions/inboxActions'

const initialState = {
    isInboxTab: true,
    allInfoInbox: [],
    isLoop: true,
}

export default function inboxReducer(state=initialState, action){
    switch(action.type){
        case actions.IS_LOOP:
            return{...state, isLoop: action.payload}
        case actions.IS_INBOX_TAB:
            return {...state, isInboxTab: action.payload}
        case actions.ADD_ALL_INFO_INBOX:
            return{...state, allInfoInbox: action.payload}
        default:
            return state
    }
}
