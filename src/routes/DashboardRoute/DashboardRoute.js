import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import './DashboardRoute.css'
import Context from '../../Context'

class DashboardRoute extends Component {

  state = {
    words: [],
    language: {}
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
        language: items.language
      })
    })

  }

  handleClickButton = () => {
    this.props.history.push('/learn')
  }

  renderWordList() {
    const words = this.state.words;
    const wordsList = words.map((word, index) =>
      <li key={index}>
        <h4>{word.original}</h4>
        <p>correct answer count: {word.correct_count}</p>
        <p>incorrect answer count: {word.incorrect_count}</p>  
      </li>
    )
    return (
      <div className="dashboard">
        <li>{wordsList}</li>
      </div>
    )
  }

  render() {
    const value = { words: this.state.words, language: this.state.language }
    console.log(value)
    return (
      <Context.Provider value={value}>
        <div className="Dashboard">
          <main>
          <h2>{value.language.name}</h2>
            <section>
            <a type='submit' href="/learn" className="practice">Start practicing</a>
            
                  <h3>Words to practice</h3>
                  <p>Total correct answers: {value.language.total_score}</p>
                
            {this.renderWordList()}
            </section>
          </main>
        </div>
     </Context.Provider>

    );
  }
}

export default DashboardRoute
