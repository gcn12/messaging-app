export const IS_INBOX_TAB = "IS_INBOX_TAB"
export const ADD_ALL_INFO_INBOX = 'ADD_ALL_INFO_INBOX'
export const IS_LOOP = 'IS_LOOP'

export const isLoop = (isLoopBoolean) => {
    return(dispatch) => {
        dispatch({type: IS_LOOP, payload: isLoopBoolean})
    }
}

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