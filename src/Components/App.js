import React, { Component } from 'react';
import "firebase/auth"
import "firebase/firestore"
import firebase, {auth, provider} from "../firebase"
import MessageContainer from "./MessageContainer"
import InboxContainer from "./InboxContainer"
import NewMessage from "./NewMessage"
import { AppContainer, 
  LogInButton, 
  InboxMessageContainer, 
  AppTitle,
  LogOutButton,
  HomepageContainer,
} from "../Styles/App.styles"
import { connect } from 'react-redux'
import { 
  addUser,
  addUserID,
  addCurrentChatID,
  addEmail,
  addNewMessageOtherUserEmail,
  addAllUserEmails,
  addAllCurrentUserIDs,
  addAllCurrentUserEmails,
  addMessages,
  preventScrollDown,
  loadMessagesText,
} from '../Redux/actions/appActions'

const mapStateToProps = (state) => ({
  messagesRedux: state.app.messagesRedux,
  userRedux: state.app.userRedux,
  currentChatIDRedux: state.app.currentChatIDRedux,
  isMessageRequest: state.requests.isMessageRequest,
  emailRedux: state.app.emailRedux,
  quantityLoadMessages: state.app.quantityLoadMessages,
  preventScrollDown: state.app.preventScrollDown,
})

class App extends Component {
  state = {
    username: "",
  }
  
  username = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  
  stayLoggedIn = () => {
    auth.onAuthStateChanged((user)=> {
      if(user){
        this.setState({
          username: user.displayName,
        })
        this.props.dispatch(addEmail(user.email))
        this.props.dispatch(addUserID(user.uid))
        this.props.dispatch(addUser(user))
        this.getUserInfo()
      }
    })
  }

  getUserInfo = () => {
    const itemRef = firebase.database().ref("users")
    itemRef.on('value', (snapshot) => {
      let users = snapshot.val()
      let usersArray = []
      for (let userId in users){
        usersArray.push(users[userId].email)
      }
      this.props.dispatch(addAllUserEmails(usersArray))
    })
  }
  
  componentDidMount() {
    this.stayLoggedIn()
    // this.addUserData("Fiona", "fiona@orange.com", "https://lh3.googleusercontent.com/a-/AOh14GiEWMCD6XAm34qOIe9A3LcvcHcPToUSdOroPHcb")
  }

  addUserData = (name, email, uid, photoURL) => {
    const userData = {
      name: name,
      email: email,
      dateCreated: Date.now(),
      photoURL: photoURL,
    }
    firebase.database().ref(`users/${uid}`).set(userData)
  }
  
  removeItem = (itemId) => {
    const itemRef = firebase.database().ref(`/messages/${this.props.currentChatIDRedux}/${itemId}`)
    itemRef.remove()
  }
  
  logout = () => {
    auth.signOut()
    this.props.dispatch(addMessages([]))
    this.props.dispatch(addAllCurrentUserIDs([]))
    this.props.dispatch(addAllCurrentUserEmails([]))
    this.props.dispatch(addAllUserEmails([]))
    this.props.dispatch(addNewMessageOtherUserEmail(''))
    this.props.dispatch(addEmail(''))
    this.props.dispatch(addCurrentChatID(null))
    this.props.dispatch(addUser(null))
    this.props.dispatch(addUserID(''))
  }

  getMessages = (id) => {
    const itemRef = firebase.database().ref(`messages/${id}`)
    let limitMessages = itemRef.orderByKey().limitToLast(this.props.quantityLoadMessages)
    limitMessages.on('value', (snapshot) => {
      let items = snapshot.val()
      let newState = []
      if(items){
        if(items['requestStatus']==='accepted'||items['request']!==this.props.emailRedux||(items['request']===this.props.emailRedux&&items['requestStatus']==='pending')){
          for (let item in items) {
            newState.push({
              itemId: item,
              user: items[item].user,
              message: items[item].message,
              email: items[item].email,
              sent: items[item].sent,
              read: items[item].read,
              readTime: items[item].readTime,
            })
          }
          if(this.props.messagesRedux){
            console.log('messages',this.props.messagesRedux.length)
            console.log('newstate',newState.length)
            if(this.props.messagesRedux.length+14===Object.keys(newState).length){
              this.props.dispatch(loadMessagesText('No more messages'))
            }
          }
          if(this.props.currentChatIDRedux===snapshot.ref_.path.pieces_[1]||this.props.currentChatIDRedux===id){
            this.props.dispatch(addMessages(newState))
          }
        }
      }
    })
    if(!this.props.preventScrollDown){
      document.getElementById('scroll-here').scrollIntoView()
      this.props.dispatch(preventScrollDown(false))
    }
  }

  login = () => {
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user
      this.setState({
        user,
        username: user.displayName
      })
      const userRef = firebase.database().ref("users")
      userRef.once('value', (snapshot)=>{
        let users = snapshot.val()
        let counter = 0
        for (const userData in users){
          if (users[userData].email===user.email){
            counter++
          }
        }
        if(counter===0){
          this.addUserData(user.displayName, user.email, user.uid, user.photoURL)
        }
      })
      this.getUserInfo()
    })
  }

  newMessageRoute = (input) => {
    const route = async () => {
      await this.props.dispatch(addCurrentChatID(input))
      await this.getMessages(input)
    }
    route()
  }

  test = () => {
    console.log(this.state.allUserEmails)
  }

  render(){
    return (
      <AppContainer>
        {/* <button onClick={this.getMessages}>get</button> */}
        {this.props.userRedux ?
          <LogOutButton className="br1 br3 pa2 ma1 dib" onClick={this.logout}>
            Log Out | {this.state.username}
          </LogOutButton>             
          :
          <HomepageContainer>
            <AppTitle>Messaging App</AppTitle>
            <LogInButton onClick={this.login}>LOG IN</LogInButton>              
          </HomepageContainer>
        }
        {this.props.userRedux ? 
        <div>
          <NewMessage 
          getMessages={this.getMessages}
          newMessageRoute={this.newMessageRoute}
          />
          <InboxMessageContainer>
            <InboxContainer 
            newMessageRoute={this.newMessageRoute}
            />
            <MessageContainer 
            newMessageRoute={this.newMessageRoute}
            getMessages={this.getMessages}
            usernameFunc={this.username}
            usernameState={this.state.username}
            removeItem={this.removeItem}
            />
          </InboxMessageContainer>
        </div>
        :
        null
        }
      </AppContainer>
    );
  }
}

export default connect(mapStateToProps)(App);
