function ImagePopup(props) {
    const {card,onClose} = props

    return (
        <figure className={`popup popup_figure ${card ? 'visible' : null}`} onClick={onClose}>
            <div className="popup__container">
                <img src={`${card.link}`} draggable="false" alt="popup image" className="popup__image" />
                <p className="popup__caption">{card.name}</p>
                <button className="popup__close popup__close_fig" aria-label="close-button" type="button" title="close"/>
            </div>
        </figure>
    )
}

export default ImagePopup