import React, { Component } from "react"
// import firebase from "./firebase"
import { NewMessageButton, NewMessageInput, NewMessageContainer } from "../Styles/NewMessage.styles"
import { connect } from 'react-redux'
import { addMessages } from '../Redux/actions/appActions'
import { addCurrentChatID, addNewMessageOtherUserEmail } from '../Redux/actions/appActions'

const mapStateToProps = (state) => ({
    allUserEmailsRedux: state.app.allUserEmailsRedux,
    emailRedux: state.app.emailRedux,
    allCurrentUserEmailsRedux: state.app.allCurrentUserEmailsRedux,
    allCurrentUserIDsRedux: state.app.allCurrentUserIDsRedux,
})

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
            const emailIndex = this.props.allCurrentUserEmailsRedux.indexOf(this.state.email)
            if(emailIndex!==-1){
                this.props.getMessages(this.props.allCurrentUserIDsRedux[emailIndex])
                this.props.dispatch(addCurrentChatID(this.props.allCurrentUserIDsRedux[emailIndex]))
                if(this.state.isUserExist==="user does not exist"){
                    this.setState({
                        isUserExist: "",
                    })
                }
            }else{
                for(let email of this.props.allUserEmailsRedux) {
                    if(this.state.email===this.props.emailRedux){
                        break
                    }else if(email===this.state.email){
                        this.props.dispatch(addMessages([]))
                        this.props.dispatch(addCurrentChatID('NEW MESSAGE'))
                        this.props.dispatch(addNewMessageOtherUserEmail(this.state.email))
                        this.setState({
                            isUserExist: ""
                        })
                        document.getElementById("email-input").value=""
                        break
                    }else{
                        this.setState({
                            isUserExist: "user does not exist"
                        })
                    }
                }
            }
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

export default connect(mapStateToProps)(NewMessage) 