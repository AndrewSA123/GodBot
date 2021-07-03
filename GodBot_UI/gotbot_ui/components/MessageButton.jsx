import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React, {useState} from 'react';
import Bootstrap from 'react-bootstrap'
import {Button, Modal} from 'react-bootstrap'
import axios from 'axios'

export default class extends React.Component {

    constructor(props){
        super(props);
        this.state={
            show:false
        }
    }

    async Message(){
        // var channelInput = {
        //     GuildID: this.props.GuildID
        // }
        // let channels = await axios.post('http://192.168.1.144:3344/GetTextChannels', channelInput).then((res) => {
        // return res.data;
        // });

        // this.setState({
        //     Channels: channels
        // })

        var SendInput = {
            GuildID: "472872500888338452",
            Mention: "364805721100910592",
            Channel: "472875906466185226",
            Message: "Yeah BOI"
        }

        axios.post('http://192.168.1.144:3344/SendMessageWithMention', SendInput);
    }

    HandleModal = (val) => {
        if(val){
            this.setState({show:false});
        }else{
            this.setState({show:true});
        }
    }

    render(){
        if(this.state !== null){
            return (
                <div md={6}>
                    <Button variant="info" size="sm" type="button" onClick={() => this.Message(this.props.UserID), () => this.HandleModal(this.state.show)}>Message</Button>
                    <Modal show={this.state.show} keyboard={false} backdrop="static">
                        <Modal.Header>
                            <Modal.Title>Send Message</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="info" onClick={() => this.Message()} >Send</Button>
                            <Button variant="danger" onClick={() => this.HandleModal(this.state.show)}>
                                close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }else{
            return (
                <div md={6}>
                    <Button variant="info" size="sm" type="button" onClick={() => this.Message(this.props.UserID)}>Message</Button>
                </div>
            )
        }

        
    }   
}