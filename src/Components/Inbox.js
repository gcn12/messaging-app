import React, { Component } from "react"
import firebase from "../firebase"
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
} from "../Styles/Inbox.styles"
import { ReactComponent as UnreadCircle } from "../UnreadCircle.svg"
import { connect } from 'react-redux'
import { addAllCurrentUserEmails, addAllCurrentUserIDs, isMessagesLoading } from '../Redux/actions/appActions'
import { addRequestCount, isMessageRequest } from "../Redux/actions/requestsActions"
import { addAllInfoInbox, isLoop } from '../Redux/actions/inboxActions'

const mapStateToProps = (state) => ({
    currentChatIDRedux: state.app.currentChatIDRedux,
    emailRedux: state.app.emailRedux,
    isInboxTab: state.inbox.isInboxTab,
    requestCount: state.requests.requestCount,
    allInfoInbox: state.inbox.allInfoInbox,
    messagesRedux: state.app.messagesRedux,
    userRedux: state.app.userRedux,
    isLoop: state.inbox.isLoop,
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
                    let requestArray = []
                    let allUserIDs = []
                    let allUserEmails = []
                    let finalInfoObject = {}
                    // let continueLoop = true
                    // for (let message of messageInfo){
                    //     console.log(message)
                    for (let i=0; i < messageInfo.length; i++){
                        const messageSummary = firebase.database().ref(`messages/${messageInfo[i].messageID}`)
                        let lastMessage 
                        messageSummary.on('value', (snapshot)=> {
                            if(snapshot.val()){
                                let infoObject = {}
                                lastMessage = Object.values(snapshot.val())
                                let unreadMessages = Object.values(snapshot.val())
                                unreadMessages.reverse().splice(0,10)
                                let unreadCount = 0
                                for (let unreadMessage of unreadMessages) {
                                    if(unreadMessage.read===false){
                                        if(unreadMessage.email!==userID.email){
                                            unreadCount++
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
                                } else {
                                    otherUserDisplayName = otherUserInfo[otherUserInfo.length-3]
                                }
                                if(otherUserInfo[otherUserInfo.length-1]===userID.photoURL){
                                    otherUserPhotoURL = otherUserInfo[otherUserInfo.length-4]
                                } else {
                                    otherUserPhotoURL = otherUserInfo[otherUserInfo.length-1]
                                }
                                if(otherUserInfo[otherUserInfo.length-2]===userID.email){
                                    allUserEmails.push(otherUserInfo[otherUserInfo.length-5])
                                } else {
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
                                allUserIDs.push(messageInfo[i].messageID)
                                infoObject["message"] = lastMessage
                                infoObject["photoURL"] = otherUserPhotoURL
                                infoObject["displayName"] = otherUserDisplayName
                                infoObject["unread"] = unreadCount
                                if(snapshot.val().requestStatus==='accepted'||snapshot.val().request!==this.props.emailRedux){
                                    finalInfoObject[messageInfo[i].messageID] = infoObject
                                    this.setState({
                                        allInfo: finalInfoObject
                                    })
                                    this.props.dispatch(addAllInfoInbox(finalInfoObject))
                                    messagesArray.push(messageInfo[i].messageID)
                                }
                                if(snapshot.val().request===this.props.emailRedux&&snapshot.val().requestStatus==='pending'){
                                    requestArray.push(messageInfo[i].messageID)
                                }else{
                                    // if(continueLoop){
                                    // if(this.props.isLoop){
                                        // console.log(this.props.currentChatIDRedux)
                                        if(i===0){

                                            if(this.props.currentChatIDRedux===null){
                                                if(snapshot.val().requestStatus!=='rejected'||snapshot.val().request!==this.props.emailRedux){
                                                    this.props.newMessageRoute(messageInfo[i].messageID)
                                                    this.props.dispatch(isLoop(false))
                                                    // continueLoop = false
                                                }
                                            }
                                        }
                                    // }
                                }
                                this.props.dispatch(addRequestCount(requestArray.length))
                            }
                            this.props.dispatch(isMessagesLoading(false))
                        })
                        this.props.dispatch(addAllCurrentUserEmails(allUserEmails))
                        this.props.dispatch(addAllCurrentUserIDs(allUserIDs))
                    }
                    if(this.props.messagesRedux.length >=  messagesArray.length+requestArray.length){
                        if(document.getElementById(this.props.messagesIDName)){
                            document.getElementById(this.props.messagesIDName).scrollIntoView();
                        }
                    }
                    this.setState({
                        messages: messagesArray,
                    })
                }else{
                    this.props.dispatch(isMessagesLoading(false))
                }
            }   
            this.props.dispatch(isMessagesLoading(false))
        })
    } 


    test = () => {
        console.log(Object.values(this.state.allInfo))
    }

    inboxToMessages = (messageID) => {
        this.props.newMessageRoute(messageID)
        const messageRef = firebase.database().ref(`messages/${messageID}`)
        messageRef.on('value', (snapshot) => {
            if(snapshot.val()){
                let messages = snapshot.val()
                let messageKeys = Object.keys(messages)
                let messageValues = Object.values(messages)
                messageKeys.reverse().splice(0,8)
                messageValues.reverse().splice(0,8)
                messageValues.map((value,index) => {
                    if(value.read===false){
                        if(value.email!==this.props.emailRedux){
                            const updateMessageRef = firebase.database().ref(`messages/${messageID}/${messageKeys[index]}`)
                            updateMessageRef.update({
                                read: true,
                                readTime: Date.now()
                            })
                        }
                    }
                    return null
                })
                // document.getElementById(this.props.messagesIDName).scrollIntoView();
            }
        })
    }

    inboxToMessagesAsync = (messageID) => {
        if(messageID !== this.props.currentChatIDRedux){
            const runFunction = async () => {
                await this.props.dispatch(isMessageRequest(false))
                await this.inboxToMessages(messageID)
                // await document.getElementById(this.props.messagesIDName).scrollIntoView();
            }
            runFunction()
        }
    } 

    componentDidMount(){
        // this.props.dispatch(isLoop(true))
        this.props.dispatch(addRequestCount(0))
        setTimeout(()=> this.getMessageSummaries(), 100)
        
    }
    
    render() {
        return(
            <div>
                {Object.values(this.props.allInfoInbox).map((message, index)=> {
                    return(
                        <InboxContainer className="br3 pa3 ma2" isCurrentThread={this.props.currentChatIDRedux===this.state.messages[index] ? true : false} onClick={()=>this.inboxToMessagesAsync(this.state.messages[index])} key={index}>
                            <ImageContainer>
                                <ProfileImage alt="user profile" src={message.photoURL}></ProfileImage>
                            </ImageContainer>
                            <MessageContainer>
                                <InboxUser>{message.displayName}</InboxUser>
                                <InboxMessage >{message.message}</InboxMessage>
                            </MessageContainer>
                            {message.unread > 0 ? 
                                <UndreadContainer>
                                    <UnreadCircle></UnreadCircle>
                                    <UnreadStyles>{message.unread}</UnreadStyles>
                                </UndreadContainer>
                            :
                            null
                            }
                        </InboxContainer>
                    )
                    })
                }
                </div>
        )
    }
}

export default connect(mapStateToProps)(Inbox)