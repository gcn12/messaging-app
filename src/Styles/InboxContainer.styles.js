import styled from "styled-components"

export const InboxContainerStyle = styled.div`
    @media (max-width: 900px) {
        width: 100vw;
        height: 86vh; 
    }
    @media (min-width: 900px) {
        width: 400px;
        height: 200px; 
    }
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