import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Bootstrap from 'react-bootstrap'
import {Button, Modal, InputGroup, FormControl, Nav} from 'react-bootstrap'

export default function NavBar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/#">
          <img src="/icon.jpg" width="75px" height="75px"/>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/"><b>Home</b></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cameras"><b>Cameras</b></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/discord"><b>Discord</b></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Lol"><b>League</b></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dnd"><b>ITS D AND D</b></a>
            </li>
          </ul>
        </div>
      </nav>
    )
}