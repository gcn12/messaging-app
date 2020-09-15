export const ADD_REQUEST_COUNT = 'ADD_REQUEST_COUNT'
export const IS_MESSAGE_REQUEST = 'IS_MESSAGE_REQUEST'

export const addRequestCount = (requestCount) => {
    return(dispatch) => {
        dispatch({type: ADD_REQUEST_COUNT, payload: requestCount})
    }
}

export const isMessageRequest = (isRequestBool) => {
    return(dispatch) => {
        dispatch({type: IS_MESSAGE_REQUEST, payload: isRequestBool})
    }
}