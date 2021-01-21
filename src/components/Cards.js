import Api from '../utils/Api'

function Cards(props) {
    const {userId,cards,onCardClick,onCardDelete} = props;

    function isLiked({likes}) {
        return likes.some(like => like._id === userId) ? 'card__icon-heart_black animate' : null     
    }
    
    function handleLike(e) {
        const likesNumber = e.target.nextElementSibling;
        const method = e.target.classList.contains('card__icon-heart_black') ? 'DELETE' : 'PUT';
        const options = {
            query: `likes/${e.target.closest('.card').dataset.id}`,
            method
        };
        e.target.classList.toggle('card__icon-heart_black');
        e.target.classList.toggle('animate');
        likesNumber.textContent = method === 'PUT' ? +likesNumber.textContent + 1 : +likesNumber.textContent - 1;
        Api.queryCards(options)
           .catch(err => {
               console.log(err);
               e.target.classList.toggle('card__icon-heart_black');
               e.target.classList.toggle('animate');
               likesNumber.textContent = method === 'PUT' ? +likesNumber.textContent - 1 : +likesNumber.textContent + 1;
           })
    }
    return (
        <section className="cards">
            {cards.map(card => (
                <div className="card" key={card._id} data-id={card._id}>
                    <img 
                        src={card.link} 
                        draggable="false" 
                        alt="card image" 
                        className="card__image" 
                        onClick={() => onCardClick(card)}
                    />
                    <div className="card__details">
                        <h2 className="card__text">{card.name}</h2>
                        <button 
                            className={`card__icon-heart ${isLiked(card)}`}
                            type="button" 
                            aria-label="heart-button" 
                            title="like"
                            onClick={handleLike}
                        />
                        <span className="card__likes">{card.likes.length}</span>
                    </div>
                    <button 
                        className="card__icon-delete" 
                        type="button" 
                        aria-label="trash-button" 
                        title="delete"
                        hidden={userId !== card.owner._id ? true : false}
                        onClick={(e) => onCardDelete(e.target.parentElement)}
                    />
                </div>
            ))}
        </section>
    )
}

export default Cards