import styles from '../styles/Modal.module.css'

const Modal = ({title, children}) => {
    return (<>
        <div className={styles.overlay}>
        </div>
        <div className={styles.modal}>
            <div className={styles.title}>{title}</div>
            <div className={styles.content}>{children}</div>
        </div>
    </>)
}

export default Modal
