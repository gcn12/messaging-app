import styled from "styled-components"

export const MessageContainerStyles = styled.div`
    @media (max-width: 900px){
        height: 81vh;
        width: 100vw;
    }
    @media (min-width: 900px){
        height: 81vh;
        width: 55vw;
    }
    @media (min-width: 1100px){
        height: 81vh;
        width: 700px;
    }
    border: 5px solid rgb(30,30,30);
`

export const LoadContainer = styled.div`
    display: flex;
    justify-content: center;
`

export const LoadMore = styled.button`
    color: white;
    background-color: rgb(40,40,40);
    border: none;
    &:hover {
        cursor: pointer
    }
`