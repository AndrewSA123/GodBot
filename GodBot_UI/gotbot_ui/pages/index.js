import Head from 'next/head'
import styles from '../styles/Home.module.css'
import TitleBar from '../components/TitleBar'
import Footer from '../components/Footer'
const axios = require('axios');

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>GodBot UI</title>
        <link rel="icon" href="/Icon.svg" />
      </Head>

      <TitleBar SubTitle="Home assistant for Andrew" />

      <main className={styles.main}>
       
       

      </main>

      <Footer />
    </div>
  )
}
