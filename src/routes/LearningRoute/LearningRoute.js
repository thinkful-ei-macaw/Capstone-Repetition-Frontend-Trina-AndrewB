import React, { Component } from 'react'
import config from '../../config'
import Context from '../../Context'
// import './LearningRoute.css'
import TokenService from '../../services/token-service'


class LearningRoute extends Component {

  static contextType = Context

  handleSubmitBtn = e => {


  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${TokenService.getAuthToken()}`
      },
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }
      return res.json()
    })
    .then(head => {
      console.log(head)
      console.log(this.context)
      //this.context.setLanguage(head)
    })
  }

  render() {
    return (
      <section>
        implement and style me
      </section>
    );
  }
}

export default LearningRoute
