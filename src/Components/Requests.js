import React, { Component } from "react"
import firebase from "../firebase"
import "firebase/auth"
import "firebase/firestore"
import { 
    InboxMessage, 
    ProfileImage, 
    InboxContainer,  
    ImageContainer,
    MessageContainer,
    InboxUser,
} from "../Styles/Inbox.styles"
import { connect } from 'react-redux'
import { addAllCurrentUserEmails, addAllCurrentUserIDs } from '../Redux/actions/appActions'
import { isMessageRequest } from "../Redux/actions/requestsActions"

const mapStateToProps = (state) => ({
    currentChatIDRedux: state.app.currentChatIDRedux,
    emailRedux: state.app.emailRedux,
    isInboxTab: state.inbox.isInboxTab,
})

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
        allInfo: [],
    }

    getMessageSummaries = () => {
        const userID = firebase.auth().currentUser
        const messagesRef = firebase.database().ref(`users/${userID.uid}`)
        messagesRef.on('value', (snapshot)=> {
            const messagesSnapshot = snapshot.val()
            if(messagesSnapshot){
                if(messagesSnapshot.messages){
                    let messageInfo = Object.values(messagesSnapshot.messages)
                    messageInfo = messageInfo.sort(compareLastMessageTimestamp)
                    let messagesArray = []
                    let allUserIDs = []
                    let allUserEmails = []
                    let finalInfoObject = {}
                    for (let message of messageInfo){
                        const messageSummary = firebase.database().ref(`messages/${message.messageID}`)
                        let lastMessage 
                        messageSummary.on('value', (snapshot)=> {
                            if(snapshot.val()){
                                let infoObject = {}
                                lastMessage = Object.values(snapshot.val())
                                let unreadCount = 0
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
                                lastMessage = lastMessage[lastMessage.length-11]
                                if(lastMessage){
                                    lastMessage = Object.values(lastMessage)[1]
                                    if(lastMessage.length+lastMessage.split(" ").length > 31){
                                        lastMessage = lastMessage.slice(0, 31)
                                        lastMessage += "..."
                                    }
                                }
                                allUserIDs.push(message.messageID)
                                infoObject["message"] = lastMessage
                                infoObject["photoURL"] = otherUserPhotoURL
                                infoObject["displayName"] = otherUserDisplayName
                                infoObject["unread"] = unreadCount
                                if(snapshot.val().request===this.props.emailRedux&&snapshot.val().requestStatus==='pending'){
                                    finalInfoObject[message.messageID] = infoObject
                                    this.setState({
                                        allInfo: finalInfoObject
                                    })
                                    messagesArray.push(message.messageID)
                                }
                            }
                            if(document.getElementById('scroll-here')){
                                document.getElementById('scroll-here').scrollIntoView();
                            }
                        })
                        this.props.dispatch(addAllCurrentUserEmails(allUserEmails))
                        this.props.dispatch(addAllCurrentUserIDs(allUserIDs))
                    }
                    this.setState({
                        messages: messagesArray,
                    })
                }
            }
                
        })
    } 

    test = () => {
    }

    inboxToMessagesAsync = (messageID) => {
        const runFunction = async () => {
            await this.props.dispatch(isMessageRequest(true))
            await this.props.newMessageRoute(messageID)
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
                <div>
                    
                    {this.props.isInboxTab ? 
                    <div>Hellooo</div>
                    :
                        Object.values(this.state.allInfo).map((message, index)=> {
                            return(
                                <InboxContainer className="br3 pa3 ma2" isCurrentThread={this.props.currentChatIDRedux===this.state.messages[index] ? true : false} onClick={()=>this.inboxToMessagesAsync(this.state.messages[index])} key={index}>
                                    <ImageContainer>
                                        <ProfileImage alt="user profile" src={message.photoURL}></ProfileImage>
                                    </ImageContainer>
                                    <MessageContainer>
                                        <InboxUser>{message.displayName}</InboxUser>
                                        <InboxMessage >{message.message}</InboxMessage>
                                    </MessageContainer>
                                </InboxContainer>
                                )
                        })
                    
                    }
                </div>
                :
                null
                }
            </div>
        )
    }
}

export default connect(mapStateToProps)(Inbox)