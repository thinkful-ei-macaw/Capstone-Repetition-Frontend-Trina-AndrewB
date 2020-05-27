import React, { Component } from 'react'

import Context from '../../Context'
import './LearningRoute.css'
import config from '../../config'
//import config from '../../config'
import TokenService from '../../services/token-service'


class LearningRoute extends Component {

  static contextType = Context

  state = {
    guess: '',
    nextWord: '',
    isCorrect: ''
  }

  verifyGuess = (isCorrect) => {
    if (isCorrect) {
      this.props.history.push('/correct')
    } else {
      this.props.history.push('/incorrect')
    }
    console.log('verified')
  }

  handleSubmitGuess = (e) => {
    e.preventDefault();
    const guess = this.state.guess
    console.log(guess)
    return fetch(`${config.API_ENDPOINT}/api/language/guess`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({ guess: guess })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(res => {
        console.log('response', res)
        this.verifyGuess(res.isCorrect)
        
      })
  }

  //store user guess intput value to the state
  onEnterGuess = e => {
    this.setState({
      guess: e.target.value
    })
  }

  render() {
    const { nextWord, wordCorrectCount, wordIncorrectCount, totalScore } = this.context.head
    return (
      <div className="LearningPage">
        <main>
          <h2>Translate the word:</h2>
          <span className="nextword">{nextWord}</span>
          <form onSubmit={e => this.handleSubmitGuess(e)}>
            <fieldset>
              <label htmlFor="learn-guess-input">What's the translation for this word?</label>
              <input type="text" id="learn-guess-input" name="learn-guess-input" placeholder="Enter translated word here" onChange={this.onEnterGuess.bind(this)} required />
              <button type='submit'>Submit your answer</button>
            </fieldset>
          </form>

          <footer>
            <section className="answered">
              <p>You have answered this word <span>incorrectly</span> {wordIncorrectCount} times.</p><br />
              <p className="incorrect">You have answered this word <span>correctly</span> {wordCorrectCount} times.</p>
            </section>
            <section className="score">
              <p className="correct">Your total score is: {totalScore}</p>
            </section>
          </footer>
        </main>
      </div>
    );
  }
}

export default LearningRoute
