import styled from 'styled-components'

export const MessageInputContainer = styled.div`
    margin-top: 10px;
    display: flex;
    width: 100%;
`
 
export const MessageInputArea = styled.textarea`
    height: 40px;
    width: 93%;
    background-color: grey;
    border: none;
    color: white;
`
 
export const MessageInputButton = styled.div`
    border: solid 1px rgb(50,50,50);
    background-color: rgb(50,50,50);
    color: white;
    &:hover {
        cursor: pointer
    }
`