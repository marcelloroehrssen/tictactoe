import styles from '../styles/GameTable.module.css'

const getLabel = (g) => (g.draw ? 'tie' : 'winner ' + (g.winner === 1 ? g.player1 : g.player2))

const GameTable = ({games}) => {
    return (<div className={styles.gametable}>
        <div className={styles.history}>History</div>
        {
            games.length !== 0 && <ul className={styles.list}>
                {
                    games.map((g, k) => (<li key={k}><strong>Game {k+1}</strong>, {getLabel(g)}</li>))
                }
            </ul>
        }
        {
            games.length === 0 && <div className={styles.emptystate}>No game played yet</div>
        }
    </div>)
}


export default GameTable