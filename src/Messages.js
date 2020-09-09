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
                    message.message ? 
                    <UserMessageStyle key={index} isCurrentUser={props.email===message.email ? true : false} className={props.user===message.user ? "current-user  grow br3 pa3 ma1 dib bw2 shadow-5" : "other-user grow br3 pa3 ma2 dib bw2 shadow-5"}>
                        {message.itemId!=="lastMessage"&&message.itemId!=="user1"&&message.itemId!=="user2"&&message.itemId!=="user2Photo"&&message.itemId!=="user1Photo"&&message.itemId!=="user2Email"&&message.itemId!=="user1Email" ? 
                        <div>
                            {/* {message.user} */}
                            {message.message}
                            {/* <button onClick={()=>props.removeItem(message.itemId)}>remove</button> */}
                            <br></br>
                        </div>
                        :
                        null
                        }
                    </UserMessageStyle>
                    : 
                    null
                )
            })}
        </MessagesContainer>
    )
}

export default Messages