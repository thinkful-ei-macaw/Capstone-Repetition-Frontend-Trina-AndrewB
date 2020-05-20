import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import './DashboardRoute.css'
import Context from '../../Context'

class DashboardRoute extends Component {

  static contextType = Context
  // state = {
  //   words: [],
  //   language: {}
  // }

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
      console.log('Fetched data:', items)
      this.context.setWords({words: items.words})
      this.context.setLanguage({language: items.language})
      console.log('context:', this.context)
    })

  }

  handleClickButton = () => {
    this.props.history.push('/learn')
  }

  renderWordList() {
    const words = this.context.words;
    console.log('words:', words)
    const wordsList = words.map((word, index) =>
      <li key={index}>
        <h4>{word.original}</h4>
        <p>correct answer count: {word.correct_count}</p>
        <p>incorrect answer count: {word.incorrect_count}</p>  
      </li>
    )
    console.log('wordList:', wordsList)
    return (
      <div className="dashboard">
        <ul>{wordsList}</ul>
      </div>
    )
  }

  render() {
    const value = { words: this.context.words, language: this.context.language }
    return (
        <div className="Dashboard">
          <main>
          <h2>{value.language.name}</h2>
            <section>
              <a type='submit' href="/learn" className="practice">Start practicing</a>
            </section>
            <h3>Words to practice</h3>
            <h3>Total correct answers: {value.language.total_score}</h3>
            {this.renderWordList()}
          </main>
        </div>
    );
  }
}

export default DashboardRoute
