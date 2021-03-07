import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Webcam from 'react-webcam'
import Link from 'next/link'

export default function cameras(){
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Godbots Eyes</h1>
            <h3 className={styles.FancyText}>
                <Link href="/">Back</Link>
            </h3>
            <Webcam />
        </div>
        
    )
}