import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
const axios = require('axios').default;
// Handle Error:
// 1.Invalid i/p
// 2.Network prbs  



const CardList = (props)=>(
<div>
  {props.profile.map(profile => <Cards key={profile.id}{...profile}/>)}
</div>
);

class Cards extends Component{
  render(){
    const profile = this.props;
    return(
    	<div className="github-profile">
    	  <img src={profile.avatar_url} alt="no-img" />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
    	</div>
        );
  }
}

class Form extends Component{
  // UserName=React.createRef();
  // ref={this.UserName} in ip tag
  //or use controlled elements

  state = {username: ''};
  handleSubmit=async (event)=>{
    event.preventDefault();
      //this.UserName.current.value;
      const promise = await axios.get(`https://api.github.com/users/${this.state.username}`);
      // console.log(resp.data);
      this.props.onSubmit(promise.data);
      this.setState({username:''});

  };

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input  type="text" value = {this.state.username} 
        onChange={(event) =>this.setState({username: event.target.value})}
        placeholder="Github Username"  required/>
        <button> Add Card </button>
        </form>
    )
  }
}

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      profiles:[], 
    };
  }

  addNewProfile = (profileData)=>{
      // console.log("App", profileData);
      this.setState((prevState)=>({
        profiles: [...prevState.profiles,profileData],
      }));

  };

  render(){
    return (
      <div>
        <div className="header"> <h1>{this.props.title}</h1></div>
        <Form onSubmit={this.addNewProfile}/>
      <CardList profile={this.state.profiles}/>  
    
    </div>);
  }
}


export default App;
