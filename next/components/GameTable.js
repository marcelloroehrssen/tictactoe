import styles from '../styles/GameTable.module.css'
import {useEffect, useRef, useState} from "react";

const getLabel = (g) => (g.draw ? 'tie' : 'winner ' + (g.winner === 1 ? g.player1 : g.player2))

const GameTable = ({games}) => {

    const el = useRef(null);
    const [visible, setVisible] = useState(true)
    useEffect(() => {
        el.current.style.setProperty('height', visible ? '350px' : '35px')
    }, [visible])

    const handleToggle = () => setVisible(!visible)

    return (<div ref={el} className={styles.gametable}>
        <div className={styles.history}>History <small><a href='#' onClick={handleToggle}>[{visible ? 'nascondi' : 'chiudi'}]</a></small></div>
        <div>
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
        </div>
    </div>)
}


export default GameTable