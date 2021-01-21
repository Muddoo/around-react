import {useState} from 'react'
import Card from './Card'

function Cards(props) {
    const {cards,onCardClick,onCardDelete,isOwner,isLiked,onCardLike} = props;
    const [isReady,setIsReady] = useState(0);

    function handleReady() {
        setIsReady(isReady+1);
    }

    function show() {
        return isReady === cards.length;
    }

    return (
        <section className={`cards ${show() ? null : 'hidden'}`}>
            {cards.map(card => ( 
                <Card 
                    key={card._id} 
                    card={card} 
                    onCardClick={onCardClick} 
                    handleReady={handleReady} 
                    onCardDelete={onCardDelete} 
                    isOwner={isOwner}
                    isLiked={isLiked}
                    onCardLike={onCardLike}
                />
            ))}
        </section>
    )
}

export default Cards