import Head from 'next/head'
import styles from '../styles/Home.module.css'
import TitleBar from '../components/TitleBar'
import React from 'react'
import Footer from '../components/Footer'
import Member from '../components/Member'
import MembersList from '../components/MembersList'
const axios = require('axios');

export async function getServerSideProps() {

    let Guilds = await axios.get('http://192.168.1.144:3344/Discord/GetAllGuilds').then((res) => {
        return res.data;
    });

    console.log(Guilds);

    return {
      props: {
       Guilds: Guilds
      }
    }
}

export default class extends React.Component{
    
    render(){
        return (
            <div className="container">
                <Head>
                    <title>GodBot Ears</title>
                    <link rel="icon" href="/icon.jpg" />
                </Head>
    
                <TitleBar SubTitle="GodBot Ears (Discord servers hosting GodBot)" />
                
                <main className={styles.main}>
                    <div className={styles.grid}>
                        {this.props.Guilds.map(({name, id}) => (
                            <div key={id} className={styles.Column}>
                                <div key={id}>
                                    <h3>{name}</h3>
                                </div>
                                <hr/>
                                <MembersList id={id}/>
                            </div>
                        ))}
                    </div>
                </main>
                
    
                <Footer />
            </div>
        )
    }
    
}