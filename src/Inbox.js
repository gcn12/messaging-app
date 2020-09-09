import React, { Component } from "react"
import firebase from "./firebase"
import "firebase/auth"
import "firebase/firestore"
import { 
    InboxMessage, 
    ProfileImage, 
    InboxContainer, 
    UnreadStyles,
    UndreadContainer, 
    ImageContainer,
    MessageContainer,
    InboxUser,
    // UnreadCircleStyle,
} from "./Inbox.styles"
import { ReactComponent as UnreadCircle } from "./UnreadCircle.svg"

const compareLastMessageTimestamp = (a, b) => {
    let comparison = 0
    if (a.lastMessage < b.lastMessage){
        comparison = 1
    } else if (a.lastMessage > b.lastMessage){
        comparison = -1
    } 
    return comparison
}

class Inbox extends Component {

    state = {
        messages: [],
        mostRecentMessage: "",
        otherUserDisplayName: "",
        otherUserPhotoURL: "",
        allInfo: [],
        messageIDs: [],
        unreadMessages: 0,
        unreadCount: 0,
    }

    getMessageSummaries = () => {
        const userID = firebase.auth().currentUser
        const messagesRef = firebase.database().ref(`users/${userID.uid}`)
        messagesRef.on('value', (snapshot)=> {
            const messagesSnapshot = snapshot.val()
            let messageInfo = Object.values(messagesSnapshot.messages)
            messageInfo = messageInfo.sort(compareLastMessageTimestamp)
            if(messagesSnapshot){
                if(messagesSnapshot.messages){
                    let messagesArray = []
                    let allUserIDs = []
                    let allUserEmails = []
                    let finalInfoObject = {}
                    let loopIndex = 0
                    for (let message of messageInfo){
                        const messageSummary = firebase.database().ref(`messages/${message.messageID}`)
                        let lastMessage 
                        messageSummary.on('value', (snapshot)=> {
                            if(snapshot.val()){
                                let infoObject = {}
                                lastMessage = Object.values(snapshot.val())
                                let unreadMessages = Object.values(snapshot.val())
                                unreadMessages.reverse().splice(0,7)
                                let unreadCount = 0
                                for (let unreadMessage of unreadMessages) {
                                    if(unreadMessage.read===false){
                                        if(unreadMessage.email!==userID.email){
                                            const focus = document.getElementById('message-input')
                                            const isFocus = document.activeElement===focus
                                            if(!isFocus){
                                                unreadCount++
                                            }else if(isFocus){
                                                this.inboxToMessages(this.props.currentChatID)
                                            }
                                        }
                                    }else{
                                        break
                                    }
                                }
                                const otherUserInfo = Object.values(snapshot.val())
                                let otherUserDisplayName 
                                let otherUserPhotoURL
                                if (otherUserInfo[otherUserInfo.length-3]===userID.displayName){
                                    otherUserDisplayName = otherUserInfo[otherUserInfo.length-6]
                                } else if (otherUserInfo[otherUserInfo.length-6]===userID.displayName){
                                    otherUserDisplayName = otherUserInfo[otherUserInfo.length-3]
                                }
                                if(otherUserInfo[otherUserInfo.length-1]===userID.photoURL){
                                    otherUserPhotoURL = otherUserInfo[otherUserInfo.length-4]
                                } else if(otherUserInfo[otherUserInfo.length-4]===userID.photoURL){
                                    otherUserPhotoURL = otherUserInfo[otherUserInfo.length-1]
                                }
                                if(otherUserInfo[otherUserInfo.length-2]===userID.email){
                                    allUserEmails.push(otherUserInfo[otherUserInfo.length-5])
                                } else if(otherUserInfo[otherUserInfo.length-5]===userID.email){
                                    allUserEmails.push(otherUserInfo[otherUserInfo.length-2])
                                }
                                lastMessage = lastMessage[lastMessage.length-8]
                                if(lastMessage){
                                    lastMessage = Object.values(lastMessage)[1]
                                }
                                if(lastMessage.length+lastMessage.split(" ").length > 55){
                                    lastMessage = lastMessage.slice(0, 53)
                                    lastMessage += "..."
                                }
                                allUserIDs.push(message.messageID)
                                infoObject["message"] = lastMessage
                                infoObject["photoURL"] = otherUserPhotoURL
                                infoObject["displayName"] = otherUserDisplayName
                                infoObject["unread"] = unreadCount
                                finalInfoObject[message.messageID] = infoObject
                                this.setState({
                                    allInfo: finalInfoObject
                                })
                            }
                            document.getElementById('scroll-here').scrollIntoView();
                        })
                        this.props.getUserEmailsAndMessageIDsFromInbox(allUserEmails, allUserIDs)
                        if(loopIndex===0){
                            if(this.props.currentChatID===null){
                                this.props.newMessageRoute(message.messageID)
                            }
                        }
                        loopIndex++
                        messagesArray.push(message.messageID)
                    }
                    this.setState({
                        messages: messagesArray,
                    })
                }
            }
        })
    } 

    test = () => {
        // for (let message in this.state.allInfo){
        //     console.log(this.state.allInfo[message])
        // }
        document.getElementById('scroll-here').scrollIntoView();
    }

    inboxToMessages = (messageID) => {
        this.props.newMessageRoute(messageID)
        const messageRef = firebase.database().ref(`messages/${messageID}`)
        messageRef.once('value', (snapshot) => {
            let messages = snapshot.val()
            let messageKeys = Object.keys(messages)
            let messageValues = Object.values(messages)
            messageKeys.reverse().splice(0,7)
            messageValues.reverse().splice(0,7)
            messageValues.map((value,index) => {
                if(value.read===false){
                    if(value.email!==this.props.email){
                        // if(messageID!==this.props.currentChatID){
                            const firebaseMessageRef = firebase.database().ref(`messages/${messageID}/${messageKeys[index]}`)
                            firebaseMessageRef.update({
                                read: true
                            })
                        // }
                    }
                }
                return null
            })
            document.getElementById('scroll-here').scrollIntoView();
        })
    }

    inboxToMessagesAsync = (messageID) => {
        const runFunction = async () => {
            await this.inboxToMessages(messageID)
            await document.getElementById('scroll-here').scrollIntoView();
        }
        runFunction()
    } 



    componentDidMount(){
        this.getMessageSummaries()
    }
    
    render() {
        return(
            <div>
                {/* <button onClick={(this.test)}>push</button> */}
                {this.state.messages.length > 0 
                ?
                Object.values(this.state.allInfo).map((message, index)=> {
                    return(
                        <InboxContainer className="br3 pa3 ma2" isCurrentThread={this.props.currentChatID===this.state.messages[index] ? true : false} onClick={()=>this.inboxToMessagesAsync(this.state.messages[index])} key={index}>
                        {/* <InboxContainer className="br3 pa3 ma2" isCurrentThread={this.props.currentChatID===this.state.messages[index] ? true : false} onClick={()=>this.inboxToMessages(this.state.messages[index])} key={index}> */}
                            <ImageContainer>
                                <ProfileImage alt="user profile" src={message.photoURL}></ProfileImage>
                            </ImageContainer>
                            <MessageContainer>
                                <InboxUser>{message.displayName}</InboxUser>
                                <InboxMessage >{message.message}</InboxMessage>
                            </MessageContainer>
                            {message.unread > 0 ? 
                                // <div style={{width: '25%'}}>
                                    <UndreadContainer>
                                        <UnreadCircle></UnreadCircle>
                                        <UnreadStyles>{message.unread}</UnreadStyles>
                                    </UndreadContainer>
                                // </div>
                            :
                            null
                            }
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