import React, { Component } from 'react'
import './App.css'
import Keyboard from './Keyboard'
import CurrentWord from './CurrentWord'
import Heart from './Heart'

class App extends Component {

    state = {
        wordCollection: ["Âne", "axe", "bel", "bip", "car", "col", "coq", "cor", "cou", "cri", "gag", "gaz", "gel", "jus", "net", "nul", "val", "ski", "sot", "tas", "tic", "Âtre", "beau", "bête", "boxe", "brun", "cerf", "chez", "cire", "dame", "dent", "dock", "dodo", "drap", "dune", "emeu", "fado", "faux", "ibis", "jazz", "joli", "joue", "kaki", "logo", "loin", "long", "lune", "lynx", "mine", "mûre", "ouïe", "ours", "pion", "rhum", "ride", "rock", "seau", "test", "thym", "trou", "truc", "user", "vert", "yogi", "watt", "accès", "aimer", "aloès", "assez", "avion", "awalé", "balai", "banjo", "barbe", "bonne", "bruit", "buche", "cache", "capot", "carte", "chien", "crâne", "cycle", "Ébène", "essai", "gifle", "honni", "jambe", "koala", "livre", "lourd", "maman", "moult", "noeud", "ortie", "pêche", "poire", "pomme", "poste", "prune", "radar", "radis", "robot", "route", "rugby", "seuil", "taupe", "tenue", "texte", "tyran", "usuel", "valse", "acajou", "agneau", "alarme", "ananas", "angora", "animal", "arcade", "aviron", "azimut", "babine", "balade", "bonzaï", "basson", "billet", "bouche", "boucle", "bronze", "cabane", "caïman", "cloche", "chèque", "cirage", "coccyx", "crayon", "garage", "gospel", "goulot", "gramme", "grelot", "guenon", "hochet", "hormis", "humour", "hurler", "jargon", "limite", "lionne", "menthe", "oiseau", "podium", "poulpe", "poumon", "puzzle", "quartz", "rapide", "séisme", "tétine", "tomate", "walabi", "whisky", "zipper", "abriter", "ballast", "baryton", "bassine", "batavia", "billard", "bretzel", "cithare", "chariot", "clairon", "corbeau", "cortège", "crapaud", "cymbale", "dentier", "djembé", "drapeau", "exemple", "fourmis", "grandir", "iceberg", "javelot", "jockey", "journal", "journée", "jouxter", "losange", "macadam", "mondial", "notable", "oxygène", "panique", "pétrole", "poterie", "pouvoir", "renégat", "scooter", "senteur", "sifflet", "spirale", "sucette", "strophe", "tonneau", "trousse", "tunique", "ukulélé", "vautour", "zozoter", "aquarium", "araignée", "arbalète", "archipel", "banquise", "batterie", "brocante", "brouhaha", "capeline", "clavecin", "cloporte", "débutant", "diapason", "gangster", "gothique", "hautbois", "hérisson", "logiciel", "objectif", "paranoïa", "parcours", "pastiche", "question", "quetsche", "scarabée", "scorpion", "symptôme", "tabouret", "tomahawk", "toujours", "tourisme", "triangle", "utopique", "zeppelin", "accordéon", "ascenseur", "ascension", "aseptiser", "autoroute", "avalanche", "balalaïka", "bilboquet", "bourricot", "brillance", "cabriolet", "contrario", "cornemuse", "dangereux", "Épluchage", "féodalité", "gondolier", "graphique", "horoscope", "intrépide", "klaxonner", "mascarade", "métaphore", "narrateur", "péripétie", "populaire", "printemps", "quémander", "tambourin", "vestiaire", "xylophone", "acrostiche", "apocalypse", "attraction", "aventurier", "bouillotte", "citrouille", "coquelicot", "dissimuler", "flibustier", "forestière", "grenouille", "impossible", "labyrinthe", "maharadjah", "prudemment", "quadriceps", "soliloquer", "subjective"],
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
            <h1 > Jeu du pendu </h1>

            {
                // Component indicating the user's life.
                (this.state.currentWord !== null) &&
                <
                Heart
                attempt = { this.state.attempt }
                maxAttempt = { this.state.maxAttempt }
                />
            }

            {
                // Word to guess.
                (this.state.currentWord !== null) &&
                <CurrentWord
                currentWord = { this.state.currentWord }
                usedLetter = { this.state.usedLetter }
                win = { this.state.win }
                />
            }

            {
                // Component keyboard.
                (this.state.win === 0 && this.state.currentWord !== null) &&
                <Keyboard
                alphabet = { this.state.alphabet }
                usedLetter = { this.state.usedLetter }
                action = { this.clickLetter }
                />
            }

            {
                // Message win this game.
                this.state.win === 1 &&
                    <
                    p id = "win_message" > Gagné! </p>
            }

            {
                // Message loose this game.
                this.state.win === -1 &&

                    <p id = "win_message" > Perdu! </p>
            }

            {
                // Restard this game.
                (this.state.currentWord === null || this.state.win !== 0) &&
                <button id = "play_new_game"
                onClick = {
                    () => this.launchNewGame() } > Nouvelle partie </button>
            } </div>
        )
    }
}


export default App;