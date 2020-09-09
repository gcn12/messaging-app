import React, { Component } from "react"
import firebase from "firebase"
import { MessageInputContainer, MessageInputArea } from './MessageInput.styles'

class MessageInput extends Component {

    state = {
        message: ''
    }

    submitFunction = () => {
        let messageRef
        let messageID
        const userIndex = this.props.allUserEmails.indexOf(this.props.newMessageOtherUserEmail)
        let otherUserID
        let otherUserDisplayName
        let otherUserPhotoURL
        let otherUserEmail
        const userIdRef = firebase.database().ref('users')
        userIdRef.once('value', (snapshot)=> {
            const userInfo = snapshot.val()
            const userInfoArray = Object.keys(userInfo)
            otherUserID = userInfoArray[userIndex]
            if(userIndex!==-1){
                otherUserDisplayName = userInfo[otherUserID].name
                otherUserPhotoURL = userInfo[otherUserID].photoURL
                otherUserEmail = userInfo[otherUserID].email
            }
        })
        const userID = firebase.auth().currentUser
        const addMessageID = firebase.database().ref(`users/${userID.uid}/messages`)
        let addMessageIDToOtherUser = firebase.database().ref(`users/${otherUserID}/messages`) 
        const currentUserInfo = firebase.auth().currentUser
        if(this.props.messages.length===0){
            this.props.newMessageRoute()
            const itemRef = firebase.database().ref("messages")
            const messageInfo = {
                lastMessage: Date.now(),
                user1Photo: otherUserPhotoURL,
                user2Photo: currentUserInfo.photoURL,
                user1Email: otherUserEmail,
                user2Email: currentUserInfo.email,
                user1: otherUserDisplayName,
                user2: currentUserInfo.displayName,
            }
            itemRef.push(messageInfo)
            .then(function(collectionRef){
                messageID = collectionRef.path.pieces_.pop()
            }).then(()=> {
                this.props.getCurrentID(messageID)
                
                addMessageID.push({
                    messageID: messageID,
                    lastMessage: Date.now(),
                }).then(function(addMessageIDRef) {
                    const addCollectionID = firebase.database().ref(`users/${userID.uid}/messages/${addMessageIDRef.path.pieces_[3]}`)
                    addCollectionID.update({
                        collectionID: addMessageIDRef.path.pieces_[3]
                    })
                })
                addMessageIDToOtherUser.push({
                    messageID: messageID,
                    lastMessage: Date.now(),
                }).then(function(addMessageIDRef) {
                    const addCollectionIDToOtherUser = firebase.database().ref(`users/${otherUserID}/messages/${addMessageIDRef.path.pieces_[3]}`) 
                    addCollectionIDToOtherUser.update({
                        collectionID: addMessageIDRef.path.pieces_[3]
                    })
                })
                messageRef = firebase.database().ref(`messages/${messageID}`)
                this.props.getMessages(this.props.currentChatID)
                const message = {
                    user: this.props.usernameState,
                    message: this.state.message,
                    read: false, 
                    email: this.props.email,
                }
                messageRef.push(message)
                messageRef.update({
                    lastMessage: Date.now()
                })
                document.getElementById("message-input").value=""
            })
        }else{
            // addMessageID.once('value', (snapshot)=> {
            //     console.log(snapshot.val())

            // })
            const noEmptyMessage = /^(?!\s*$).+/
            if(noEmptyMessage.test(this.state.message)){
                messageRef = firebase.database().ref(`messages/${this.props.currentChatID}`)
                messageRef.once('value', (snapshot)=> {
                    let messageRefValues = snapshot.val()
                    messageRefValues = Object.values(messageRefValues)
                    if(this.props.email!==messageRefValues[messageRefValues.length-2]){
                        otherUserEmail = messageRefValues[messageRefValues.length-2]
                    }else if (this.props.email!==messageRefValues[messageRefValues.length-5]){
                        otherUserEmail = messageRefValues[messageRefValues.length-5]
                    }
                })
                this.props.getMessages(this.props.currentChatID)
                const message = {
                    user: this.props.usernameState,
                    message: this.state.message,
                    read: false, 
                    email: this.props.email,
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
                        if (userMessageIDs[id].messageID  === this.props.currentChatID){
                            const idTimestampRef = firebase.database().ref(`users/${userID.uid}/messages/${id}`)
                            idTimestampRef.update({
                                lastMessage: Date.now()
                            })
                        }
                    }
                })
                addMessageIDToOtherUser = firebase.database().ref(`users/${otherUserID}/messages`) 
                addMessageIDToOtherUser.once('value', (snapshot)=> {
                    for (let id in snapshot.val()){
                        if (snapshot.val()[id].messageID  === this.props.currentChatID){
                            const idTimestampRef = firebase.database().ref(`users/${otherUserID}/messages/${id}`)
                            idTimestampRef.update({
                                lastMessage: Date.now()
                            })
                        }
                    }
                })
                this.setState({
                    message: ''
                })
                document.getElementById("message-input").value=""
            }
        }
    }

    submit = (e) => {
        if (e.keyCode){
            if (e.keyCode===13 && !e.shiftKey){
                e.preventDefault()
                this.submitFunction()
            }
        }else{
            this.submitFunction()
        }
    }

    handleMessageChange = (e) => {
        this.setState({
          message: e.target.value
        })
      }

    clearUnread = (messageID) => {
        if(this.props.messages.length>0){
            const messageRef = firebase.database().ref(`messages/${messageID}`)
            messageRef.once('value', (snapshot) => {
                let messages = snapshot.val()
                let messageKeys = Object.keys(messages)
                let messageValues = Object.values(messages)
                messageKeys.reverse().splice(0,7)
                messageValues.reverse().splice(0,7)
                let valueIndex = 0
                for (let value of messageValues) {
                    if(value.read===false){
                        if(value.email !== this.props.email){
                            const firebaseMessageRef = firebase.database().ref(`messages/${messageID}/${messageKeys[valueIndex]}`)
                            firebaseMessageRef.update({
                                read: true
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
                {/* <input onChange={props.username} placeholder="enter username"></input> */}
                <MessageInputArea className="br3" onClick={()=>this.clearUnread(this.props.currentChatID)} id="message-input" onChange={this.handleMessageChange} placeholder="enter message"></MessageInputArea>
                <button onClick={this.submit}>Send</button>
            </MessageInputContainer>
        ) 
    }
    componentDidMount(){
        document.addEventListener("keypress", this.submit)
    }
}

export default MessageInput