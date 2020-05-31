import React, { Component } from 'react'
import Context from '../../Context'
import './AnswerRoute.css'
//import { Link } from 'react-router-dom'

export default class RightAnswer extends Component {

  static contextType = Context

    handleClick = e => {
      e.preventDefault();
      this.props.history.push('/learn')
    }

  render() {
    console.log('context:', this.context)
    const { guess, original } = this.context
    const { isCorrect, totalScore, answer } = this.context.head
    console.log(isCorrect)
    return (
      <>
        <div className='feedback-div'>
          { isCorrect ? <h2>That's Correct!</h2> : <h2>OOPS! Not quite.</h2>}

          <p>The correct translation for {original} was {answer}, and you chose {guess}!</p>

            <button className='next-word-btn' onClick={this.handleClick}>
              Try another word
            </button>
      
        </div>


        <footer>
          <p className="correct">Your total score is: {totalScore}</p>
        </footer>
      </>
    )
  }
}   