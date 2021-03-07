import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Webcam from 'react-webcam'
import Link from 'next/link'
import TitleBar from '../components/TitleBar'

export default function cameras(){
    return (
        <div className={styles.container}>
            <Head>
                <title>GodBot Eyes</title>
                <link rel="icon" href="/Icon.svg" />
            </Head>
            <TitleBar SubTitle="GodBots Eyes (Wifi Cameras)" />
            <Webcam />
        </div>
    )
}