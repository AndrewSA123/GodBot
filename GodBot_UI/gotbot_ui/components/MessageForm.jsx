import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React, {useState} from 'react';
import Bootstrap from 'react-bootstrap'
import {Button, Modal, InputGroup, FormControl} from 'react-bootstrap'
import axios from 'axios'

export default class MessageForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            Channels: [],
            res: ""
        }
    }

    componentDidMount() {
        this.props.Channels.then(item => {
            this.setState({
                Channels: item,
                selection: item[0]
            })
            //console.log(this.state)
        })
    }

    async Message(){

        var SendInput = {
            GuildID: this.props.GuildID,
            Mention: this.props.UserID,
            Channel: this.state.selection.id,
            Message: this.state.Message
        }

        let response = await axios.post('http://192.168.1.144:3344/Discord/SendMessageWithMention', SendInput).then(res => {
            return res.data
        });

        //console.log(response);

        let resp = response.Message + " |\nMessage: " + SendInput.Message;

        this.setState({
            res: resp
        })
    }

    HandleChange(){
        this.setState({selection: this.state.Channels[this.menu.selectedIndex]});
    }

    render(){
        if(this.state.Channels !== []){
            return (
                <div>
                    <select className="form-control col-md-12" ref={(input) => this.menu = input} onChange={() => this.HandleChange()}>{this.state.Channels.map(({name, id}) => ( <option key={id} id={id}>{name}</option>))}</select>
                    <InputGroup className="col-md-12">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="MessageBox">Message</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Oh Hi Mark"
                            aria-label="MessageBox"
                            onChange={e => this.setState({Message: e.target.value})}
                        />
                    </InputGroup>
                    <Button md={3} variant="info" onClick={() => this.Message()}>Send</Button>
                    <p id="Response">{this.state.res}</p>
                </div>
            )
        }else{
            return (
                <div>
                    <p>Something went wrong somewhere mate!</p>
                </div>
            )
        }
        
    }   
}