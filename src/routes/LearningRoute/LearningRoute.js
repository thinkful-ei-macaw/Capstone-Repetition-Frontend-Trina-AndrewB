import React, { Component } from 'react'

import Context from '../../Context'
import './LearningRoute.css'
import config from '../../config'
//import config from '../../config'
import TokenService from '../../services/token-service'


class LearningRoute extends Component {

  static contextType = Context

  state = {
    nextWord: "",
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    totalScore: 0,
    guess: ''
  }

  handleSubmitGuess = (e) => {
    e.preventDefault();
    const guess = this.state.guess
    console.log(guess)
    return fetch (`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body:JSON.stringify(guess)
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
      )
  }

  //stores user intput value to the state
  onEnterGuess = e => {
    this.setState({
      guess: e.target.value
    })
  }

  // *** Moved fetch into context... is it needed here? **** 

  // componentDidMount() {
  //   fetch(`${config.API_ENDPOINT}/language/head`, {
  //     headers: {
  //       "Content-Type": "application/json", 
  //       "Authorization": `Bearer ${TokenService.getAuthToken()}`
  //     },
  //   })
  //   .then(res => {
  //     if (!res.ok) {
  //       return res.json().then(e => Promise.reject(e))
  //     }
  //     return res.json()
  //   })
  //   .then(head => {
  //     console.log('head:', head)
  //     this.context.setHead(head)
  //   })
  // }

  render() {
    const { nextWord, wordCorrectCount, wordIncorrectCount, totalScore } = this.context.head
    //console.log(this.state.guess)
    return (
      <div className="LearningPage">
        <main>
          <h2>Translate the word:</h2>
          <span className="nextword">{nextWord}</span>
          <form onSubmit={e => this.handleSubmitGuess(e)}>
            <fieldset>
                <label htmlFor="learn-guess-input">What's the translation for this word?</label>
                <input type="text" id="learn-guess-input" name="learn-guess-input" placeholder="Enter translated word here" onChange={this.onEnterGuess.bind(this)} required/>
                <button type='submit'>Submit your answer</button>             
            </fieldset>
          </form>

          {/* for dev use only, remove before deployment!!! */}
          <div className='for-dev-only'>
            <a href='/correct'>RigthAnswer</a>
            <a href='/incorrect'>WrongAnswer</a>
          </div>

          <footer>
            <section className="answered">
              <p className="correct">Your total score is: {totalScore}</p><br/>
              <p className="incorrect">You have answered this word <span>correctly</span> {wordCorrectCount} times.</p>
            </section>
            <section className="score">
              <p>You have answered this word <span>incorrectly</span> {wordIncorrectCount} times.</p>
            </section>
          </footer>
        </main>
      </div>
      
    );
  }
}

export default LearningRoute
