import React, { Component } from 'react'
import config from '../../config'
import Context from '../../Context'
import './LearningRoute.css'
import TokenService from '../../services/token-service'


class LearningRoute extends Component {

  static contextType = Context

  state = {
    nextWord: "",
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    totalScore: 0
  }

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
      console.log('head:', head)
    })
  }

  render() {
    const { nextWord, wordCorrectCount, wordIncorrectCount, totalScore } = this.state
    return (
      <div className="LearningPage">
        <main>
          <h2>Translate the word:</h2>
          <span className="nextword">{nextWord}</span>
          <form>
            <fieldset>
              <legend>
                <label htmlFor="learn-guess-input" >What's the translation for this word?</label>
                <input type="text" id="learn-guess-input" name="learn-guess-input" placeholder="Enter translated word here" required/>
                <button type='submit'>Submit your answer</button>

              </legend>
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
