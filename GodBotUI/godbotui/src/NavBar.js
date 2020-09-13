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
        console.log(this.state.guilds);
    }

    render() {
        return (

            <div className="NavBar">
                <ul id="NavBarUL">
                    {
                        this.state.guilds.map(item => {
                            return <li id={item.id}><a href="#" className="NavItem">{item.name}</a></li>
                        })
                    }
                </ul>
            </div>

        );
    }
}

export default NavBar;