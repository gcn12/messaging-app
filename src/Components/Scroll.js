import React from "react"
import { ScrollStyles } from '../Styles/Scroll.styles'

const Scroll = (props) => {
    return(
        // <div style={{overflow: "scroll", border: "5px black", height: props.height, display:props.display, flexDirection:props.flexDirection}}>
        //     {props.children}
        // </div>
        <ScrollStyles heightValue={props.height}>
            {props.children}
        </ScrollStyles>
    )
}

export default Scroll