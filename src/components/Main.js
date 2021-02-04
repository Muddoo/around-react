import {useState,useEffect} from 'react'
import Cards from './Cards'
import api from '../utils/api'

function Main(props) {
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

    function handleUnloadedAvatar() {
        if(!originalAvatar) return;
        apiAvatar({avatar: originalAvatar});
    }

    function profileShow() {
        return userName && userDescription && userAvatar && isLoaded && true
    }

    function isOwner(card) {
        return card.owner._id === userId
    }

    function isLiked(card) {
        return card.likes.some(like => like._id === userId)
    }

    return (
        <main>
            <section className={`profile ${!profileShow() && 'hidden'}`} >
                <div className="profile__wrapper" onClick={handleEditAvatar}>
                    <img 
                        src={userAvatar} 
                        draggable="false"  
                        alt="profile image" 
                        className="profile__image" 
                        onLoad={handleLoadedAvatar}
                        onError={handleUnloadedAvatar}
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <p className="profile__text">{userDescription}</p>
                    <button 
                        className="profile__edit-button" 
                        aria-label="edit-button" 
                        type="button" 
                        onClick={handleEditProfile}
                    />
                </div>
                <button 
                    className="profile__add-button" 
                    aria-label="close-button" 
                    type="button" 
                    onClick={handleAddPlace}
                />
            </section>
            <Cards 
                cards={cards} 
                isOwner={isOwner}
                isLiked={isLiked}
                onCardClick={onCardClick} 
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                onImageFailure={apiRemove}
            />
        </main>
    )
}

export default Main