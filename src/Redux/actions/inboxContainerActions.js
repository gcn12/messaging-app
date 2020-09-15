export const ADD_INBOX_MESSAGES = "ADD_INBOX_MESSAGES"
export const ADD_ALL_INFO = 'ADD_ALL_INFO'

export const addInboxMessages = (messages) => {
    return (dispatch) => {
        dispatch({type: ADD_INBOX_MESSAGES, payload: messages})
    }
}

export const addAllInfo = (allInfo) => {
    return(dispatch)=> {
        dispatch({type: ADD_ALL_INFO, payload: allInfo})
    }
}