import React, { Component } from 'react'
import PubSub, { unsubscribe } from 'pubsub-js'
import './index.css'

export default class List extends Component {
    state = {
        users :[],
        isFirst: true,
        loading: false,
        err: ''
    }

    componentDidMount() {
        this.token = PubSub.subscribe('update',(_,stateObj)=>{
            this.setState(stateObj)
        })
    }

    componentWillUnmount() {
        unsubscribe(this.token)
    }

    render() {
        const {users,isFirst,loading,err} = this.state
        return(
            <div className="row">
                {
                    isFirst ? <h2>輸入用戶名稱後按搜索</h2> :
                    loading ? <h2>Loading...</h2> :
                    err ? <h2 style={{color:'red'}}>{err}</h2> :
                    users.map((usersObj)=>{
                        return (
                            <div key={usersObj.id} className="card">
                                <a rel="noreferrer" href={usersObj.html_url} target="_blank">
                                    <img alt='head_pic' src={usersObj.avatar_url} style={{width: '100px'}}/>
                                </a>
                                <p className="card-text">{usersObj.login}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
