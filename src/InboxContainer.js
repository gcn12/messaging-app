import React from "react"
import Inbox from "./Inbox"
import { InboxContainerStyle } from "./InboxContainer.styles"
import Scroll from "./Scroll"

const InboxContainer = (props) => {
    return(
        <Scroll height="91vh">
            <InboxContainerStyle>
                <Inbox 
                getCurrentID={props.getCurrentID}
                email={props.email}
                currentChatID={props.currentChatID}
                getUserEmailsAndMessageIDsFromInbox={props.getUserEmailsAndMessageIDsFromInbox}
                newMessageRoute={props.newMessageRoute}
                />
            </InboxContainerStyle>
        </Scroll>
    )
}

export default InboxContainer