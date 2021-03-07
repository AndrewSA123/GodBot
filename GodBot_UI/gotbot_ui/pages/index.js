import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Webcam from 'react-webcam'
import Link from 'next/link'
import TitleBar from '../components/TitleBar'

export default function Home() {
  
  var data = JSON.stringify({"GuildID": "472872500888338452"});
  console.log(data);
  fetch('http://192.168.1.144:3344/GetAllMembers', {method: 'POST', mode : 'cors', body: data}).then(res => console.log(res));

  return (
    <div className={styles.container}>
      <Head>
        <title>GodBot UI</title>
        <link rel="icon" href="/Icon.svg" />
      </Head>

      <main className={styles.main}>
        <TitleBar SubTitle="Home assistant for Andrew" />

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Myers (Test name)</h3>
            <a className={styles.GridButton} href="someshit">
              Kick
            </a>
            <a className={styles.GridButton} href="someshit">
              Ban
            </a>
            <a className={styles.GridButton} href="someshit">
              Mute
            </a>
          </div>
        </div>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/AndrewSA123/GodBot"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created By Andrew Using
          <img src="/Github.png" alt="Githublogo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
