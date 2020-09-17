import React, { Component } from "react"
import firebase from "firebase"
import { MessageInputContainer, 
    MessageInputArea, 
    MessageInputButton, 
} from '../Styles/MessageInput.styles'
import { connect } from 'react-redux'
import { 
    // addCurrentChatID, 
    addQuantityLoadMessages
} from '../Redux/actions/appActions'

const mapStateToProps = (state) => ({
    messagesRedux: state.app.messagesRedux,
    emailRedux: state.app.emailRedux,
    allUserEmailsRedux: state.app.allUserEmailsRedux,
    currentChatIDRedux: state.app.currentChatIDRedux,
    newMessageOtherUserEmailRedux: state.app.newMessageOtherUserEmailRedux,
    userID: state.app.userID,
    userRedux: state.app.userRedux,
})
 
class MessageInput extends Component {

    state = {
        message: ''
    }



    submitFunction = () => {
        let messageRef
        // let messageID
        let otherUserID
        // let otherUserDisplayName
        // let otherUserPhotoURL
        let otherUserEmail
        const userIdRef = firebase.database().ref('users')
        userIdRef.once('value', (snapshot)=> {
            const userIndex = this.props.allUserEmailsRedux.indexOf(this.props.newMessageOtherUserEmailRedux)
            const userInfoArray = Object.keys(snapshot.val())
            otherUserID = userInfoArray[userIndex]
            if(userIndex!==-1){
                // otherUserDisplayName = snapshot.val()[otherUserID].name
                // otherUserPhotoURL = snapshot.val()[otherUserID].photoURL
                otherUserEmail = snapshot.val()[otherUserID].email
            }
        })
        const addMessageID = firebase.database().ref(`users/${this.props.userID}/messages`)
        let addMessageIDToOtherUser = firebase.database().ref(`users/${otherUserID}/messages`) 
        // if(this.props.messagesRedux.length===0){
            // this.props.newMessageRoute()
            // const itemRef = firebase.database().ref("messages")
            // const messageInfo = {
            //     lastMessage: Date.now(),
            //     user1Photo: otherUserPhotoURL,
            //     user2Photo: this.props.userRedux.photoURL,
            //     user1Email: otherUserEmail,
            //     user2Email: this.props.userRedux.email,
            //     user1: otherUserDisplayName,
            //     user2: this.props.userRedux.displayName,
            //     request: otherUserEmail,
            //     requestStatus: 'pending',
            // }
            // itemRef.push(messageInfo)
            // .then((collectionRef)=>{
            //     messageID = collectionRef.path.pieces_.pop()
            //     this.props.dispatch(addCurrentChatID(messageID))
            //     addMessageID.push({
            //         messageID: messageID,
            //         lastMessage: Date.now(),
            //     })

            //     addMessageIDToOtherUser.push({
            //         messageID: messageID,
            //         lastMessage: Date.now(),
            //     })

                // messageRef = firebase.database().ref(`messages/${messageID}`)
                // messageRef.update({
                //     lastMessage: Date.now()
                // })
                // const message = {
                //     user: this.props.usernameState,
                //     message: this.state.message,
                //     read: false, 
                //     email: this.props.emailRedux,
                //     sent: Date.now(),
                // }
                // messageRef.push(message)
                // this.props.getMessages(this.props.currentChatIDRedux)
                // document.getElementById("message-input").value=""
            // })
        // }else{
            const noEmptyMessage = /^(?!\s*$).+/
            if(noEmptyMessage.test(this.state.message)){
                messageRef = firebase.database().ref(`messages/${this.props.currentChatIDRedux}`)
                messageRef.once('value', (snapshot)=> {
                    let messageRefValues = snapshot.val()
                    messageRefValues = Object.values(messageRefValues)
                    if(this.props.emailRedux!==messageRefValues[messageRefValues.length-2]){
                        otherUserEmail = messageRefValues[messageRefValues.length-2]
                    }else if (this.props.emailRedux!==messageRefValues[messageRefValues.length-5]){
                        otherUserEmail = messageRefValues[messageRefValues.length-5]
                    }
                    console.log(snapshot.val())
                    if(snapshot.val().requestStatus==='created'){
                        messageRef.update({
                            requestStatus: 'pending'
                        })
                    }
                })
                this.props.dispatch(addQuantityLoadMessages(1))
                const message = {
                    user: this.props.usernameState,
                    message: this.state.message,
                    read: false, 
                    email: this.props.emailRedux,
                    sent: Date.now(),
                }
                messageRef.push(message)
                messageRef.update({
                    lastMessage: Date.now()
                })
                const messageRefTest = firebase.database().ref('users')
                messageRefTest.once('value', (snapshot)=> {
                    for (let userID in snapshot.val()){
                        if(snapshot.val()[userID].email===otherUserEmail){
                            otherUserID = userID
                        }
                    }
                })
                addMessageID.once('value', (snapshot)=> {
                    const userMessageIDs = snapshot.val()
                    for (let id in userMessageIDs){
                        if (userMessageIDs[id].messageID  === this.props.currentChatIDRedux){
                            const idTimestampRef = firebase.database().ref(`users/${this.props.userID}/messages/${id}`)
                            idTimestampRef.update({
                                lastMessage: Date.now()
                            })
                        }
                    }
                })
                addMessageIDToOtherUser = firebase.database().ref(`users/${otherUserID}/messages`) 
                addMessageIDToOtherUser.once('value', (snapshot)=> {
                    for (let id in snapshot.val()){
                        if (snapshot.val()[id].messageID  === this.props.currentChatIDRedux){
                            const idTimestampRef = firebase.database().ref(`users/${otherUserID}/messages/${id}`)
                            idTimestampRef.update({
                                lastMessage: Date.now()
                            })
                        }
                    }
                })
                const lastUpdatedRef = firebase.database().ref(`users/${this.props.userID}`)
                lastUpdatedRef.update({
                    lastUpdated: Date.now()
                })
                this.setState({
                    message: ''
                })
                document.getElementById("message-input").value=""
            }
        // }
    }

    submitFunctionAsync = () => {
        const runFunction = async () => {
            await this.submitFunction()
            await this.props.getMessages(this.props.currentChatIDRedux)
        }
        runFunction()
    }

    submit = (e) => {
        if (e.keyCode){
            if (e.keyCode===13 && !e.shiftKey){
                e.preventDefault()
                this.submitFunctionAsync()
            }
        }else{
            this.submitFunctionAsync()
        }
    }

    handleMessageChange = (e) => {
        this.setState({
          message: e.target.value
        })
    }

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

    render(){
        return(
            <MessageInputContainer>
                <MessageInputArea className="br3" onClick={()=>this.clearUnread(this.props.currentChatIDRedux)} id="message-input" onChange={this.handleMessageChange} placeholder="enter message"></MessageInputArea>
                <MessageInputButton onClick={this.submit}>Send</MessageInputButton>
            </MessageInputContainer>
        ) 
    }
    componentDidMount(){
        document.addEventListener("keypress", this.submit)
    }
}

export default connect(mapStateToProps)(MessageInput)