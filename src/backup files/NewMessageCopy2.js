import React, { Component } from "react"
import firebase from "../firebase"
import { NewMessageButton, NewMessageInput, NewMessageContainer } from "../Styles/NewMessage.styles"
import { connect } from 'react-redux'
import { addMessages } from '../Redux/actions/appActions'
import { addCurrentChatID, addNewMessageOtherUserEmail } from '../Redux/actions/appActions'

const mapStateToProps = (state) => ({
    allUserEmailsRedux: state.app.allUserEmailsRedux,
    emailRedux: state.app.emailRedux,
    allCurrentUserEmailsRedux: state.app.allCurrentUserEmailsRedux,
    allCurrentUserIDsRedux: state.app.allCurrentUserIDsRedux,
    userRedux: state.app.userRedux,
    newMessageOtherUserEmailRedux: state.app.newMessageOtherUserEmailRedux,
    userID: state.app.userID,
})

class NewMessage extends Component {

    state = {
        email: "",
        isUserExist: "",
    }

    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    createNewMessage = () => {
        if(this.state.email.length>0){
            const emailIndex = this.props.allCurrentUserEmailsRedux.indexOf(this.state.email)
            if(emailIndex!==-1){
                this.props.dispatch(addCurrentChatID(this.props.allCurrentUserIDsRedux[emailIndex]))
                this.props.getMessages(this.props.allCurrentUserIDsRedux[emailIndex], true)
                if(this.state.isUserExist==="user does not exist"){
                    this.setState({
                        isUserExist: "",
                    })
                }
            }else{
                // if(this.props.allUserEmailsRedux){
                    for(let email of this.props.allUserEmailsRedux) {
                        if(this.state.email===this.props.emailRedux){
                            break
                        }else if(email===this.state.email){
                            this.props.dispatch(addMessages([]))
                            this.props.dispatch(addCurrentChatID('NEW MESSAGE'))
                            this.props.dispatch(addNewMessageOtherUserEmail(this.state.email))
                            this.setState({
                                isUserExist: ""
                            })
                            this.props.newMessageRoute()



                            let messageID
                            let otherUserID
                            let otherUserDisplayName
                            let otherUserPhotoURL
                            let otherUserEmail
                            const userIdRef = firebase.database().ref('users')
                            userIdRef.once('value', (snapshot)=> {
                                const userIndex = this.props.allUserEmailsRedux.indexOf(this.state.email)
                                console.log(this.props.allUserEmailsRedux)
                                const userInfoArray = Object.keys(snapshot.val())
                                otherUserID = userInfoArray[userIndex]
                                if(userIndex!==-1){
                                    otherUserDisplayName = snapshot.val()[otherUserID].name
                                    otherUserPhotoURL = snapshot.val()[otherUserID].photoURL
                                    otherUserEmail = snapshot.val()[otherUserID].email
                                }
                            })
                            const addMessageID = firebase.database().ref(`users/${this.props.userID}/messages`)
                            let addMessageIDToOtherUser = firebase.database().ref(`users/${otherUserID}/messages`)
                            const itemRef = firebase.database().ref("messages")
                            const messageInfo = {
                                lastMessage: Date.now(),
                                user1Photo: otherUserPhotoURL,
                                user2Photo: this.props.userRedux.photoURL,
                                user1Email: otherUserEmail,
                                user2Email: this.props.userRedux.email,
                                user1: otherUserDisplayName,
                                user2: this.props.userRedux.displayName,
                                request: otherUserEmail,
                                requestStatus: 'created',
                            }
                            itemRef.push(messageInfo)
                            .then((collectionRef)=>{
                                messageID = collectionRef.path.pieces_.pop()
                                this.props.dispatch(addCurrentChatID(messageID))
                                addMessageID.push({
                                    messageID: messageID,
                                    lastMessage: Date.now(),
                                })

                                addMessageIDToOtherUser.push({
                                    messageID: messageID,
                                    lastMessage: Date.now(),
                                })
                            })


                            break
                        }else{
                            this.setState({
                                isUserExist: "user does not exist"
                            })
                        }
                    }
                // }
            }
            document.getElementById("email-input").value=""
        }
    }

    render() {
        return(
            <NewMessageContainer>
                {/* New Message */}
                <NewMessageInput className="br2" id="email-input" onChange={this.handleEmail} placeholder="enter email"></NewMessageInput>
                <NewMessageButton className="br2" onClick={this.createNewMessage}>+</NewMessageButton>
                <div>{this.state.isUserExist}</div>
            </NewMessageContainer>
        )
    }
} 

export default connect(mapStateToProps)(NewMessage) 