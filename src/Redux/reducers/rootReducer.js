import { combineReducers } from 'redux'
import appReducer from './appReducer'
import inboxReducer from './inboxReducer'
import inboxContainerReducer from './inboxContainerReducer'
import requestsReducer from './requestsReducer'

const rootReducer = combineReducers ({
    app: appReducer,
    inbox: inboxReducer,
    inboxContainer: inboxContainerReducer,
    requests: requestsReducer,
})

export default rootReducer