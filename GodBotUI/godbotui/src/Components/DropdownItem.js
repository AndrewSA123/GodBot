import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SendMessageForm from './SendMessageForm.js';

class DropdownItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            Name: props.Name,
            ID: props.ID,
            GuildID: props.GuildID,
            APIIP: props.API
        }
    }

    componentDidMount(){
        //console.log(document.getElementById('BodyContent'));
    }

    GenerateForm = () => {
        var body = document.getElementById('BodyContent');
        ReactDOM.render(<SendMessageForm Name={this.state.Name} ID={this.state.ID} GuildID={this.state.GuildID} API={this.state.APIIP}/>, body);
    }

    render(){
        return(
                <a id={this.state.ID} className="dropdown-item" href="#" onClick={() => this.GenerateForm()}>{this.state.Name}</a>
        );
    }

}

export default DropdownItem;