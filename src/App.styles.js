import styled from "styled-components"

export const AppContainer = styled.div`
    width: 100%;
    // position: relative;
`

export const LogOutButton = styled.button`
    border: none;
    height: 30px;
    width: 160px;
    color: white;
    cursor: pointer;
    background-color: rgb(80, 80, 80);
    margin: 5px 5px 5px 10px;
`

export const LogInButton = styled.button`
    border: none;
    height: 5vh;
    width: 20vw;
    color: white;
    cursor: pointer;
    background-color: rgb(18, 208, 255);
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Lato';
    font-size: 2vw;
    &:hover {
        background-color: green;
    }
`

export const InboxMessageContainer = styled.div`
    display: flex;
`

export const AppTitle = styled.div`
    font-size: 6vw;
    color: white;
    font-family: 'Lato';
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
`