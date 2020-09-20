import styled from 'styled-components'

export const ScrollStyles = styled.div`
    overflow: scroll;
    
    @media (max-width: 900px) {
        height: ${props=> (props.heightValue ? 'calc(100vh - 298px)' : 'calc(100vh - 100px)')};
    }
    @media (min-width: 900px) {
        height: ${props=> (props.heightValue ? 'calc(102vh - 200px)' : 'calc(96vh - 110px)')};
    }
    @media (max-height: 500px) {
        height: ${props=> (props.heightValue ? 'calc(102vh - 320px)' : 'calc(100vh - 170px)')};
    }
`