import React, { Component } from "react"
import firebase from "./firebase"
import "firebase/auth"
import "firebase/firestore"
import { InboxMessage, ProfileImage, InboxContainer } from "./Inbox.styles"

class Inbox extends Component {

    state = {
        messages: [],
        mostRecentMessage: "",
        otherUserDisplayName: "",
        otherUserPhotoURL: "",
    }

    getMessages = () => {
        const userID = firebase.auth().currentUser
        const messagesRef = firebase.database().ref(`users/${userID.uid}`)
        messagesRef.on('value', (snapshot)=> {
            const messagesSnapshot = snapshot.val()
            if(messagesSnapshot.messages){
                let messagesArray = []
                let allUserIDs = []
                let allUserEmails = []
                let mostRecentMessageArray = []
                for (let message in messagesSnapshot.messages){
                    const messageSummary = firebase.database().ref(`messages/${messagesSnapshot.messages[message]["messageID"]}`)
                    let lastMessage 
                    messageSummary.on('value', (snapshot)=> {
                        if(snapshot.val()){
                            console.log(snapshot.val())
                            lastMessage = Object.values(snapshot.val())
                            // console.log(lastMessage)
                            const otherUserEmail = Object.values(snapshot.val())
                            let otherUserDisplayName 
                            let otherUserPhotoURL
                            if (otherUserEmail[otherUserEmail.length-3]===userID.displayName){
                                otherUserDisplayName = otherUserEmail[otherUserEmail.length-6]
                            }
                            if (otherUserEmail[otherUserEmail.length-6]===userID.displayName){
                                otherUserDisplayName = otherUserEmail[otherUserEmail.length-3]
                            }
                            if(otherUserEmail[otherUserEmail.length-1]===userID.photoURL){
                                otherUserPhotoURL = otherUserEmail[otherUserEmail.length-4]
                            }
                            if(otherUserEmail[otherUserEmail.length-4]===userID.photoURL){
                                otherUserPhotoURL = otherUserEmail[otherUserEmail.length-1]
                            }
                            if(otherUserEmail[otherUserEmail.length-2]===userID.email){
                                // otherUserEmail = otherUserEmail[otherUserEmail.length-5]
                                allUserEmails.push(otherUserEmail[otherUserEmail.length-5])
                            }
                            if(otherUserEmail[otherUserEmail.length-5]===userID.email){
                                // otherUserEmail = otherUserEmail[otherUserEmail.length-2]
                                allUserEmails.push(otherUserEmail[otherUserEmail.length-2])
                            }
                            lastMessage = lastMessage[lastMessage.length-8]
                            if(lastMessage){
                                lastMessage = Object.values(lastMessage)[0]
                            }
                            allUserIDs.push(messagesSnapshot.messages[message]["messageID"])
                            mostRecentMessageArray.push(lastMessage)
                            this.setState({
                                otherUserPhotoURL: [...this.state.otherUserPhotoURL, otherUserPhotoURL],
                                otherUserDisplayName: [...this.state.otherUserDisplayName, otherUserDisplayName],
                                // mostRecentMessage: [...this.state.mostRecentMessage, lastMessage]
                                mostRecentMessage: mostRecentMessageArray
                            })
                            // console.log("a")
                        }
                    })
                    this.props.getUserEmailsAndMessageIDsFromInbox(allUserEmails, allUserIDs)
                    messagesArray.push(messagesSnapshot.messages[message]["messageID"])
                }
                this.setState({
                    messages: messagesArray,
                })
            }
        })
    }

    componentDidMount(){
        this.getMessages()
    }
    
    render() {
        console.log(this.state.mostRecentMessage)
        return(
            <div>
                {/* <button onClick={()=>console.log(this.state.mostRecentMessage)}>push</button> */}
                {this.state.mostRecentMessage.length > 0 
                ?
                this.state.mostRecentMessage.map((message, index)=> {
                    // console.log(this.state.mostRecentMessage)
                    return(
                        <InboxContainer onClick={()=>this.props.newMessageRoute(this.state.messages[index])} key={index}>
                            {/* <InboxMessage >{this.state.otherUserDisplayName[index]} | {message.slice(0, 15)}</InboxMessage> */}
                            <InboxMessage >{this.state.otherUserDisplayName[index]} | {message}</InboxMessage>
                            <ProfileImage alt="user profile" src={this.state.otherUserPhotoURL[index]}></ProfileImage>
                        </InboxContainer>
                    )
                })
                :
                null
                }
            </div>
        )
    }
}

export default Inbox