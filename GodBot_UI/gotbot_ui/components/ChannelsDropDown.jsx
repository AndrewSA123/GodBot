import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React, {useState} from 'react';
import Bootstrap from 'react-bootstrap'
import {Button, Modal} from 'react-bootstrap'
import axios from 'axios'

export default class extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            Channels: []
        }
    }

    componentDidMount() {
        this.props.Channels.then(item => {
            this.setState({
                Channels: item
            })
        })

        console.log(this.state);
    }

    render(){
        if(this.state.Channels !== []){
            return (
                <select>{this.state.Channels.map(({name, id}) => ( <option key={id} id={id}>{name}</option>))}</select>
            )
        }else{
            return <div></div>
        }
        
    }   
}