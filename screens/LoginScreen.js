import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
//import Firebase from '../backend/firebase.js/'
//import { user } from '../functions/node_modules/firebase-functions/lib/providers/auth';

var db = firebase.firestore();
var userCollection = db.collection('users')

function displayOKAlert(title, message) {
  Alert.alert(
    title,
    message
  );
}

function logUserIn(username, password, props) {
  firebase.auth().signInWithEmailAndPassword(username, password).then(function () {
    console.log('User has been signed in and added to list')
    props.navigation.navigate('Chatroom', { name: username })
  }).catch(function (err) {
    displayOKAlert('No account with that email was found', 'Feel free to create an account first!')
    console.log(err)
  })
}

let userInfo = {
  userValue: "",
  passwordValue: ""
}

function handleEmail(text) {
  userInfo.userValue = text
}

function handlePassword(text) {
  userInfo.passwordValue = text
}

export default class Login extends Component {

  render() {
    return (
      <KeyboardAvoidingView styles={styles.container} behavior="position" enabled keyboardVerticalOffset="100">
        <View styles={styles.view}>
          <TextInput
            style={[styles.textField, styles.email]}
            placeholder='Email'
            onChangeText={handleEmail}
          />
          <TextInput
            secureTextEntry
            style={styles.textField}
            placeholder='Password'
            onChangeText={handlePassword}
          />
          <TouchableOpacity style={styles.button} onPress={() => {
            logUserIn(userInfo.userValue, userInfo.passwordValue, this.props)
          }}
          >
            <Text style={styles.text}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            this.props.navigation.navigate('SignUp')
          }}
          >
            <Text style={styles.text}>New? Create an account!</Text>
          </TouchableOpacity>
        </View>
      </ KeyboardAvoidingView>
    );
  }
}


let screenHeight = Math.round(Dimensions.get('window').height)
let screenWidth = Math.round(Dimensions.get('window').width)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  textField: {
    height: 60,
    width: '80%',
    textAlign: 'center',
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1
  },
  email: {
    marginBottom: 30,
    marginTop: screenHeight * 0.3
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    padding: 10,
    width: 250
  },
  text: {
    textAlign: 'center'
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
})