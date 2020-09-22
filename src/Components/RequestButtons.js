import React from 'react'
import firebase from '../firebase'
import { connect } from 'react-redux'
import { isInboxTab } from '../Redux/actions/inboxActions'
import { isMessageRequest } from '../Redux/actions/requestsActions'
import { addMessages, addCurrentChatID } from '../Redux/actions/appActions'
import { RequestButtonsContainer,
    DeleteButton,
    AcceptButton,
} from '../Styles/RequestButtons.styles'

const mapStateToProps = (state) => ({
    currentChatIDRedux: state.app.currentChatIDRedux,
    userID: state.app.userID,
    messagesRedux: state.app.messagesRedux,
    emailRedux: state.app.emailRedux,
})


const RequestButtons = (props) => {
    const clearUnread = (messageID) => {
        if(props.messagesRedux.length>0){
            const messageRef = firebase.database().ref(`messages/${messageID}`)
            messageRef.once('value', (snapshot) => {
                let messages = snapshot.val()
                let messageKeys = Object.keys(messages)
                let messageValues = Object.values(messages)
                messageKeys.reverse().splice(0,9)
                messageValues.reverse().splice(0,9)
                let valueIndex = 0
                for (let value of messageValues) {
                    if(value.read===false){
                        if(value.email !== props.emailRedux){
                            const firebaseMessageRef = firebase.database().ref(`messages/${messageID}/${messageKeys[valueIndex]}`)
                            firebaseMessageRef.update({
                                read: true,
                                readTime: Date.now()
                            })
                            valueIndex++
                        }
                    }else{
                        break
                    }
                }
            })
        }
    }
    const accept = (input) => {
        const acceptRef = firebase.database().ref(`messages/${props.currentChatIDRedux}`)
        acceptRef.update({
            requestStatus: input
        })
        const lastUpdatedRef = firebase.database().ref(`users/${props.userID}`)
        lastUpdatedRef.update({
            lastUpdated: Date.now()
        })
        if (input==="accepted"){
            clearUnread(props.currentChatIDRedux)
            props.dispatch(isInboxTab(true))
        }else{
            props.dispatch(addMessages([]))
            props.dispatch(addCurrentChatID(null))
        }
        props.dispatch(isMessageRequest(false))
    }
    return(
        <RequestButtonsContainer>
            <DeleteButton onClick={()=>accept('rejected')} className='br2'>Delete</DeleteButton>
            <AcceptButton onClick={()=>accept('accepted')} className='br2'>Accept</AcceptButton>
        </RequestButtonsContainer>
    )
}

export default connect(mapStateToProps)(RequestButtons)