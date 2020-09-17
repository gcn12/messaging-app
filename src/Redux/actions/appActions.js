export const ADD_USER = "ADD_USER"
export const ADD_USERID = "ADD_USERID"
export const ADD_CURRENT_CHAT_ID = "ADD_CURRENT_CHAT_ID"
export const ADD_EMAIL = "ADD_EMAIL"
export const ADD_NEW_MESSAGE_OTHER_USER_EMAIL = 'ADD_NEW_MESSAGE_OTHER_USER_EMAIL'
export const ADD_ALL_USER_EMAILS = 'ADD_ALL_USER_EMAILS'
export const ADD_ALL_CURRENT_USER_EMAILS = 'ADD_ALL_CURRENT_USER_EMAILS'
export const ADD_ALL_CURRENT_USER_IDS = 'ADD_ALL_CURRENT_USER_IDS'
export const ADD_MESSAGES = 'ADD_MESSAGES'
export const ADD_QUANTITY_LOAD_MESSAGES = 'ADD_QUANTITY_LOAD_MESSAGES'
export const PREVENT_SCROLL_DOWN = 'PREVENT_SCROLL_DOWN'
export const LOAD_MESSAGES_TEXT = 'LOAD_MESSAGES_TEXT'
export const IS_MESSAGES_LOADING = 'IS_MESSAGES_LOADING'

export const isMessagesLoading = (isLoadingBoolean) => {
    return(dispatch) => {
        dispatch({type: IS_MESSAGES_LOADING, payload: isLoadingBoolean})
    }
}

export const loadMessagesText = (text) => {
    return(dispatch)=> {
        dispatch({type: LOAD_MESSAGES_TEXT, payload: text})
    }
}

export const preventScrollDown = (boolean) => {
    return(dispatch)=> {
        dispatch({type:PREVENT_SCROLL_DOWN, payload: boolean})
    } 
}

export const addQuantityLoadMessages = (quantity) => {
    return(dispatch) => {
        dispatch({type: ADD_QUANTITY_LOAD_MESSAGES, payload: quantity})
    }
}

export const addMessages = (messages) => {
    return (dispatch) => {
        dispatch({type: ADD_MESSAGES, payload: messages})
    }
}

export const addAllCurrentUserIDs = (allCurrentUserIDs) => {
    return(dispatch) => {
        dispatch({type: ADD_ALL_CURRENT_USER_IDS, payload: allCurrentUserIDs})
    }
}

export const addAllCurrentUserEmails = (allCurrentUserEmails) => {
    return(dispatch) => {
        dispatch({type: ADD_ALL_CURRENT_USER_EMAILS, payload: allCurrentUserEmails})
    }
}

export const addAllUserEmails = (allUserEmails) => {
    return(dispatch) => {
        dispatch({type: ADD_ALL_USER_EMAILS, payload: allUserEmails})
    }
}

export const addNewMessageOtherUserEmail = (otherUserEmail) => {
    return(dispatch) => {
        dispatch({type: ADD_NEW_MESSAGE_OTHER_USER_EMAIL, payload: otherUserEmail})
    }
}

export const addEmail = (email) => {
    return(dispatch) => {
        dispatch({type: ADD_EMAIL, payload: email})
    }
}

export const addCurrentChatID = (currentChatID) => {
    return(dispatch) => {
        dispatch({type: ADD_CURRENT_CHAT_ID, payload: currentChatID})
    }
}

export const addUser = (user) => {
    return(dispatch) => {
        dispatch({ type: ADD_USER, payload: user })
    }
}

export const addUserID = (userID) => {
    return(dispatch)=>{
        dispatch({type: ADD_USERID, payload: userID})
    }
}