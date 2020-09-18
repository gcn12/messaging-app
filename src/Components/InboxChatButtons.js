import React from 'react' 
import { Button, ButtonContainer } from '../Styles/InboxChatButton.styles'

const InboxChatButtons = (props) => {
    return(
        <ButtonContainer>
            <Button isChatState={!props.isChatState} onClick={()=>props.isChat(false)}>
                Inbox
            </Button>
            <Button isChatState={props.isChatState} onClick={()=>props.isChat(true)}>
                Chat
            </Button>
        </ButtonContainer>
    )
}

export default InboxChatButtons