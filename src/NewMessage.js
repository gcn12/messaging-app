import React, { Component } from "react"
// import firebase from "./firebase"
import { NewMessageButton, NewMessageInput, NewMessageContainer } from "./NewMessage.styles"

class NewMessage extends Component {

    state = {
        email: "",
        isUserExist: "",
    }

    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    createNewMessage = () => {
        if(this.state.email.length>0){
            const emailIndex = this.props.allCurrentUserEmails.indexOf(this.state.email)
            if(emailIndex!==-1){
                this.props.getMessages(this.props.allCurrentUserIDs[emailIndex])
                this.props.getCurrentID(this.props.allCurrentUserIDs[emailIndex])
                if(this.state.isUserExist==="user does not exist"){
                    this.setState({
                        isUserExist: "",
                    })
                }
            }else{
                for(let email of this.props.allUserEmails) {
                    if(this.state.email===this.props.email){
                        break
                    }else if(email===this.state.email){
                        this.props.clearMessages()
                        this.props.getCurrentID("NEW MESSAGE")
                        this.props.getNewMessageEmail(this.state.email)
                        this.setState({
                            isUserExist: ""
                        })
                        break
                    }else{
                        this.setState({
                            isUserExist: "user does not exist"
                        })
                    }
                }
            }
            document.getElementById("email-input").value=""
        }
    }

    render() {
        return(
            <NewMessageContainer>
                {/* New Message */}
                <NewMessageInput className="br2" id="email-input" onChange={this.handleEmail} placeholder="enter email"></NewMessageInput>
                <NewMessageButton className="br2" onClick={this.createNewMessage}>+</NewMessageButton>
                <div>{this.state.isUserExist}</div>
            </NewMessageContainer>
        )
    }
} 

export default NewMessage 