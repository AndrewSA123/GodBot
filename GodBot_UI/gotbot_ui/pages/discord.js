import Head from 'next/head'
import styles from '../styles/Home.module.css'
import TitleBar from '../components/TitleBar'
import React from 'react'
import Footer from '../components/Footer'
const axios = require('axios');

export async function getServerSideProps() {
    let Guilds = await axios.get('http://192.168.1.144:3344/GetAllGuilds').then(async (res) => {
        let returnData = [];
        await res.data.forEach(async (guild) => {
            let guildData = {
                name: guild.name,
                id: guild.id,
                Members: []
            }

            let guildID = {
                GuildID: guild.id
            };

            guildData.Members.push(await axios.post('http://192.168.1.144:3344/GetAllMembers', guildID).then((res) => {
                return res.data;
            }));

            //guildData.Members = guildMembers.data;
            //console.log(guildData);
            
            returnData.push(guildData);
            //console.log(returnData);

            return returnData;
        });
        //console.log(returnData);
        return returnData;
    });

    return {
      props: {
       Guilds: Guilds
      }
    }
  }

export default function discord(props){
    //console.log(props);
    return (
        <div className={styles.container}>
            <Head>
                <title>GodBot Ears</title>
                <link rel="icon" href="/Icon.svg" />
            </Head>

            <TitleBar SubTitle="GodBot Ears (Discord servers hosting GodBot)" />
            
            <main className={styles.main}>
                <div className={styles.grid}>
                    {props.Guilds.map(({name, id}) => (
                        <div key={id} className={styles.Column}>
                            <div key={id}>
                                <h3>{name}</h3>
                            </div>
                            <hr/>
                            
                        </div>
                    ))}
                </div>
            </main>
            

            <Footer />
        </div>
    )
}