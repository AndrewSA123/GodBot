import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React from 'react';
import Bootstrap from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

export default class extends React.Component {

    constructor(props){
        super(props);
    }

    Kick(id){
        console.log(id);
    }

    render(){
        return (
            <Button md={6} variant="danger" size="sm" type="button" onClick={() => this.Kick(this.props.UserID)}>Kick</Button>
        )
    }   
}