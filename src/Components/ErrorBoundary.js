import React, { Component } from 'react'
import { Image404, 
    ErrorText, 
    ErrorContainer,  
    TextContainer,
    ImageContainer,
} from '../Styles/ErrorBoundary.styles'
import photo404 from '../9.png'

class ErrorBoundary extends Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, info){
        console.log(error)
    }

    render(){
        if(this.state.hasError) {
            return(
                <ErrorContainer>
                    <TextContainer>
                        <ErrorText>Something went wrong</ErrorText>
                    </TextContainer>
                    <ImageContainer>
                        <Image404 src={photo404}></Image404>
                    </ImageContainer>
                </ErrorContainer>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary