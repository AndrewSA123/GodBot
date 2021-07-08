import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React from 'react'
import KickButton from '../components/KickButton'
import MessageButton from './MessageButton'
import axios from 'axios'


export default class extends React.Component {

    constructor(props){
        super(props);
    }

    async componentDidMount(){
        let input = {
            MemberID: this.props.UserID
        }

        let userDetails = await axios.post('http://192.168.1.144:3344/GetMemberByID', input).then(res => {
            this.setState({
                userDetail: res.data
            })
            //console.log(this.state);
        });
    }

    //console.log(props);

    render(){
        if(this.state !== null){
            return (
                <div>
                    <div>
                        <div>
                            <img src={this.state.userDetail.displayAvatarURL} width="128px" height="128px" />
                        </div>
                        <div>
                            <p>{this.props.DisplayName}</p>
                        </div>
                        <div>
                            <MessageButton UserID={this.props.UserID} GuildID={this.props.GuildID}/>
                            <KickButton UserID={this.props.UserID} />
                        </div>
                        
                    </div>
                </div>
            )
        }else{
            return (
                <div></div>
            )
        }
        
    }   
}