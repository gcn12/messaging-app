import styled from "styled-components"
import { ReactComponent as UnreadCircle } from './UnreadCircle.svg'

export const InboxContainer = styled.div`
    height: 90px;
    cursor: pointer;
    border: solid rgb(5,5,5) 1px;
    background-color: ${props=>(props.isCurrentThread ? "rgb(100,100,100) " : "rgb(40,40,40)")} ;
    color: white;
    display: flex;
    width: 97%;
`

export const ImageContainer = styled.div`
    width: 25%;
    float: left;
    align-items: center;
`

export const ProfileImage = styled.img`
    padding-left: 10px;
    height: 60px;
    width: 60px;
`

export const MessageContainer = styled.div`
    float: left;
    width: 50%;
    height: 50%;
`

export const InboxUser = styled.div`
    font-size: 20px;
`

export const InboxMessage = styled.div`
    word-wrap:break-word;
`


export const UndreadContainer = styled.div`
    float: right;
    width: 25%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const UnreadCircleIcon = styled(UnreadCircle)`

`

export const UnreadStyles = styled.div`
    position: absolute;
`