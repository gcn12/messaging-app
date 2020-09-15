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

const mapStateToProps = (state) => ({
    currentChatIDRedux: state.app.currentChatIDRedux,
    messagesRedux: state.app.messagesRedux,
    isMessageRequest: state.requests.isMessageRequest,
    loadMessagesText: state.app.loadMessagesText
})

class MessageContainer extends Component {

    loadMoreMessages = () => {
        const runFunction = async () => {
            await this.props.dispatch(preventScrollDown(true))
            await this.props.dispatch(addQuantityLoadMessages(15))
            await this.props.getMessages(this.props.currentChatIDRedux)
        }
        runFunction()
    }

    render() {
        return(
            <div>
                <MessageContainerStyles className="message-container">
                    <Scroll height="79vh">
                    {this.props.messagesRedux.length > 23 ? 
                    <LoadContainer>
                        <LoadMore onClick={this.loadMoreMessages}>{this.props.loadMessagesText}</LoadMore>
                    </LoadContainer>
                    :
                    null
                    }
                        <Messages 
                        removeItem={this.props.removeItem} 
                        user={this.props.usernameState}
                        />
                        <div id="scroll-here"></div>
                    </Scroll>
                </MessageContainerStyles>
                    {this.props.currentChatIDRedux!==null ? 
                    (this.props.isMessageRequest ? 
                        <RequestButtons />
                        :
                        <MessageInput 
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