import React from "react"
import { UserMessageStyle, NewMessageHeader, MessagesContainer } from  "./Messages.styles"
const Messages = (props) => {
    return(
        <MessagesContainer>
            {props.currentChatID==="NEW MESSAGE" ? 
            <NewMessageHeader>
                Send new message to: {props.newMessageOtherUserEmail}
            </NewMessageHeader>
            :
            null
            }
            {props.messages.map((message, index)=> {
                return(
                    <UserMessageStyle key={index} isCurrentUser={props.user===message.user ? true : false} className={props.user===message.user ? "current-user" : "other-user"}>
                        {message.itemId!=="lastMessage"&&message.itemId!=="user1"&&message.itemId!=="user2"&&message.itemId!=="user2Photo"&&message.itemId!=="user1Photo"&&message.itemId!=="user2Email"&&message.itemId!=="user1Email" ? 
                        <div>
                            {message.user}
                            <br></br>
                            {message.message}
                            <button onClick={()=>props.removeItem(message.itemId)}>remove</button>
                            <br></br>
                            <br></br>
                            <br></br>
                        </div>
                        :
                        null
                        }
                    </UserMessageStyle>
                )
            })}
        </MessagesContainer>
    )
}

export default Messages