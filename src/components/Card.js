function Card(props) {
    const {card,onCardClick,handleReady,onCardDelete} = props;
    return (
        <div className="card" data-id={card._id}>
            <img 
                src={card.link} 
                draggable="false" 
                alt="card image" 
                className="card__image" 
                onClick={() => onCardClick(card)}
                onLoad={handleReady}
            />
            <div className="card__details">
                <h2 className="card__text">{card.name}</h2>
                <button 
                    className={`card__icon-heart`}
                    type="button" 
                    aria-label="heart-button" 
                    title="like"
                />
                <span className="card__likes">{card.likes.length}</span>
            </div>
            <button 
                className="card__icon-delete" 
                type="button" 
                aria-label="trash-button" 
                title="delete"
                onClick={(e) => onCardDelete(e.target.parentElement)}
            />
        </div>
    )
}

export default Card