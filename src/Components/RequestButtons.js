import React, { Component } from 'react'
import firebase from '../firebase'
import { connect } from 'react-redux'
import { isInboxTab, isLoop } from '../Redux/actions/inboxActions'
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


class RequestButtons extends Component {
    clearUnread = (messageID) => {
        if(this.props.messagesRedux.length>0){
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
                        if(value.email !== this.props.emailRedux){
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
    accept = (input) => {
        const acceptRef = firebase.database().ref(`messages/${this.props.currentChatIDRedux}`)
        acceptRef.update({
            requestStatus: input,
            lastMessage: Date.now()
        })
        // const lastUpdatedRef = firebase.database().ref(`users/${this.props.userID}`)
        // lastUpdatedRef.update({
        //     lastUpdated: Date.now()
        // })
        if (input==="accepted"){
            this.props.dispatch(isLoop(true))
            this.clearUnread(this.props.currentChatIDRedux)
            this.props.dispatch(isInboxTab(true))
            //this.props.dispatch(addCurrentChatID(null))
        }else{
            this.props.dispatch(addMessages([]))
            this.props.dispatch(addCurrentChatID(null))
        }
        this.props.dispatch(isMessageRequest(false))
    }

    render() {
        return(
            <RequestButtonsContainer>
                <DeleteButton onClick={()=>this.accept('rejected')} className='br2'>Delete</DeleteButton>
                <AcceptButton onClick={()=>this.accept('accepted')} className='br2'>Accept</AcceptButton>
            </RequestButtonsContainer>
        )
    }

}

export default connect(mapStateToProps)(RequestButtons)