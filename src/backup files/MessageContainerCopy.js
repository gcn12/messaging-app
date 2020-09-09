import React, { Component } from "react"
import "./MessageContainer.styles.js"
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import Scroll from "./Scroll" 
import { MessageContainerStyles } from "./MessageContainer.styles"

class MessageContainer extends Component {
    render() {
        return(
            <div>
                <MessageContainerStyles className="message-container">
                    <Scroll height="86vh" display="flex" flexDirection={this.props.currentChatID==="NEW MESSAGE" ? "row" : "column-reverse"}>
                        <Messages 
                        newMessageOtherUserEmail={this.props.newMessageOtherUserEmail}
                        currentChatID={this.props.currentChatID}
                        removeItem={this.props.removeItem} 
                        messages={this.props.messages} 
                        user={this.props.usernameState}
                        />
                    </Scroll>
                    {this.props.currentChatID!==null ? 
                    <MessageInput 
                    getCurrentID={this.props.getCurrentID}
                    newMessageRoute={this.props.newMessageRoute}
                    allUserEmails={this.props.allUserEmails}
                    newMessageOtherUserEmail={this.props.newMessageOtherUserEmail}
                    email={this.props.email}
                    usernameState={this.props.usernameState}
                    message={this.props.message}
                    currentChatID={this.props.currentChatID} 
                    getMessages={this.props.getMessages} 
                    usernameFunc={this.props.username} 
                    handleChange={this.props.handleChange} 
                    submit={this.props.submit}
                    messages={this.props.messages}
                    />
                    :
                    null
                    }  
                </MessageContainerStyles>
            </div>
        )
    }
}

export default MessageContainer