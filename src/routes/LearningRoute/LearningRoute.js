import React, { Component } from 'react'
import Context from '../../Context'
import './LearningRoute.css'
import config from '../../config'
import TokenService from '../../services/token-service'


class LearningRoute extends Component {

  static contextType = Context

  state = {
    guess: '',
    nextWord: '',
    isCorrect: '',
    original: ''
  }

  handleSubmitGuess = (e) => {
    e.preventDefault();
    const guess = this.state.guess.charAt(0).toUpperCase() + this.state.guess.toLowerCase().slice(1);
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
        this.context.setHead(res)
        this.context.setGuess(guess)
        this.context.setOriginal(this.context.head.original)
        // this.verifyGuess(res)
        console.log('response', res)
        console.log(this.context)
        this.props.history.push('/answer')
      })
  }

  //store user guess input value to the state
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
            <p className="correct">You have answered this word incorrectly <span>{wordIncorrectCount}</span> times.</p>
            <p className="incorrect">You have answered this word correctly <span>{wordCorrectCount}</span> times.</p>
            <p className="score">Your total score is: {totalScore}</p>
          </footer>
        </main>
      </div>
    );
  }
}

export default LearningRoute
