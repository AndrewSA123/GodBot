import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function NavBar() {
    return (
        <div className={styles.NavBar}>
          <div className={styles.NavbarItem}>
            <p className={styles.FancyText}>
              <Link href="/cameras">Cameras</Link>
            </p>
          </div>
        </div>
    )
}