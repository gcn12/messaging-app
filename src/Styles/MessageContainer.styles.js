import styled from "styled-components"

export const MessageContainerStyles = styled.div`
    @media (max-width: 900px){
        width: 100vw;
        height: calc(98vh - 270px);
    }
    @media (min-width: 900px){
        width: 55vw;
        height: calc(100vh - 230px);
    }
    @media (min-width: 1100px){
        width: 700px;
        height: calc(100vh - 230px);
    }
    @media (max-height: 500px){
        height: calc(100vh - 300px);
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