import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import './DashboardRoute.css'
import Context from '../../Context'

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

  handleClickButton = () => {
    this.props.history.push('/learn')
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
        <tbody>{wordsList}</tbody>
      </table>
    )
  }

  render() {
    const value = { words: this.state.words }
    return (
      <Context.Provider value={value}>
        <div className="Dashboard">
          <h1>DUTCH</h1>
          <button type='submit' onClick={this.handleClickButton}>START PRACTICING</button>
          <table>
            <tbody>
              <tr>
                <th>Words to Practice</th>
                <th>Correct</th>
                <th>Incorrect</th>
              </tr>
            </tbody>
          </table>
          {this.renderWordList()}
        </div>
     </Context.Provider>

    );
  }
}

export default DashboardRoute
