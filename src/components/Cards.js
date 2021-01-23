import {useState} from 'react'
import Card from './Card'

function Cards(props) {
    const {cards,onCardClick,onCardDelete,isOwner,isLiked,onCardLike} = props;
    const [isReady,setIsReady] = useState(0);

    function handleReady() {
        if(isReady === cards.length) return setIsReady(1);
        setIsReady(isReady+1);
    }

    function show() {
        console.log(isReady,cards.length)
        return isReady === cards.length;
    }

    show()

    return (
        <section className={`cards`}>
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