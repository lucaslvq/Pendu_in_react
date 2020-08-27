import React, { Component } from 'react'
import './App.css'
import Keyboard from './Keyboard'
import CurrentWord from './CurrentWord'
import Heart from './Heart'

class App extends Component {

  state = {
    // wordCollection: ["arbre", "babine", "bobine", "babel", "serviette", "odile", "teo", "gare", "cul", "bite", "bruler", "manger", "table", "merde", "voiture", "caisse", "livre", "courrir", "tomate", "zartekx", "mgk", "aeraclaes"],
    wordCollection: ["gare"],
    currentWord: null,
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split(''),
    usedLetter: [],
    win: 0, // 0 : neutral | -1 lost | 1 win
    attempt: 0,
    maxAttempt: 9
  }

  componentDidMount() {
    window.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        this.launchNewGame()
      }
    })
  }

  clickLetter = (letter) => {

    if (this.state.usedLetter.indexOf(letter) === -1) {
      // Fill in the letter of the word on click.
      const usedLetter = [letter, ...this.state.usedLetter]

      // Calcul attempt.
      let attempt = this.state.attempt
      if (this.state.currentWord.indexOf(letter) === -1) {
        attempt = this.state.attempt + 1
      }

      // Calcul win state.
      let win = 1
      for (let i = 0; i < this.state.currentWord.length; i++) {
        if (usedLetter.indexOf(this.state.currentWord[i]) === -1) {
          win = 0
        }
      }

      // Calcul loose state.
      if (attempt >= this.state.maxAttempt && win === 0) {
        win = -1
      }

      // Update state.
      this.setState({ usedLetter, attempt, win })
    }

  }

  // Change word an start the game.
  pickNewWord = () => {
    const randomIndex = Math.floor(Math.random() * this.state.wordCollection.length)
    return this.state.wordCollection[randomIndex]
  }

  // Start game an click the button.
  launchNewGame = () => {
    this.setState({
      currentWord: this.pickNewWord(),
      usedLetter: [],
      win: 0,
      attempt: 0
    })
  }

  render() {
    return (
      <div id="game">
        <h1>Jeu du pendu</h1>

        {
          // Component indicating the user's life.
          (this.state.currentWord !== null) &&
          <Heart
            attempt={this.state.attempt}
            maxAttempt={this.state.maxAttempt}
          />
        }

        {
          // Word to guess.
          (this.state.currentWord !== null) &&
          <CurrentWord
            currentWord={this.state.currentWord}
            usedLetter={this.state.usedLetter}
            win={this.state.win}
          />
        }

        {
          // Component keyboard.
          (this.state.win === 0 && this.state.currentWord !== null) &&
          <Keyboard
            alphabet={this.state.alphabet}
            usedLetter={this.state.usedLetter}
            action={this.clickLetter}
          />
        }

        {
          // Message win this game.
          this.state.win === 1 && 
          <p id="win_message">Gagné !</p>
        }

        {
          // Message loose this game.
          this.state.win === -1 && 
          
          <p id="win_message">Perdu !</p>
        }

        {
          // Restard this game.
          (this.state.currentWord === null || this.state.win !== 0) &&
          <button id="play_new_game" onClick={() => this.launchNewGame()}>Nouvelle partie</button>
        }
      </div>
    )
  }
}


export default App;