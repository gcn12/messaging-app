import React, { Component } from "react"
import { UserMessageStyle,
     NewMessageHeader, 
     MessagesContainer, 
     Options, 
     MessageOptionsContainer,
     Delete,
     Seen,
} from  "../Styles/Messages.styles"
import { connect } from 'react-redux'
// import { addQuantityLoadMessages } from '../Redux/actions/appActions'
import firebase from '../firebase'
import moment from 'moment'

const mapStateToProps = (state) => ({
    messagesRedux: state.app.messagesRedux,
    emailRedux: state.app.emailRedux,
    currentChatIDRedux: state.app.currentChatIDRedux,
    newMessageOtherUserEmailRedux: state.app.newMessageOtherUserEmailRedux,
    isMesssagesLoading: state.app.isMesssagesLoading,
})

class ShowHideMessages extends Component {
    state = {
        showOptions: false,
    }

    show = () => {
        this.setState({
            showOptions: true
        })
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
                        {this.props.message}
                        {(this.props.index===this.props.messagesQuantity-10)&&(this.props.readTime>0)&&(this.props.email===this.props.emailRedux) ? 
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
                    <div>{moment.unix(Number(this.props.sent)/1000).calendar()}</div>
                </Options>
            </MessageOptionsContainer>
            : 
            null
        )
    }
}

const ShowHideMessagesSpinner = Spinner(ShowHideMessages)

class Messages extends Component {


    removeItem = (itemId) => {
        const itemRef = firebase.database().ref(`/messages/${this.props.currentChatIDRedux}/${itemId}`)
        itemRef.remove()
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
                        <ShowHideMessagesSpinner 
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
                        />
                    )
                })
                }
            </MessagesContainer>
        )
    }
}

// export default Messages

export default connect(mapStateToProps)(Messages)