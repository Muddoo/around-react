import {useState,useEffect} from 'react'
import logo from '../images/Vectorlogo.svg'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import EditProfilePopup from './EditProfilePopup'
import ImagePopup from './ImagePopup'
import api from '../utils/api'
import CurrentUserContext from '../contexts/CurrentUserContext'

function App() {
    const [currentUser,setCurrentUser] = useState();
    const [cards,setCards] = useState([]);
    const [avatarPopup,setAvatarPopup] = useState(false);
    const [profilePopup,setProfilePopup] = useState(false);
    const [cardPopup,setCardPopup] = useState(false);
    const [deletePopup,setDeletePopup] = useState(false);
    const [imagePopup,setImagePopup] = useState(false);
    const [selectedCard,setSelectedCard] = useState({});

    useEffect(() => {
        Promise.all([api.getUser(),api.queryCards({})])
               .then(data => {
                   const [user,initialCards] = data;
                   setCurrentUser(user)
                   setCards(initialCards)
               })
               .catch(err => console.log(err))
    },[])

    function handleEditAvatarClick() {
        setAvatarPopup(true)
    }
    function handleEditProfileClick() {
        setProfilePopup(true)
    }
    function handleAddPlaceClick() {
        setCardPopup(true)
    }
    function handleCardClick(card) {
        setImagePopup(true)
        setSelectedCard(card)
    }
    function handleCardDelete(card) {
        setDeletePopup(true);
        setSelectedCard(card);
    }
    function handleImagePopupClick() {
        let index = cards.indexOf(selectedCard) + 1;
        if(index === cards.length) index = 0; 
        setSelectedCard(cards[index])
    }
    function onCardUpdate(name, card = selectedCard) {
        if(name === 'like') {
            const method = card.likes.some(data => data._id === currentUser._id) ? 'DELETE' : 'PUT';
            const newLike = method === 'DELETE' ? card.likes.filter(item => item._id !== currentUser._id) : [...card.likes, {_id: currentUser._id}];
            const newCards = cards.map(item => card._id === item._id ? {...item,likes: newLike} : item);
            setCards(newCards);
            api.queryCards({ query: `likes/${card._id}`, method })
               .catch(err => {
                   console.log(err);
                   setCards(cards)
               })
        }
        if(name === 'delete') {
            const newCards = cards.filter(item => item._id !== card._id);
            setCards(newCards);
            api.queryCards({query: card._id, method: 'DELETE'})
               .catch(err => {
                  console.log(err);
                  setCards(cards);
                })
                .finally(() => closeAllPopups())
        }
        if(name === 'card') {
            api.queryCards({ method: 'POST', body: card })
                .then(place => {
                   setCards([place,...cards]);
                })
                .catch(err => console.log(err))
                .finally(() => closeAllPopups())
        }
    }
    function onUserUpdate(name, field) {
        if(name === 'profile-info') {
            api.updateProfile({body: field})
               .then(user => setCurrentUser(user))
               .catch(err => console.log(err))
               .finally(() => closeAllPopups())
        }
        if(name === 'profile-photo') {
            api.updateProfile({ avatar: 'avatar', body: field })
               .then(user => setCurrentUser(user))
               .catch(err => console.log(err))
               .finally(() => closeAllPopups())
        }
    }
    function closeAllPopups() {
            setAvatarPopup(false);
            setProfilePopup(false);
            setCardPopup(false);
            setDeletePopup(false);
            setImagePopup(false);
    }
    function handleOverlayAndCrossClick(e) {
        if(e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) closeAllPopups();
    }

  return (
    <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
            <Header logo={logo} />
            <Main 
                cards={cards}
                onEditAvatar={handleEditAvatarClick}  
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                onCardLike={onCardUpdate}
            />
            <Footer />
            <PopupWithForm 
                title='Change profile picture' 
                name='profile-photo' 
                isOpen={avatarPopup}
                onClose={handleOverlayAndCrossClick}
                inputs={[['url','Image link','avatar']]}
                submitText='Save'
                submit={onUserUpdate}
            />
            <EditProfilePopup isOpen={profilePopup} onClose={handleOverlayAndCrossClick} submit={onUserUpdate} />
            <PopupWithForm 
                title='New place' 
                name='card' 
                isOpen={cardPopup}
                onClose={handleOverlayAndCrossClick}
                inputs={[['text','Title','name',2,30],['url','Image link','link']]}
                submitText='Create'
                submit={onCardUpdate}
            />
            <PopupWithForm 
                title='Are you sure?' 
                name='delete' 
                isOpen={deletePopup}
                onClose={handleOverlayAndCrossClick}
                submitText='Yes'
                submit={onCardUpdate}
            />
            <ImagePopup 
                isOpen={imagePopup}
                card={selectedCard}
                onClose={handleOverlayAndCrossClick}
                onClick={handleImagePopupClick}
            />
        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
