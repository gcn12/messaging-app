import styled from "styled-components"

export const CenterLogin = styled.div`
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const MobileContainer = styled.div`
    @media (min-width: 900px){
        display: none;
    }
`

export const ChatButtonsMobile = styled.div`
    @media (min-width: 900px) {
        display: none;
    }
`

export const AppContainer = styled.div`
    width: 100%;
`

export const LogOutButton = styled.button`
    border: none;
    color: white;
    cursor: pointer;
    background-color: rgb(80, 80, 80);
    margin: 5px 5px 5px 10px;
`

export const LogInButton = styled.button`
    border: none;
    /* height: 5vh;
    width: 20vw; */
    padding: 15px 20px;
    min-width: 200px;
    color: white;
    cursor: pointer;
    background-color: rgb(18, 208, 255);
    /* position: absolute; */
    /* top: 55%;
    left: 50%;
    transform: translate(-50%, -50%); */
    font-family: 'Lato';
    font-size:calc(12px + 1vw);
    &:hover {
        background-color: green;
    }
`

export const InboxMessageContainer = styled.div`
    display: flex;
`

export const AppTitle = styled.div`
    font-size: calc(8px + 3vw);
    color: white;
    font-family: 'Lato';
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const HomepageContainer = styled.div`
`

export const InboxMobile = styled.div`
    @media (max-width: 900px) {
        display: none;
    }
    display: flex;
`