import React, { Component } from 'react';
import "firebase/auth"
import "firebase/firestore"
import firebase, {auth, provider} from "./firebase"
import MessageContainer from "./MessageContainer"
import InboxContainer from "./InboxContainer"
import NewMessage from "./NewMessage"
import { AppContainer, 
  LogInButton, 
  InboxMessageContainer, 
  AppTitle,
  LogOutButton
  } from "./App.styles"


class App extends Component {
  
  state = {
    messages: [],
    // message: "",
    username: "",
    user: null,
    allUserEmails: [],
    userID: "",
    currentChatID: null,
    allCurrentUserEmails: [],
    allCurrentUserIDs: [],
    email: "",
    newMessageOtherUserEmail: "",
  }
  
  username = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  
  getCurrentID = (id) => {
    this.setState({
      currentChatID: id
    })
  }
  
  stayLoggedIn = () => {
    auth.onAuthStateChanged((user)=> {
      if(user){
        this.setState({
          user,
          username: user.displayName,
          userID: user.uid,
          email: user.email,
        })
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
      this.setState({
        // allUserEmails: [...this.state.allUserEmails, users[userId].email]
        allUserEmails: usersArray
      })
    })
  }

  getUserEmailsAndMessageIDsFromInbox = (emails, IDs) => {
    this.setState({
      allCurrentUserEmails: emails,
      allCurrentUserIDs: IDs
    })
  }
  
  componentDidMount() {
    this.stayLoggedIn()
    // this.getUserInfo()
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
  
  // handleChange = (e) => {
  //   this.setState({
  //     message: e.target.value
  //   })
  // }
  
  removeItem = (itemId) => {
    const itemRef = firebase.database().ref(`/messages/${this.state.currentChatID}/${itemId}`)
    itemRef.remove()
  }
  
  logout = () => {
    auth.signOut()
    .then(()=> {
      this.setState({
        user: null,
        messages: [],
        // message: "",
        username: "",
        allUserEmails: [],
        userID: "",
        allCurrentUserEmails: [],
        allCurrentUserIDs: [],
        email: "",
        currentChatID: null,
      })
    })
  }

  getMessages = (id) => {
    const itemRef = firebase.database().ref(`messages/${id}`)
    itemRef.on('value', (snapshot) => {
      let items = snapshot.val()
      let newState = []
      for (let item in items) {
        newState.push({
          itemId: item,
          user: items[item].user,
          message: items[item].message,
          email: items[item].email,
        })
        document.getElementById('scroll-here').scrollIntoView()
      }
      if(this.state.currentChatID===snapshot.ref_.path.pieces_[1]||this.state.currentChatID===id){
        this.setState({
          messages: newState
        })
      }
    })
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
      await this.getCurrentID(input)
      await this.getMessages(input)
    }
    route()
  }

  getNewMessageEmail = (email) => {
    this.setState({
      newMessageOtherUserEmail: email
    })
  }

  clearMessages = () => {
    this.setState({
      messages: []
    })
  }

  render(){
    return (
      <AppContainer>
        {this.state.user ?
          <LogOutButton className="br1" onClick={this.logout}>
            Log Out | {this.state.username}
          </LogOutButton>             
          :
          <div>
            <AppTitle>Messaging App</AppTitle>
            <LogInButton onClick={this.login}>LOG IN</LogInButton>              
          </div>
        }
        {this.state.user ? 
        <div>
          <NewMessage 
          clearMessages={this.clearMessages}
          getNewMessageEmail={this.getNewMessageEmail}
          email={this.state.email}
          getMessages={this.getMessages}
          allCurrentUserEmails={this.state.allCurrentUserEmails}
          allCurrentUserIDs={this.state.allCurrentUserIDs}
          getCurrentID={this.getCurrentID}
          allUserEmails={this.state.allUserEmails}
          newMessageRoute={this.newMessageRoute}
          />
          <InboxMessageContainer>
            <InboxContainer 
            getCurrentID={this.getCurrentID}
            email={this.state.email}
            currentChatID={this.state.currentChatID}
            getUserEmailsAndMessageIDsFromInbox={this.getUserEmailsAndMessageIDsFromInbox}
            newMessageRoute={this.newMessageRoute}
            />
            <MessageContainer 
            getCurrentID={this.getCurrentID}
            newMessageRoute={this.newMessageRoute}
            allUserEmails={this.state.allUserEmails}
            newMessageOtherUserEmail={this.state.newMessageOtherUserEmail}
            email={this.state.email}
            message={this.state.message}
            currentChatID={this.state.currentChatID}
            getMessages={this.getMessages}
            usernameFunc={this.username}
            usernameState={this.state.username}
            handleChange={this.handleChange}
            messages={this.state.messages}
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

export default App;
