import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import './DashboardRoute.css'

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

  renderWordList() {
    const words = this.state.words;
    const wordsList = words.map((word, index) =>
      <tr key={index}>
       
            <td>{word.original}</td>
            <td>{word.correct_count}</td>
            <td>{word.incorrect_count}</td>
      </tr>
    )
    return (
      <table className="dashboard">
        {wordsList}
      </table>
    )
  }

  render() {
    return (
    <div className="Dashboard">
      <h1>DUTCH</h1>
      <button type='button'>START PRACTICING</button>
      <table>
        <tr>
          <th>Words to Practice</th>
          <th>Correct</th>
          <th>Incorrect</th>
        </tr>
       
             
      </table>
      {this.renderWordList()}
     </div>

    );
  }
}

export default DashboardRoute
