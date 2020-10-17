import React, { Component } from 'react';
import NavItem from './Components/NavItem.js'

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            APIIP: props.API,
            guilds: props.Guilds,
            thenGuilds: []
        };
    }

    componentDidMount() {
        this.state.guilds.then(item => {
            this.setState({
                thenGuilds: item
            });
        });

        
    }

    render() {
        return (

            <div className="NavBar">
                <ul id="NavBarUL">
                    {
                        this.state.thenGuilds.map(item => {
                            return <NavItem Name={item.name} ID={item.id} API={this.state.APIIP}/>
                        })
                    }
                </ul>
            </div>

        );
    }
}

export default NavBar;