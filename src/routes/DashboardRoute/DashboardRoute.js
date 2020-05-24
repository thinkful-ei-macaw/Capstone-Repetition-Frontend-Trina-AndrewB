import React, { Component } from 'react'
import './DashboardRoute.css'
import Context from '../../Context'

class DashboardRoute extends Component {

  static contextType = Context

  handleClickButton = () => {
    this.props.history.push('/learn')
  }

  renderWordList() {
    const words = this.context.words;
    const wordsList = words.map((word, index) =>
      <li key={index}>
        <h4>{word.original}</h4>
        <p>correct answer count: {word.correct_count}</p>
        <p>incorrect answer count: {word.incorrect_count}</p>
      </li>
    )
    return (
      <div className="dashboard">
        <ul>{wordsList}</ul>
      </div>
    )
  }

  render() {
    console.log('context:', this.context)
    const lang = this.context.language;
    return (
      <div className="Dashboard">
        <main>
          <h2>{lang.name}</h2>
          <section>
            <a type='submit' href="/learn" className="practice">Start practicing</a>
          </section>
          <h3>Words to practice</h3>
          <h3>Total correct answers: {lang.total_score}</h3>
          {this.renderWordList()}
        </main>
      </div>
    );
  }
}

export default DashboardRoute