import React, { Component } from 'react'
import Context from '../../Context'

export default class WrongAnswer extends Component {
  static contextType = Context

  handleClick = e => {
    e.preventDefault();
    this.props.history.push('/learn')
  }

  render () {
    console.log('context:', this.context)
    // const original = this.context.[something]
    // const answer = this.context.[something]
    // const guess = this.context.[something]
    const score = this.context.head.totalScore
    return (
      <>
      <div className='feedback-div'>
        <h2>OOPS! Not quite.</h2>

        <p>The correct translation for {'original'} was {'answer'}, and you chose {'guess'}.</p>

        <button className='next-word-btn' onClick={this.handleClick}>
          Try another word
        </button> 
      </div>


      <footer>
        <p className="correct">Your total score is: {score}</p>
      </footer>
      </> 
    )
  }
}