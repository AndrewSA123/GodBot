import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Member from './Member';
import axios from 'axios';
import React from 'react';

export default class MemberList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            People: []
        }
    }

    async componentDidMount(){
        var input = {
            GuildID: this.props.id
        }
        let Members = await axios.post('http://192.168.1.144:3344/Discord/GetAllMembers', input).then((res) => {
        return res.data;
        });
        this.setState({People: Members});
    }

    render(){
        //console.log(this.state);
        return (
            <div key="MembersContainers" className="row">
                {
                    this.state.People.map(({displayName, userID}) => (
                        <div className={styles.MemberCards} key={userID}>
                            <Member DisplayName={displayName} UserID={userID} GuildID={this.props.id}/>
                        </div>
                    ))
                }
            </div>
        )    
    }
}