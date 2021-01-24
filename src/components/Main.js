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
    const [originalAvatar,setOriginalAvatar] = useState('')
    const [cards,setCards] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)
    const [Liked,setLiked] = useState(false)
    const [deleteCard,setDeleteCard] = useState(false)
    const [unLoadedImage,setUnloadedImage] = useState(false)
    
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
    },[avatarInfo])
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
    },[profileInfo])
    useEffect(() => {
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
    },[newPlace])
    useEffect(() => {
        if(deletePlace) {
            const newCards = cards.filter(card => card._id !== deleteCard._id);
            setCards(newCards);
            const options = {
            query: deleteCard._id,
            method: 'DELETE'
            };
            api.queryCards(options)
               .then(() => onCardDelete())
               .catch(err => {
                    console.log(err);
                    setCards(cards);
                    onCardDelete();
                });
        }
    },[deletePlace])
    useEffect(() => {
        if(unLoadedImage) {
            const newCards = cards.filter(card => card._id !== unLoadedImage._id);
            setCards(newCards);
            const options = {
                query: unLoadedImage._id,
                method: 'DELETE'
              };
            api.queryCards(options).catch(err => console.log(err));
        }
    },[unLoadedImage])
    useEffect(() => {
        if(Liked) {
            const method = isLiked(Liked) ? 'DELETE' : 'PUT';
            const options = {
                query: `likes/${Liked._id}`,
                method
            }; 
            api.queryCards(options)
               .catch(err => {
                   console.log(err);
                   setCards(cards)
                })
            const newCards = cards.map(card => {
                const newLikes =  method === 'PUT' ? [...Liked.likes,{_id: userId}] : Liked.likes.filter(like => like._id !== userId)
                if(Liked._id === card._id) return {...card,likes: newLikes}
                return card
            });
            setCards(newCards)    
        }
    },[Liked])


    function handleCardLike(card) {
        setLiked(card)
    }

    function handleCardDelete(card) {
        onCardDelete();
        setDeleteCard(card);
    }

    function handleUnloadedImage(card) {
        setUnloadedImage(card);
    }

    function handleLoadedAvatar() {
        setIsLoaded(true);
        setOriginalAvatar(userAvatar);
    }

    function handleUnloadedAvatar() {
        if(!originalAvatar) return;
        const options = {
            avatar: 'avatar',
            body: {avatar: originalAvatar}
        };
        api.updateProfile(options)
        .then(({avatar}) => {
            setUserAvatar(avatar);
        })
        .catch(err => console.log(err));
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
            <section className={`profile ${profileShow() ? null : 'hidden'}`} >
                <div className="profile__wrapper" onClick={onEditAvatar}>
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
                onImageFailure={handleUnloadedImage}
            />
        </main>
    )
}

export default Main