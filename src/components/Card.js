function Card(props) {
    const {card,onCardClick,handleReady,onCardDelete,isOwner,isLiked,onCardLike} = props;
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
                    className={`card__icon-heart ${isLiked(card) && 'card__icon-heart_black animate'}`}
                    type="button" 
                    aria-label="heart-button" 
                    title="like"
                    onClick={() => onCardLike(card)}
                />
                <span className="card__likes">{card.likes.length}</span>
            </div>
            <button 
                className="card__icon-delete" 
                type="button" 
                aria-label="trash-button" 
                title="delete"
                onClick={(e) => onCardDelete(card)}
                hidden={!isOwner(card)}
            />
        </div>
    )
}

export default Card