import React, { Component } from 'react'
import config from './config'
import TokenService from './services/token-service'

const WordContext = React.createContext({
    words: [], 
    language: {},
})

export default WordContext

export class ContextProvider extends Component {
    state = {
        words: [],
        language: {},
        head: {},
        guess: '',
        original: '',
        setWords: ()=>{},
        setLanguage: ()=>{},
        setHead: ()=>{},
        setGuess: ()=>{},
        setOriginal: ()=>{},
    }

    getWordsAndLanguage()  {
      fetch(`${config.API_ENDPOINT}/api/language`, {
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
        this.setState({
          words: items.words,
          language: items.language,
        })
      })
    }

    getHead() {
      fetch(`${config.API_ENDPOINT}/api/language/head`, {
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
        this.setState({head: head})
      })
    }

    componentDidMount() {
      this.getWordsAndLanguage();
      this.getHead();
      }

    setWords = words => {
        this.setState({ words: words })
    }

    setLanguage = language => {
        this.setState({ language: language })
    }

    setHead = head => {
      this.setState({ head: head })
    }

    setOriginal = original => {
      this.setState({ original })
    }

    setGuess = guess => {
      this.setState({ guess: guess })
    }
    

    render() {
        const value = {
            words: this.state.words,
            language: this.state.language,
            head: this.state.head,
            guess: this.state.guess,
            original: this.state.original,  
            setWords: this.setWords,
            setLanguage: this.setLanguage,
            getHead: this.getHead,
            setHead: this.setHead,
            setOriginal: this.setOriginal,
            setGuess: this.setGuess
        }
        
        return (
            <WordContext.Provider value={value}>
                {this.props.children}
            </WordContext.Provider>
        )
    }
}
