import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Webcam from 'react-webcam'
import Link from 'next/link'
import NavBar from '../components/NavBar'

export default function TitleBar(props) {
    return (
        <div>
            <h1 className={styles.title}>
                <Link href="/">GodBot</Link> Home Assistant/Discord Bot
            </h1>

            <p className={styles.description}>
                {props.SubTitle}
            </p>
            <NavBar />
            <hr/>
        </div>
        
    )
}