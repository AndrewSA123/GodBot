import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React, {useState} from 'react';
import Bootstrap from 'react-bootstrap'
import {Button, Modal} from 'react-bootstrap'
import axios from 'axios'
import MessageForm from './MessageForm';

export default class extends React.Component {

    constructor(props){
        super(props);

        let Channels = this.GetChannels(props.GuildID);
        this.state={
            show:false,
            channels:Channels
        }
    }

    GetChannels = async (id) => {

        var Input = {
            GuildID: id
        }

        let temp = await axios.post('http://192.168.1.144:3344/GetTextChannels', Input).then((res) => {
            return res.data;
        });

        return temp;
    }

    HandleModal = (val) => {
        if(val){
            this.setState({show:false});
        }else{
            this.setState({show:true});
            this.GetChannels(this.props.GuildID);
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
                                <MessageForm Channels={this.state.channels} GuildID={this.props.GuildID} UserID={this.props.UserID}/>
                            }
                        </Modal.Body>
                        <Modal.Footer>
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