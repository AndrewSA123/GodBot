import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      APIIP: props.API
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Spinny thing ^
          </p>
          <p id="test"></p>
          <a
            className="App-link"
            href="https://github.com/AndrewSA123/GodBot"
            target="_blank"
            rel="noopener noreferer"
          >
            GodBot Github
          </a>
        </header>
      </div>
    );
  }
}



export default App;
