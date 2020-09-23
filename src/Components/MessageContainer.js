import React, { Component } from "react"
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import Scroll from "./Scroll" 
import { 
    MessageContainerStyles, 
    LoadMore, 
    LoadContainer
} from "../Styles/MessageContainer.styles"
import { connect } from 'react-redux'
import RequestButtons from "./RequestButtons"
import { 
    addQuantityLoadMessages,
    preventScrollDown,
} from '../Redux/actions/appActions'
import WithSpinner from '../Spinner/Spinner'

const MessagesSpinner = WithSpinner(Messages)

const mapStateToProps = (state) => ({
    currentChatIDRedux: state.app.currentChatIDRedux,
    messagesRedux: state.app.messagesRedux,
    isMessageRequest: state.requests.isMessageRequest,
    loadMessagesText: state.app.loadMessagesText,
    isMessagesLoading: state.app.isMessagesLoading,
    quantityLoadMessages: state.app.quantityLoadMessages,
})

class MessageContainer extends Component {

    loadMoreMessages = () => {
        const runFunction = async () => {
            await this.props.dispatch(preventScrollDown(true))
            await this.props.dispatch(addQuantityLoadMessages(this.props.quantityLoadMessages + 15))
            await this.props.getMessages(this.props.currentChatIDRedux)
        }
        runFunction()
    }

    render() {
        return(
            <div>
                <MessageContainerStyles className="message-container">
                    <Scroll height={true}>
                    {this.props.messagesRedux.length > 23 ? 
                    <LoadContainer>
                        <LoadMore onClick={this.loadMoreMessages}>{this.props.loadMessagesText}</LoadMore>
                    </LoadContainer>
                    :
                    null
                    }
                        <MessagesSpinner
                        isLoading={this.props.isMessagesLoading} 
                        removeItem={this.props.removeItem} 
                        user={this.props.usernameState}
                        messagesIDName={this.props.messagesIDName}
                        />
                        <div id={this.props.messagesIDName}></div>
                    </Scroll>
                </MessageContainerStyles>
                    {this.props.currentChatIDRedux!==null ? 
                    (this.props.isMessageRequest ? 
                        <RequestButtons />
                        :
                        <MessageInput 
                        messagesIDName={this.props.messagesIDName}
                        inputIDName={this.props.inputIDName}
                        newMessageRoute={this.props.newMessageRoute}
                        usernameState={this.props.usernameState}
                        getMessages={this.props.getMessages} 
                        usernameFunc={this.props.username} 
                        />
                        )
                    :
                    null
                    }  
            </div>
        )
    }
}

export default connect(mapStateToProps)(MessageContainer)