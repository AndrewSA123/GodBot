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

        const test = {
            DiscordInfo: {
                id: "159783547165605888",
                system: null,
                locale: null,
                flags: 0,
                username: "Andrew (BigCritz)",
                bot: false,
                discriminator: "6061",
                avatar: "acbaad2fbf3aa7847b248a7745ac5311",
                lastMessageChannelID: null,
                createdTimestamp: 1458165766279,
                defaultAvatarURL: "https://cdn.discordapp.com/embed/avatars/1.png",
                tag: "Andrew (BigCritz)#6061",
                avatarURL: "https://cdn.discordapp.com/avatars/159783547165605888/acbaad2fbf3aa7847b248a7745ac5311.webp",
                displayAvatarURL: "https://cdn.discordapp.com/avatars/159783547165605888/acbaad2fbf3aa7847b248a7745ac5311.webp"
            },
            LeagueInfo: {
                id: "kpC5jBRAKVR6wJBynqWRXQp8ToR0ambD5amM7qJxOVzFNSE",
                accountId: "NEu4vvylPQNzfu56N8tjBB4_5RvXPP9bMuZRz3cqcQaUCWg",
                puuid: "mkE2MNHsU_sbEW9MH_D-X6pcapg0vxtq_5cf3ENxWDHIDVRpHVZLWjUvO9PHbHLsIRlTqXOptImwug",
                name: "AssassinPlayers",
                profileIconId: 1105,
                revisionDate: 1623331124000,
                summonerLevel: 242
            }
        }

        this.state = {
            Members: [test]
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