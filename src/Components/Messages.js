import React, { Component } from "react"
import { UserMessageStyle,
    NewMessageHeader, 
    MessagesContainer, 
    Options, 
    MessageOptionsContainer,
    Delete,
    Seen,
    Timestamp,
} from  "../Styles/Messages.styles"
import { connect } from 'react-redux'
import firebase from '../firebase'
import moment from 'moment'

const mapStateToProps = (state) => ({
    messagesRedux: state.app.messagesRedux,
    emailRedux: state.app.emailRedux,
    currentChatIDRedux: state.app.currentChatIDRedux,
    newMessageOtherUserEmailRedux: state.app.newMessageOtherUserEmailRedux,
    isMesssagesLoading: state.app.isMesssagesLoading,
    quantityLoadMessages: state.app.quantityLoadMessages,
})

class ShowHideMessages extends Component {
    state = {
        showOptions: false,
    }

    show = () => {
        if(this.state.showOptions){
            this.setState({
                showOptions: false
            })
        }else{
            this.setState({
                showOptions: true
            })
        }
    }

    hide = () => {
        this.setState({
            showOptions: false
        })
    }

    render() {
        return(
            this.props.message ? 
            <MessageOptionsContainer onMouseLeave={this.hide} isCurrentUser={this.props.emailRedux===this.props.email ? true : false}>
                <UserMessageStyle isCurrentUser={this.props.emailRedux===this.props.email ? true : false} onClick={this.show} className={this.props.user===this.props.userMessage ? "current-user grow br3 pa3 ma1 dib bw2 shadow-5" : "other-user grow br3 pa3 ma2 dib bw2 shadow-5"}>
                    {this.props.itemID!=="lastMessage"&&this.props.itemID!=="user1"&&this.props.itemID!=="user2"&&this.props.itemID!=="user2Photo"&&this.props.itemID!=="user1Photo"&&this.props.itemID!=="user2Email"&&this.props.itemID!=="user1Email" ? 
                    <div>
                    <div id={this.props.idName}></div>
                        {this.props.message}
                        {(this.props.index===this.props.messagesQuantity-11)&&(this.props.readTime>0)&&(this.props.email===this.props.emailRedux) ? 
                        <Seen>Seen {moment.unix(this.props.readTime/1000).calendar().toLowerCase()}</Seen>
                        :
                        null
                        }
                    </div>
                    : 
                    null
                    }
                </UserMessageStyle>
                <Options isCurrentUser={this.props.emailRedux===this.props.email ? true : false} className='br3 pa2 ma1 dib shadow-5' showOptions={this.state.showOptions}>
                    {this.props.emailRedux===this.props.email ? 
                    <Delete onClick={()=>this.props.removeItem(this.props.itemID)}>Delete</Delete>
                    :
                    null
                    }
                    <Timestamp>{moment.unix(Number(this.props.sent)/1000).calendar()}</Timestamp>
                </Options>
            </MessageOptionsContainer>
            : 
            null
        )
    }
}

class Messages extends Component {

    removeItem = (itemId) => {
        const itemRef = firebase.database().ref(`/messages/${this.props.currentChatIDRedux}/${itemId}`)
        itemRef.remove()
        const messageCountRef = firebase.database().ref(`messages/${this.props.currentChatIDRedux}`)
        messageCountRef.once('value', (snapshot) => {
            let messageCount = snapshot.val().messageCount
            messageCountRef.update({
                messageCount: messageCount - 1
            })
        })
    }

    render() {
        return(
            <MessagesContainer>
                {/* <button onClick={()=>console.log(props.messagesRedux)}>push</button> */}
                {this.props.currentChatIDRedux==="NEW MESSAGE" ? 
                    <NewMessageHeader>
                        Send new message to: {this.props.newMessageOtherUserEmailRedux}
                    </NewMessageHeader>
                    :
                    null
                }
                
                {this.props.messagesRedux.map((message, index)=> {
                    return(
                        <ShowHideMessages
                        messagesQuantity={this.props.messagesRedux.length}
                        index={index}
                        readTime={message.readTime}
                        emailRedux={this.props.emailRedux}
                        removeItem={this.removeItem}
                        key={index}
                        message={message.message}
                        email={message.email}
                        userMessage={message.user}
                        itemID={message.itemId}
                        sent={message.sent}
                        // id={this.props.messagesIDName}
                        idName={index===this.props.messagesRedux.length-12 ? 'desktop-messages': null}
                        />
                    )
                })
                }
            </MessagesContainer>
        )
    }
}

export default connect(mapStateToProps)(Messages)