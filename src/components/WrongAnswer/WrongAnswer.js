import React, { Component } from 'react'
import Context from '../../Context'

export default class WrongAnswer extends Component {
  static contextType = Context

  handleClick = () => {
    console.log('click handled')
    //Link to the next word!
  }

  render () {
    // const original = this.context.[something]
    // const answer = this.context.[something]
    // const guess = this.context.[something]
    return (
      <>
      <div className='feedback-div'>
        <h2>OOPS!</h2>
        <h3>Not Quite</h3>

        <p>The correct translation for {'original'} was {'answer'}, and you chose {'guess'}.</p>

        <button className='next-word-btn' onClick={this.handleClick}>
          Try another word
        </button> 
      </div>


      <footer>
      <p className="correct">Your total score is: {'totalScore'}</p>
      </footer>
      </> 
    )
  }
}