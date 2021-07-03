import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Footer() {
    return (
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
    )
}