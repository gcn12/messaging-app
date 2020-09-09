import styled from "styled-components"

export const UserMessageStyle = styled.div`
    padding-left: ${props => (props.isCurrentUser ? "40vw" : "10px")};
    display: flex;
    align-items: flex-end;
    color: white;
    background-color: ${props => (props.isCurrentUser ? "rgb(50, 50, 50)" : "rgb(80, 80, 80)")};
    border: rgb(20,20,20) solid 1px;
    // width: 48vw;
`

export const NewMessageHeader = styled.div`
    color: white;
    display: flex;
    align-items: center;
`

export const MessagesContainer = styled.div`
    // display: flex;
`