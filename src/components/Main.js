import {useState,useEffect,useContext} from 'react'
import Card from './Card'
import api from '../utils/api'
import CurrentUserContext from '../contexts/CurrentUserContext'

function Main(props) {
    const {onEditAvatar,onEditProfile,onAddPlace,onCardClick,onCardDelete} = props;

    const user = useContext(CurrentUserContext)

    const [cards,setCards] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)

    useEffect(() => {
         api.queryCards({})
            .then(initialCards => {
                user && setCards(initialCards)
            })
            .catch(err => console.log(err))
    },[user]);

    function handleCardLike(card) {
        const method = card.likes.some(data => data._id === user._id) ? 'DELETE' : 'PUT';
        const newLike = method === 'DELETE' ? card.likes.filter(item => item._id !== user._id) : [...card.likes, {_id: user._id}];
        const newCards = cards.map(item => card._id === item._id ? {...item,likes: newLike} : item);
        setCards(newCards);
        api.queryCards({ query: `likes/${card._id}`, method })
           .catch(err => {
               console.log(err);
               setCards(cards)
           })
    }

    function handleCardDelete(card) {
       onCardDelete(() => (closePopup) => { 
           const newCards = cards.filter(item => item._id !== card._id);
            setCards(newCards);
            api.queryCards({query: card._id, method: 'DELETE'})
               .then(() => closePopup())
               .catch(err => {
                  console.log(err);
                  setCards(cards);
           })
        })
    }

    function isReady() {
        return user && isLoaded && true
    }

    return (
        <main>
            <section className={`profile ${isReady() || 'hidden'}`} >
                <div className="profile__wrapper" onClick={onEditAvatar}>
                    <img 
                        src={user?.avatar} 
                        draggable="false"  
                        alt="profile image" 
                        className="profile__image" 
                        onLoad={() => setIsLoaded(true)}
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{user?.name}</h1>
                    <p className="profile__text">{user?.about}</p>
                    <button 
                        className="profile__edit-button" 
                        aria-label="edit-button" 
                        type="button" 
                        onClick={onEditProfile}
                    />
                </div>
                <button className="profile__add-button" aria-label="close-button" type="button" onClick={onAddPlace} />
            </section>
            <section className='cards'>
                {cards.map(card => ( 
                    <Card 
                        key={card._id} 
                        card={card} 
                        onCardClick={onCardClick} 
                        onCardDelete={handleCardDelete} 
                        onCardLike={handleCardLike}
                    />
                ))}
            </section>
        </main>
    )
}

export default Main