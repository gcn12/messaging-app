import styled from "styled-components"

export const UserMessageStyle = styled.div`
    // padding-left: ${props => (props.isCurrentUser ? "40vw" : "10px")};
    color: white;
    background-color: ${props => (props.isCurrentUser ? "rgb(45, 45, 45)" : "rgb(80, 80, 80)")};
    border: rgb(20,20,20) solid 1px;
    max-width: 45%;
    min-width: 15%;
    align-self: ${props => (props.isCurrentUser ? "flex-end" : "flex-start")};
    word-wrap:break-word;
`

export const NewMessageHeader = styled.div`
    color: white;
`

export const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
`