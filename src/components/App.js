import {useState} from 'react'
import logo from '../images/Vectorlogo.svg'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'

function App() {
    const [avatarPopup,setAvatarPopup] = useState(false);
    const [profilePopup,setProfilePopup] = useState(false);
    const [cardPopup,setCardPopup] = useState(false);
    const [selectedCard,setSelectedCard] = useState('');
    const [deleteCard,setDeleteCard] = useState('');

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
        setSelectedCard(card)
    }
    function handleCardDelete(card) {
        setDeleteCard(card)
    }
    function closeAllPopups(e) {
        if(e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
            setAvatarPopup(false);
            setProfilePopup(false);
            setCardPopup(false);
            setSelectedCard('');
            setDeleteCard('')
        }
    }

  return (
    <div className="page">
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
            onClose={closeAllPopups}
            inputs={[['url','Image link','profile-image']]}
            submitText='Save'
        />
        <PopupWithForm 
            title='Edit profile' 
            name='profile-info' 
            isOpen={profilePopup}
            onClose={closeAllPopups}
            inputs={[['text','Name','name',2,40],['text','About me','about',2,200]]}
            submitText='Save'
        />
        <PopupWithForm 
            title='New place' 
            name='card' 
            isOpen={cardPopup}
            onClose={closeAllPopups}
            inputs={[['text','Title','title',2,30],['url','Image link','image']]}
            submitText='Create'
        />
        <PopupWithForm 
            title='Are you sure?' 
            name='delete' 
            isOpen={deleteCard}
            onClose={closeAllPopups}
            submitText='Yes'
        />
        <ImagePopup 
            card={selectedCard}
            onClose={closeAllPopups}
        />
    </div>
  );
}

export default App;
