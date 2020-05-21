import React, { Component } from 'react'
import config from './config'
import TokenService from './services/token-service'

const WordContext = React.createContext({
    words: [], 
    language: {}
})

export default WordContext

export class ContextProvider extends Component {
    state = {
        words: [],
        language: {},
        head: {},
        setWords: ()=>{},
        setLanguage: ()=>{}
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
          this.setState({
            words: items.words,
            language: items.language
          })
        })   
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

    render() {
        const value = {
            words: this.state.words,
            language: this.state.language,
            setWords: this.setWords,
            setLanguage: this.setLanguage
        }
        
        return (
            <WordContext.Provider value={value}>
                {this.props.children}
            </WordContext.Provider>
        )
    }
}
