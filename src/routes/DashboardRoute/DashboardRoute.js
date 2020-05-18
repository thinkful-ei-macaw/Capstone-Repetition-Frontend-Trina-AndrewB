import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'

class DashboardRoute extends Component {

  state = {
    words: []
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }
      return res.json()
    })
    .then(items => {
      console.log(items)
      this.setState({
        words: items.words,
      })
    })

  }

  handleClickButton() {

  }

  render() {
    return (
      <section>
        implement and style me
      </section>

    );
  }
}

export default DashboardRoute
