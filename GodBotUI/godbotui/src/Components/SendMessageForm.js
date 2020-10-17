import React, { Component } from 'react';
import axios from 'axios';

class NavItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            Name: props.Name,
            ID: props.ID,
            GuildID: props.GuildID,
            APIIP: props.API
        }
    }

    async componentDidMount(){
        
    }

    SendMessage = () => {
        var message = document.getElementById('message').value;
        var url = this.state.APIIP;
        
        if(message[0] == "@"){
            url = url + "SendMessageWithMention"

        }
        else{
            url = url + "SendMessage";
            var PostData = {
                GuildID: this.state.GuildID,
                Channel: this.state.ID,
                Message: message
            };

            axios.post(url, PostData).then(res => {
                console.log("Sent");
            })
        }
    }
    //TODO: Add list of people in channel to send message too

    render(){
        return(
            <div className="App-header" >
                <div className="header">
                    <h1>{this.state.Name}</h1>
                </div>
                <div>
                    <label>
                        Message:
                    <input type="text" name="Message" className="form-control" id="message" />
                    </label>
                    <input type="submit" value="Send" onClick={() => this.SendMessage()} className="btn btn-info"/>
                </div>
            </div>
        );
    }

}

export default NavItem;