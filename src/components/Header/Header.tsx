import styles from './Header.module.scss';

function Header({ }) {
    return (
        <header className={styles.header}>
            <img className={styles.logo} src="./LanguageTables.png" />
            <h1></h1>
            <div></div>
        </header>
    );
}

export default Header;