import React, { Component } from 'react'

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

    setWords = words => {
        this.setState({ words: words })
    }

    setLanguage = language => {
        this.setState({ language: language })
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
