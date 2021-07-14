import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function NavBar() {
    return (
        <div className={styles.NavBar}>
          <div className={styles.NavBaritem}>
            <p className={styles.FancyText}>
              <Link href="/cameras">Cameras</Link>
            </p>
          </div>
          <div className={styles.NavBaritem}>
            <p className={styles.FancyText}>
                <Link href="/discord">Discord</Link>
            </p>
          </div>
          <div className={styles.NavBaritem}>
            <p className={styles.FancyText}>
                <Link href="/Lol">League</Link>
            </p>
          </div>
          <div className={styles.NavBaritem}>
            <p className={styles.FancyText}>
                <Link href="/tbd">TBD</Link>
            </p>
          </div>
        </div>
    )
}