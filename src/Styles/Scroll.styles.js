import styled from 'styled-components'

export const ScrollStyles = styled.div`
    overflow: scroll;
    
    @media (max-width: 900px) {
        height: ${props=> (props.heightValue ? 'calc(100vh - 200px)' : 'calc(100vh - 100px)')};
    }
    @media (min-width: 900px) {
        height: ${props=> (props.heightValue ? 'calc(102vh - 200px)' : 'calc(100vh - 100px)')};
    }
    @media (max-height: 500px) {
        height: ${props=> (props.heightValue ? 'calc(102vh - 240px)' : 'calc(100vh - 100px)')};
    }
`