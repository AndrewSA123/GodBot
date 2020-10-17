import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NavBar from './NavBar.js';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

ReactDOM.render(
  <React.StrictMode>
    <NavBar API={"http://localhost:3344/"} Guilds={GetNavData()}/>
    <div id="BodyContent">
      <App API={"http://localhost:3344/"} />
    </div>
    
  </React.StrictMode>,
  document.getElementById('root')
);

async function GetNavData() {
  var url = "http://localhost:3344/GetAllGuilds";
        var data = axios.get(url).then((res) => {
            return res.data;
        });

        return await data;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();