import React from "react"

const Scroll = (props) => {
    return(
        <div style={{overflow: "scroll", border: "5px black", height: props.height, display:props.display, flexDirection:props.flexDirection}}>
            {props.children}
        </div>
    )
}

export default Scroll