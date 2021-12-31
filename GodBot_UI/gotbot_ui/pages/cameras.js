import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Webcam from 'react-webcam'
import TitleBar from '../components/TitleBar'
import React from 'react'
import Footer from '../components/Footer'

export default function cameras(){
    return (
        <div className="container">
            <Head>
                <title>GodBot Eyes</title>
                <link rel="icon" href="/icon.jpg" />
            </Head>

            <TitleBar SubTitle="GodBots Eyes (Wifi Cameras)" />

            <main className={styles.main}>
                <iframe width="644" height="484" src="http://192.168.1.163:8081"></iframe>
            </main>
            

            <Footer />
        </div>
    )
}