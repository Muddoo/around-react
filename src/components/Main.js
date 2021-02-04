import {useState,useContext} from 'react'
import Card from './Card'
import CurrentUserContext from '../contexts/CurrentUserContext'

function Main(props) {
    const {cards,onEditAvatar,onEditProfile,onAddPlace,onCardClick,onCardDelete,onCardLike} = props;
    const {onEditAvatar,
           onEditProfile,
           onAddPlace,
           onCardClick,
           onCardDelete,
           cardsInfo} = props;
    const [userId,setUserId] = useState('')
    const [userName,setUserName] = useState('')
    const [userDescription,setUserDescription] = useState('')
    const [userAvatar,setUserAvatar] = useState('')
    const [originalAvatar,setOriginalAvatar] = useState('')
    const [cards,setCards] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)
    
    useEffect(() => {
        Promise.all([api.getUser(),api.queryCards({})])
               .then(data => {
                   const [user,initialCards] = data;
                   setUserId(user._id);
                   setUserName(user.name);
                   setUserDescription(user.about);
                   setUserAvatar(user.avatar);
                   setCards(initialCards)
                   cardsInfo(initialCards)
               })
               .catch(err => console.log(err))
    },[])

    function apiAvatar(fields) {
        if(fields.avatar === userAvatar) return onEditAvatar(false);
        if(fields.avatar !== userAvatar) setIsLoaded(false);
        const options = {
            avatar: 'avatar',
            body: fields
        };
        api.updateProfile(options)
        .then(({avatar}) => {
            setUserAvatar(avatar);
            isLoaded && onEditAvatar(false);
        })
        .catch(err => console.log(err));
    }
    function apiRemove(card) {
        const newCards = cards.filter(cardArr => cardArr._id !== card._id);
            setCards(newCards);
            const options = {
            query: card._id,
            method: 'DELETE'
            };
            api.queryCards(options)
               .then(() => onCardDelete(false))
               .catch(err => {
                    console.log(err);
                    setCards(cards);
                    onCardDelete(false);
                });
    }

    function handleEditAvatar() {
        onEditAvatar(apiAvatar)
    }
    function handleEditProfile() {
        onEditProfile((fields) => {
            const options = {body: fields};
            api.updateProfile(options)
               .then(user => {
                        setUserName(user.name);
                        setUserDescription(user.about);
                        onEditProfile(false);
                })
               .catch(err => console.log(err));
        })
    }
    function handleAddPlace() {
        onAddPlace((fields) => {
            const options = {
                method: 'POST',
                body: fields
            };
            api.queryCards(options)
               .then(place => {
                    setCards([place,...cards]);
                    cardsInfo([place,...cards]);
                    onAddPlace(false);
                })
               .catch(err => console.log(err));
        })
    }

    function handleCardDelete(card) {
        onCardDelete(() => apiRemove(card));
    }

    function handleCardLike(liked) {
        const method = isLiked(liked) ? 'DELETE' : 'PUT';
            const options = {
                query: `likes/${liked._id}`,
                method
            }; 
            api.queryCards(options)
               .catch(err => {
                   console.log(err);
                   setCards(cards)
                })
            const newCards = cards.map(card => {
                const newLikes =  method === 'PUT' ? [...liked.likes,{_id: userId}] : liked.likes.filter(like => like._id !== userId)
                if(liked._id === card._id) return {...card,likes: newLikes}
                return card
            });
            setCards(newCards) 
    }

    function handleLoadedAvatar() {
        setIsLoaded(true);
        setOriginalAvatar(userAvatar);
    }

    const user = useContext(CurrentUserContext)
    const [isLoaded,setIsLoaded] = useState(false)
    const isReady =  user && isLoaded && true;

    return (
        <main>
            <section className={`profile ${isReady || 'hidden'}`} >
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
                        onCardDelete={onCardDelete} 
                        onCardLike={onCardLike}
                    />
                ))}
            </section>
        </main>
    )
}

export default Main