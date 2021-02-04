function Header(props) {
    return (
        <header className="header">
            <img draggable="false" src={props.logo} alt="logo" className="logo" />
        </header>
    )
}

export default Header