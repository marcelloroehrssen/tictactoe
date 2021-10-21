import Head from 'next/head'
import styles from '../styles/Home.module.css'
import modalStyle from '../styles/Modal.module.css'
import {useEffect, useState} from "react";
import Modal from "../components/Modal";
import GameTable from "../components/GameTable";

const spots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const initialState = {
    id: null,
    player1: null,
    player2: null,
    moves: {},
    winner: null,
    draw: false,
    nextToMove:1
}

const Home = () => {

    const [overlay, showOverlay] = useState(false)
    const [modal, showModal] = useState(true)

    const [players, setPlayers] = useState({
        player1: '',
        player2: ''
    })

    const [game, setGame] = useState(initialState)

    const [gameList, setGameList] = useState([])

    useEffect(() => {
        if (players.player1 === '' || players.player2 === '') {
            return;
        }
        fetch('/api/create',{
            method: 'post',
            body: JSON.stringify(players),
            headers: {'Content-Type': 'application/json'}
        })
            .then(r => r.json())
            .then(j => setGame(j))
            .then(_ => showOverlay(false))
    }, [players])

    const handleSubmit = (e) => {
        e.preventDefault()
        showOverlay(true)
        showModal(false)
        setPlayers({
            player1: e.currentTarget.elements.player1.value,
            player2: e.currentTarget.elements.player2.value
        })
    }

    const handleMove = (index) => () => {
        if (game.moves[index]) {
            return
        }
        showOverlay(true)
        fetch('/api/move',{
            method: 'post',
            body: JSON.stringify({id: game.id ,move: index}),
            headers: {'Content-Type': 'application/json'}
        })
            .then(r => r.json())
            .then(j => setGame(j))
            .then(_ => showOverlay(false))
    }

    const handlePlayAgain = () => {
        setGameList([...gameList, game])
        showOverlay(false)
        showModal(true)
        setGame(initialState)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Tictactoe</title>
                <meta name="description" content="Tictactoe FE" />
            </Head>
            <GameTable games={gameList}/>
            <main className={styles.main}>
                <div className={styles.playercontainer}>
                    <div className={`${styles.player} ${game.nextToMove === 1 ? styles.nexttomove : ''}`}>
                        <span className={styles.playerbadge}>{game.player1 ?? 'Player1'}</span>
                    </div>
                    <div className={`${styles.player} ${game.nextToMove === 2 ? styles.nexttomove : ''} ${styles.player2}`}>
                        <span className={styles.playerbadge}>{game.player2 ?? 'Player1'}</span>
                    </div>
                </div>
                <div className={styles.gamegrid}>
                    {
                        spots.map((i) => (
                            <div key={i} onClick={handleMove(i)} className={styles.gamespot}>{game.moves[i] === undefined ? '' : (game.moves[i] === 1 ? 'x' : 'o') }</div>
                        ))
                    }
                </div>
            </main>
            {overlay && <div className={modalStyle.overlay}><div className={modalStyle.loading}>LOADING...</div></div>}
            {modal && (
                <Modal title="Chi giocherà?">
                    <form onSubmit={handleSubmit}>
                        <input required className={styles.input} type="text" name="player1" defaultValue={players.player1} placeholder="Nome giocatore 1"/>
                        <input required className={styles.input} type="text" name="player2" defaultValue={players.player2} placeholder="Nome giocatore 2" />
                        <button className={styles.button} type="submit">Comincia!</button>
                    </form>
                </Modal>
            )}
            {
                game.winner && <Modal title="Vittoria!">
                    <div>Ha vinto il giocatore {game.winner}</div>
                    <div><button className={styles.button} onClick={handlePlayAgain}>Gioca ancora!</button></div>
                </Modal>
            }
            {
                game.draw && <Modal title="Pareggio!">
                    <div>Avete pareggiato</div>
                    <div><button className={styles.button} onClick={handlePlayAgain}>Gioca ancora!</button></div>
                </Modal>
            }
        </div>
    )
}

export default Home

