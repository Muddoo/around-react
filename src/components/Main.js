import {useState,useEffect} from 'react'
import Cards from './Cards'
import api from '../utils/api'

function Main(props) {
    const {onEditAvatar,
           onEditProfile,
           onAddPlace,
           onCardClick,
           onCardDelete,
           avatarInfo,
           profileInfo,
           newPlace,
           deletePlace} = props;
    const [userId,setUserId] = useState('')
    const [userName,setUserName] = useState('')
    const [userDescription,setUserDescription] = useState('')
    const [userAvatar,setUserAvatar] = useState('')
    const [cards,setCards] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)
    const [Liked,setLiked] = useState(false)
    const [deleteCard,setDeleteCard] = useState(false)
    
    useEffect(() => {
        Promise.all([api.getUser(),api.queryCards({})])
               .then(data => {
                   const [user,initialCards] = data;
                   setUserId(user._id);
                   setUserName(user.name);
                   setUserDescription(user.about);
                   setUserAvatar(user.avatar);
                   setCards(initialCards)
               })
               .catch(err => console.log(err))
    },[])

    useEffect(() => {
        if(profileInfo) {
            const options = {body: profileInfo};
            api.updateProfile(options)
           .then(user => {
                setUserName(user.name);
                setUserDescription(user.about);
                onEditProfile();
           })
           .catch(err => console.log(err));
        };
        if(avatarInfo) {
            const options = {
                avatar: 'avatar',
                body: avatarInfo
            };
            api.updateProfile(options)
            .then(({avatar}) => {
                setUserAvatar(avatar);
                onEditAvatar();
            })
            .catch(err => console.log(err));
        };
        if(newPlace) {
            const options = {
                method: 'POST',
                body: newPlace
            };
            api.queryCards(options)
            .then(place => {
                setCards([place,...cards]);
                onAddPlace();
            })
            .catch(err => console.log(err));
        };
        if(deletePlace) {
            const newCards = cards.filter(card => card._id !== deleteCard._id);
            setCards(newCards);
            onCardDelete();
            console.log(cards,newCards)
        }
        if(Liked) {
            const method = isLiked(Liked) ? 'DELETE' : 'PUT';
            const options = {
                query: `likes/${Liked._id}`,
                method
            }; 
            const newCards = cards.map(card => {
                const newLikes =  method === 'PUT' ? [...Liked.likes,{_id: userId}] : Liked.likes.filter(like => like._id !== userId)
                if(Liked._id === card._id) return {...card,likes: newLikes}
                return card
            });
                  setCards(newCards)
            api.queryCards(options)
            //    .then(res => {
            //        const newCards = cards.map(card => card._id === res._id ? res : card);
            //        setCards(newCards)
            //    })
               .catch(err => {
                   console.log(err);
                   setCards(cards)
                })
        }
    },[avatarInfo,profileInfo,newPlace,Liked,deletePlace])


    function handleCardLike(card) {
        setLiked(card)
    }

    function handleCardDelete(card) {
        onCardDelete();
        setDeleteCard(card);
    }

    function isReady() {
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
            <section className={`profile ${isReady() ? null : 'hidden'}`} >
                <div className="profile__wrapper" onClick={onEditAvatar}>
                    <img 
                        src={userAvatar} 
                        draggable="false"  
                        alt="profile image" 
                        className="profile__image" 
                        onLoad={() => setIsLoaded(true)}
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <p className="profile__text">{userDescription}</p>
                    <button 
                        className="profile__edit-button" 
                        aria-label="edit-button" 
                        type="button" 
                        onClick={onEditProfile}
                    />
                </div>
                <button className="profile__add-button" aria-label="close-button" type="button" onClick={onAddPlace} />
            </section>
            <Cards 
                cards={cards} 
                userId={userId} 
                isOwner={isOwner}
                isLiked={isLiked}
                onCardClick={onCardClick} 
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
            />
        </main>
    )
}

export default Main