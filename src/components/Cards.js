import {useState} from 'react'
import Card from './Card'

function Cards(props) {
    const {cards,onCardClick,onCardDelete,isOwner,isLiked,onCardLike,onImageFailure} = props;
    const [isReady,setIsReady] = useState(0);

    function handleReady() {
        setIsReady(isReady+1);
    }

    function show() {
        if(cards.length < 7) return isReady === cards.length
        return isReady >= 7;
    }

    return (
        <section className={`cards ${!show() && ''}`}>
            {cards.map((card,i) => ( 
                <Card 
                    key={card._id} 
                    card={card} 
                    onCardClick={onCardClick} 
                    handleReady={i<7 ? handleReady : null} 
                    onCardDelete={onCardDelete} 
                    isOwner={isOwner}
                    isLiked={isLiked}
                    onCardLike={onCardLike}
                    onImageFailure={onImageFailure}
                />
            ))}
        </section>
    )
}

export default Cards