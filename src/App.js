import React, { Component } from 'react';
import * as firebase from 'firebase';
import _ from 'lodash';
import ReactFileReader from 'react-file-reader';
import XLSX from 'xlsx';

const config = {
    apiKey: "AIzaSyAn6FzogWhHipWA8YMw6167fEFw-wtCIg8",
    authDomain: "check-in-c83c3.firebaseapp.com",
    databaseURL: "https://check-in-c83c3.firebaseio.com",
    projectId: "check-in-c83c3",
    storageBucket: "check-in-c83c3.appspot.com",
    messagingSenderId: "753899691952"
  };
const app = firebase.initializeApp(config);
const firebaseRef = firebase.database().ref('attendees');

class App extends Component {
  constructor() {
    super();
    this.state = {
      attendees: []
    }
    let attendees = [];
    const view = this;
    firebaseRef.on("value", function(snapshot) {
       attendees = _.toArray(snapshot.val());
       view.setState({
         attendees: attendees
       })
    }, function (error) {
       console.log("Error: " + error.code);
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    firebaseRef.push().set({
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      email: this.email.value,
      phone : this.phone.value
    });
  }

  render() {
    console.log(window.location.href.indexOf('participanti'));
    if (window.location.href.indexOf('participanti') > -1) {
      return (
        <div className="App"
        style={{'marginLeft': '10px' }}
        >
          <table border="1px" cellspacing="0" cellpadding="5px">
            <tbody>
              <tr>
                <th>Nume</th>
                <th>Prenume</th>
                <th>E-mail</th>
                <th>Telefon</th>
              </tr>
              {
                this.state.attendees.map(item => (
                  <tr>
                    <td>{item.lastname}</td>
                    <td>{item.firstname}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      )
    }
    return (
      <div className="App"
      style={{'marginLeft': '10px' }}
      >
      <br/>
        <form onSubmit={ e => this.handleSubmit(e)}   >
          Nume <br/>
          <input name="lastname" ref={input => this.lastname = input }/><br/>
          Prenume <br/>
          <input name="firstname" ref={input => this.firstname = input }/><br/>
          E-mail <br/>
          <input name="email" ref={input => this.email = input }/><br/>
          Nr. Telefon <br/>
          <input name="phone" ref={input => this.phone = input }/><br/>
          <button>Trimite</button>
        </form>
        <br/>
      </div>
    );
  }
}

export default App;
