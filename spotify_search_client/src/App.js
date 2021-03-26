import React, { Component } from "react";
import hash from "./hash";
import logo from "./logo.svg";
import "./App.css";

import Dashboard from "./Dashboard";


//config information
const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = "a8749eeba17547c4b3a14da20261c2ee";

const redirectUri = "http://localhost:3000/";

const scopes = [
  "user-follow-modify",
  "user-read-recently-played",
];



  class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        token: null      
        
    };

    //this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }


  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      // Set token
      console.log(_token);
      this.setState({
        token: _token
      });
    }

  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
        
        {!this.state.token && (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              "%20"
            )}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}

        {this.state.token && (
              <Dashboard token ={this.state.token}/>
          )}
        
        </header>
      </div>
    );
  }
}
  
  
  export default App;


  /*
{this.state.token && (
        <Dashboard /> //acrescentar ao projeto
      )}

  */