export const IS_INBOX_TAB = "IS_INBOX_TAB"
export const ADD_ALL_INFO_INBOX = 'ADD_ALL_INFO_INBOX'

export const isInboxTab = (inboxTabBool) => {
    return(dispatch) => {
        dispatch({type: IS_INBOX_TAB, payload: inboxTabBool})
    }
}

export const addAllInfoInbox = (info) => {
    return(dispatch) => {
        dispatch({type:ADD_ALL_INFO_INBOX, payload: info})
    }
}