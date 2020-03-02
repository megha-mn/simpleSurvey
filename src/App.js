import React, { Component } from 'react';
import './App.css';
var uuid = require('uuid');
var firebase = require('firebase');

//   var firebaseConfig = {
//   apiKey: "AIzaSyAK0Y3XvXQAi62cAKj4qI1-JDMRx--DHyE",
//   authDomain: "simplesurvey-e08f2.firebaseapp.com",
//   databaseURL: "https://simplesurvey-e08f2.firebaseio.com",
//   projectId: "simplesurvey-e08f2",
//   storageBucket: "simplesurvey-e08f2.appspot.com",
//   messagingSenderId: "822708198542",
//   appId: "1:822708198542:web:8b6fdff7bb61cc94c13ddf"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      id:uuid.v1(),
      name:'',
      answers :{
        q1:'',
        q2:'',
        q3:'',
        q4:''
      },
      submitted: false
    }
  }

  handleNameSubmit(e){
    var name = this.refs.name.value;
   this.setState({name : name});
    e.preventDefault();
  }

  handleQuestionsSubmit(e){
    console.log(this.state.id)
    firebase.database().ref('surveys/'+this.state.id).set({
      name : this.state.name,
      answers : this.state.answers
    });
    this.setState({submitted : true}, function(){
      console.log(this.state.submitted,"Submitted")
    })
    e.preventDefault();
  }

  handleQuestionChange(e){
    var answers = this.state.answers;
    if(e.target.name === 'q1'){
      answers.q1 = e.target.value;
    }else if(e.target.name === 'q2'){
      answers.q2 = e.target.value;
    }else if(e.target.name === 'q3'){
      answers.q3 = e.target.value;
    }else if(e.target.name === 'q4'){
      answers.q4 = e.target.value;
    }

    this.setState({answers:answers}, function(){
      console.log(this.state)
    })
  }

  render(){
    var user;
    var questions;
    if(this.state.name && this.state.submitted === false){
      user = <h2>Welcome {this.state.name}</h2>
      questions = <span>
        <h3>Survey Questions</h3>
        <form onSubmit={(e) => this.handleQuestionsSubmit(e)}>
          <div>
            <label>What is your favourite operating system</label><br />
            <input type="radio" name="q1" value="Windows" onChange={(e) => this.handleQuestionChange(e)} /> Windows<br />
            <input type="radio" name="q1" value="OSX" onChange={(e) => this.handleQuestionChange(e)} /> OSX<br />
            <input type="radio" name="q1" value="Linux" onChange={(e) => this.handleQuestionChange(e)} /> Linux<br />
            <input type="radio" name="q1" value="Solaris" onChange={(e) => this.handleQuestionChange(e)} /> Solaris<br />
            <input type="radio" name="q1" value="Others" onChange={(e) => this.handleQuestionChange(e)} /> Others<br />
          </div>

          <div>
            <label>What is your favourite brand of TV?</label><br />
            <input type="radio" name="q2" value="Sony" onChange={(e) => this.handleQuestionChange(e)} /> Sony<br />
            <input type="radio" name="q2" value="Samsung" onChange={(e) => this.handleQuestionChange(e)} /> Samsung<br />
            <input type="radio" name="q2" value="Green" onChange={(e) => this.handleQuestionChange(e)} /> Green<br />
            <input type="radio" name="q2" value="LG" onChange={(e) => this.handleQuestionChange(e)} /> LG<br />
            <input type="radio" name="q2" value="Others" onChange={(e) => this.handleQuestionChange(e)} /> Others<br />
          </div>

          <div>
            <label>What is your favourite Smartphone brand?</label><br />
            <input type="radio" name="q3" value="Apple" onChange={(e) => this.handleQuestionChange(e)} /> Apple<br />
            <input type="radio" name="q3" value="Samsung" onChange={(e) => this.handleQuestionChange(e)} /> Samsung<br />
            <input type="radio" name="q3" value="Nexus" onChange={(e) => this.handleQuestionChange(e)} /> Nexus<br />
            <input type="radio" name="q3" value="Oppo" onChange={(e) => this.handleQuestionChange(e)} /> Oppo<br />
            <input type="radio" name="q3" value="Others" onChange={(e) => this.handleQuestionChange(e)} /> Others<br />
          </div>

          <div>
            <label>What is your favourite CPU brand?</label><br />
            <input type="radio" name="q4" value="Intel" onChange={(e) => this.handleQuestionChange(e)} /> Intel<br />
            <input type="radio" name="q4" value="AMD" onChange={(e) => this.handleQuestionChange(e)} /> AMD<br />
            <input type="radio" name="q4" value="Nividia" onChange={(e) => this.handleQuestionChange(e)} /> Nividia<br />
            <input type="radio" name="q4" value="ARM" onChange={(e) => this.handleQuestionChange(e)} /> ARM<br />
            <input type="radio" name="q4" value="Others" onChange={(e) => this.handleQuestionChange(e)} /> Others<br />
          </div>
          <input type = "Submit" />
        </form>
      </span>

    } else if(!this.state.name && this.state.submitted === false){
      user = <span>
        <h2>Please Enter your name to start survey</h2>
        <form onSubmit={(e) => this.handleNameSubmit(e)}>
          <input type="text" placeholder = "Enter Name..." ref="name"/>
        </form>
      </span>
      questions = '';
    } else if(this.state.submitted === true){
      user = <h2>Thank you {this.state.name}</h2>
    }

  return (
    <div className="App">
      <div className="App-header text-center">
       <h2>Simple Survey</h2>
      </div>
      <div className="text-center">
        {user}
      </div>

      <div className="container">
        {questions}
      </div>
     
    </div>
  );
  }
}

export default App;
