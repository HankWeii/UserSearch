import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'


export default class Search extends Component {

  

  search = () =>{
    const {keyWordElement:{value:keyWord}} = this
    PubSub.publish('update', {isFirst:false,loading:true})
    axios.get(`https://api.github.com/search/users?q=${keyWord}`).then(
      response => {
        PubSub.publish('update', {users:response.data.items, loading:false})
      },
      err => {
        PubSub.publish('update', {loading:false, err:err.message})
      }
    )
  }

  onKeyUp = (e)=>{
    if(e.keyCode === 13) {
      this.search()
    } else {
      return
    }
  }

  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input onKeyUp={this.onKeyUp} ref={c => this.keyWordElement = c} type="text" placeholder="enter the name you search"/>&nbsp;<button onClick={this.search}>Search</button>
        </div>
      </section>
    )
  }
}
