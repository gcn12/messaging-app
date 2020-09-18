import * as actions from '../actions/appActions'

export const initialState = {
    userRedux: '',
    userIDRedux: '',
    currentChatIDRedux: null,
    emailRedux: '',
    newMessageOtherUserEmailRedux: '',
    allUserEmailsRedux: [],
    allCurrentUserEmailsRedux: [],
    allCurrentUserIDsRedux: [],
    messagesRedux: [],
    quantityLoadMessages: 24,
    preventScrollDown: false,
    loadMessagesText: 'Load more messages',
    isMessagesLoading: true,
}

export default function appReducer(state=initialState, action) {
    switch(action.type){
        case actions.IS_MESSAGES_LOADING:
            return {...state, isMessagesLoading: action.payload}
        case actions.LOAD_MESSAGES_TEXT:
            return{...state, loadMessagesText: action.payload}
        case actions.PREVENT_SCROLL_DOWN:
            return{...state, preventScrollDown: action.payload}
        case actions.ADD_QUANTITY_LOAD_MESSAGES:
            return{...state, quantityLoadMessages: action.payload}
        case actions.ADD_MESSAGES:
            return {...state, messagesRedux: action.payload}
        case actions.ADD_ALL_CURRENT_USER_IDS:
            return {...state, allCurrentUserIDsRedux: action.payload}
        case actions.ADD_ALL_CURRENT_USER_EMAILS:
            return{...state, allCurrentUserEmailsRedux: action.payload}
        case actions.ADD_ALL_USER_EMAILS:
            return {...state, allUserEmailsRedux: action.payload}
        case actions.ADD_NEW_MESSAGE_OTHER_USER_EMAIL:
            return {...state, newMessageOtherUserEmailRedux: action.payload}
        case actions.ADD_EMAIL:
            return {...state, emailRedux: action.payload}
        case actions.ADD_CURRENT_CHAT_ID:
            return {...state, currentChatIDRedux: action.payload}
        case actions.ADD_USER:
            return {...state, userRedux: action.payload}
        case actions.ADD_USERID:
            return{...state, userID: action.payload}
        default:
            return state
    }
}