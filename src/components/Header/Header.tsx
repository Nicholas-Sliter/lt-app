import styles from './Header.module.scss';

function Header({ currentPage, updatePage }) {

    const changePage = () => {

    }
    return (
        <header className={styles.header}>
            <img className={styles.logo} src="./LanguageTables.png" />
        
            {/* {currentPage == "Signup" ? <div onClick={() => updatePage("admin")}>Admin</div> : <div onClick={() => updatePage("Signup")}>Signup</div>} */}
        </header >
    );
}

export default Header;