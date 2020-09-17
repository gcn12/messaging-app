import React from 'react' 
import { Button, ButtonContainer } from '../Styles/InboxChatButton.styles'

const InboxChatButtons = (props) => {
    return(
        <ButtonContainer>
            <Button onClick={()=>props.isChat(true, false)}>
                Inbox
            </Button>
            <Button onClick={()=>props.isChat(false, true)}>
                Chat
            </Button>
        </ButtonContainer>
    )
}

export default InboxChatButtons