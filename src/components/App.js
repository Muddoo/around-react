import {useState,useEffect} from 'react'
import logo from '../images/Vectorlogo.svg'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import api from '../utils/api'
import CurrentUserContext from '../contexts/CurrentUserContext'

function App() {
    const [currentUser,setCurrentUser] = useState();
    const [avatarPopup,setAvatarPopup] = useState(false);
    const [profilePopup,setProfilePopup] = useState(false);
    const [cardPopup,setCardPopup] = useState(false);
    const [deletePopup,setDeletePopup] = useState(false);
    const [imagePopup,setImagePopup] = useState(false);
    const [selectedCard,setSelectedCard] = useState('');
    const [deleteCard,setDeleteCard] = useState('');

    useEffect(() => {
        api.getUser().then(user => setCurrentUser(user)).catch(err => console.log(err));
    },[]);

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
    function handleCardDelete(submit) {
        setDeletePopup(true);
        setDeleteCard(submit);
    }
    function closeAllPopups() {
            setAvatarPopup(false);
            setProfilePopup(false);
            setCardPopup(false);
            setDeletePopup(false);
            setImagePopup(false);
    }
    function handleOverlayAndCrossClick(e) {
        if(!e || e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
            closeAllPopups()
        }
    }

  return (
    <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
            <Header logo={logo} />
            <Main 
                onEditAvatar={handleEditAvatarClick}  
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
            />
            <Footer />
            <PopupWithForm 
                title='Change profile picture' 
                name='profile-photo' 
                isOpen={avatarPopup}
                onClose={handleOverlayAndCrossClick}
                inputs={[['url','Image link','profile-image']]}
                submitText='Save'
            />
            <PopupWithForm 
                title='Edit profile' 
                name='profile-info' 
                isOpen={profilePopup}
                onClose={handleOverlayAndCrossClick}
                inputs={[['text','Name','name',2,40],['text','About me','about',2,200]]}
                submitText='Save'
            />
            <PopupWithForm 
                title='New place' 
                name='card' 
                isOpen={cardPopup}
                onClose={handleOverlayAndCrossClick}
                inputs={[['text','Title','title',2,30],['url','Image link','image']]}
                submitText='Create'
            />
            <PopupWithForm 
                title='Are you sure?' 
                name='delete' 
                isOpen={deletePopup}
                onClose={handleOverlayAndCrossClick}
                submitText='Yes'
                submit={deleteCard}
            />
            <ImagePopup 
                isOpen={imagePopup}
                card={selectedCard}
                onClose={handleOverlayAndCrossClick}
            />
        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
