import React from "react"
import Inbox from "./Inbox"
import Requests from './Requests'
import { InboxContainerStyle } from "../Styles/InboxContainer.styles"
import Scroll from "./Scroll"
import { connect } from 'react-redux'
import { isInboxTab } from "../Redux/actions/inboxActions"
import { TabsContainer,
    InboxTab,
    RequestsTab, 
} from '../Styles/InboxContainer.styles'
// import { ScrollStyles } from '../Styles/Scroll.styles'

const mapStateToProps = (state) => ({
    isInboxTab: state.inbox.isInboxTab,
    requestCount: state.requests.requestCount
})

const InboxContainer = (props) => {
    return(
        <div>
            <TabsContainer>
                <InboxTab isSelected={props.isInboxTab} onClick={()=>props.dispatch(isInboxTab(true))}>Inbox</InboxTab>
                <RequestsTab isSelected={props.isInboxTab} onClick={()=>props.dispatch(isInboxTab(false))}>Requests ({props.requestCount})</RequestsTab>
            </TabsContainer>
            {props.isInboxTab ? 
            <Scroll height={false}>
                <InboxContainerStyle>
                    <Inbox 
                    newMessageRoute={props.newMessageRoute}
                    />
                </InboxContainerStyle>
            </Scroll>
            :
            <Scroll height={false}>
                <InboxContainerStyle>
                    <Requests 
                    newMessageRoute={props.newMessageRoute}
                    />
                </InboxContainerStyle>
            </Scroll> 
            }
        </div>
    )
}

export default connect(mapStateToProps)(InboxContainer)