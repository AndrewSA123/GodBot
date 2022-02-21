import Head from 'next/head'
import styles from '../styles/Home.module.css'
import TitleBar from '../components/TitleBar'
import React from 'react'
import Footer from '../components/Footer'
const axios = require('axios');

export default class Lol extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            Members: []
        }
    }

    async componentDidMount(){
        let LeagueData = await axios.get('http://192.168.1.144:3344/League/GetAllLeagueData').then((res) => {
            return res.data;
        });

        this.setState({
            Members: LeagueData
        })
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
                        <div className={styles.MemberCards} key={item.DiscordInfo.id}>
                            <img src={item.DiscordInfo.displayAvatarURL} width="128px" height="128px"/>
                            <h2 className={styles.FancyText}>{item.DiscordInfo.username}</h2>
                            <h2 className={styles.FancyText}>{item.LeagueInfo.name}</h2>
                        </div>
                    ))}
                </main>
                
    
                <Footer />
            </div>
        )
    }
    
}