import styled from 'styled-components'

export const Button = styled.div`
    color: white;
    padding-right: 20px;
    &:hover{
        cursor: pointer
    }
    text-decoration: ${props=>(props.isChatState ? 'underline' : 'none')}
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    &:hover{
        cursor: pointer
    }
`