import styled from "styled-components"

export const InboxContainerStyle = styled.div`
width: 30vw;
height: 86vh; 
`

export const TabsContainer = styled.div`
    display: flex;
    color: white;
    justify-content: space-evenly;
`

export const InboxTab = styled.div`
    &:hover {
        cursor: pointer
    };
    text-decoration: ${props=> (props.isSelected ? 'underline' : 'null')}
`

export const RequestsTab = styled.div`
    &:hover {
        cursor: pointer;
    };
    text-decoration: ${props=> (props.isSelected ? 'null' : 'underline')}
`