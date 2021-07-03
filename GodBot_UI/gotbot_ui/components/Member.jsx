import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React from 'react'
import KickButton from '../components/KickButton'
import MessageButton from './MessageButton'


export default class extends React.Component {

    constructor(props){
        super(props);
    }

    //console.log(props);

    render(){
        return (
            <div>
                <div>
                    <div>
                        <p>{this.props.DisplayName}</p>
                    </div>
                    <div>
                        <MessageButton UserID={this.props.UserID} GuildID={this.props.GuildID}/>
                        <KickButton UserID={this.props.UserID} />
                    </div>
                    
                </div>
            </div>
        )
    }   
}