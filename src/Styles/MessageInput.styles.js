import styled from 'styled-components'

export const MessageInputContainer = styled.div`
    margin-top: 10px;
    display: flex;
    width: 100%;
`
 
export const MessageInputArea = styled.textarea`
    height: 5vh;
    width: 93%;
    background-color: grey;
    border: none;
    color: white;
`
 
export const MessageInputButton = styled.button`
    &:hover {
        cursor: pointer
    }
`