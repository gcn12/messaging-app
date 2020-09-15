import styled from "styled-components"

export const MessageOptionsContainer = styled.div`
    display: flex;
    flex-direction: ${props => (props.isCurrentUser ? "row-reverse" : "row")};
    align-items: center;
`

export const UserMessageStyle = styled.div`
    color: white;
    background-color: ${props => (props.isCurrentUser ? "rgb(45, 45, 45)" : "rgb(80, 80, 80)")};
    border: rgb(20,20,20) solid 1px;
    max-width: 45%;
    min-width: 15%;
    word-wrap:break-word;
    &:hover {
        cursor: pointer
    }
`

export const NewMessageHeader = styled.div`
    color: white;
`

export const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const Delete = styled.button`
    color: white;
    border: none;
    background-color: rgb(45, 45, 45);
    &:hover {
        cursor:pointer
    }
`

export const Options = styled.div`
    margin-top: 1rem;
    background: rgb(70,70,70);
    visibility: ${props=> (props.showOptions ?  'null': 'hidden')};
`

export const Seen = styled.div`
    font-size: 10px;
`