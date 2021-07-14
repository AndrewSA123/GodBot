import Head from 'next/head'
import styles from '../styles/Home.module.css'
import TitleBar from '../components/TitleBar'
import React from 'react'
import Footer from '../components/Footer'
import Member from '../components/Member'
import MembersList from '../components/MembersList'
const axios = require('axios');

export default class Lol extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            Members: [{displayName: "Andrew", displayAvatarURL: "https://cdn.discordapp.com/avatars/159783547165605888/acbaad2fbf3aa7847b248a7745ac5311.webp"}]
        }
    }
    
    render(){
        return (
            <div className="container">
                <Head>
                    <title>GodBot Ears</title>
                    <link rel="icon" href="/icon.jpg" />
                </Head>
    
                <TitleBar SubTitle="League Accounts for Discord Users" />
                
                <main className="row">
                    {this.state.Members.map((item) => (
                        <div className={styles.MemberCards}>
                            <img src={item.displayAvatarURL} width="128px" height="128px"/>
                            <h2 className={styles.FancyText}>{item.displayName}</h2>
                        </div>
                    ))}
                </main>
                
    
                <Footer />
            </div>
        )
    }
    
}