import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import axios from 'axios';
import { ReactionEmoji } from 'discord.js';

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            APIIP: props.API,
            guilds: []
        };
    }

    async componentDidMount() {
        var NavBar = document.getElementById('NavBarUL');
        var url = this.state.APIIP + "GetAllGuilds";
        await axios.get(url).then((res) => {
            this.state.guilds = res.data;
            
        });

        for (var i = 0; i < this.state.guilds.length; i++) {
            console.log(this.state.guilds[i].name);
            ReactDOM.render(<li id={this.state.guilds[i].id}><a href="#" className="NavItem">{this.state.guilds[i].name}</a></li>, NavBar);
        }

        
        
    }

    render() {
        return (

            <div className="NavBar">
                <ul id="NavBarUL">
                    {this.guilds}
                    {/* <li><a href="#" className="NavItem">Test Item 1</a></li>
                    <li><a href="#" className="NavItem">Test Item 2</a></li> */}
                </ul>
            </div>

        );
    }
}

export default NavBar;