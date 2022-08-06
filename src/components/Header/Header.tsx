import styles from './Header.module.scss';

function Header({ }) {
    return (
        <header className={styles.header}>
            <img className={styles.logo} src="./LanguageTables.png" />
            <h1>Middlebury Language Tables</h1>
            <div></div>
        </header>
    );
}

export default Header;