import React, { Component } from 'react';
import axios from 'axios';
import DropDownItem from './DropdownItem.js'

class NavItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            Name: props.Name,
            ID: props.ID,
            Channels: [],
            APIIP: props.API
        }
    }

    async componentDidMount(){
        var url = this.state.APIIP + "GetTextChannels"
        var postData = {
            GuildID: this.state.ID
        }
        await axios.post(url, postData).then(res => {
            this.setState({
                Channels: res.data
            });
        });
    }

    render(){
        return(
            <li>
                <a id="dropdownMenuLink" href="#" className="NavItem dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.Name}</a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                   {
                       this.state.Channels.map(item => {
                           return <DropDownItem ID={item.id} Name={item.name} GuildID={this.state.ID} API={this.state.APIIP}/>
                       })
                   }
                </div>
            </li>
        );
    }

}

export default NavItem;