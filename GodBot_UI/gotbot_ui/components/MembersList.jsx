import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Member from './Member';
import axios from 'axios';
import React from 'react';

export default class extends React.Component {

    async componentDidMount(){
        var input = {
            GuildID: this.props.id
        }
        let Members = await axios.post('http://192.168.1.144:3344/GetAllMembers', input).then((res) => {
        return res.data;
        });
        this.setState({People: Members});
    }

    render(){
        //console.log(this.state);
        if(this.state !== null){
            return (
                <div key="MembersContainers">
                    {
                        this.state.People.map(({displayName, userID}) => (
                            <div className={styles.MemberCards} key={"User" + userID}>
                                <Member DisplayName={displayName} UserID={userID} GuildID={this.props.id}/>
                            </div>
                        ))
                    }
                </div>
            )
        }else{
            return <div></div>
        }
        
    }
    
}