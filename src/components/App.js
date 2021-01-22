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
    const [avatarInfo,setAvatarInfo] = useState(null)
    const [profileInfo,setProfileInfo] = useState(null)
    const [cardInfo,setCardInfo] = useState(null)

    function handleEditAvatarClick() {
        setAvatarPopup(!avatarPopup)
    }
    function handleEditProfileClick() {
        setProfilePopup(!profilePopup)
    }
    function submitProfileInfo(e,fields) {
        e.preventDefault();
        setProfileInfo(fields);
    }
    function handleAddPlaceClick() {
        setCardPopup(!cardPopup)
    }
    function handleCardClick(card) {
        setSelectedCard(card)
    }
    function handleCardDelete(card) {
        setDeleteCard(card)
    }
    function closeAllPopups() {
            setAvatarPopup(false);
            setProfilePopup(false);
            setCardPopup(false);
            setSelectedCard('');
            setDeleteCard('');
    }
    function handleOverlayAndCrossClick(e) {
        if(e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
            closeAllPopups()
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
            avatarInfo={avatarInfo}
            profileInfo={profileInfo}
            cardInfo={cardInfo}
        />
        <Footer />
        <PopupWithForm 
            title='Change profile picture' 
            name='profile-photo' 
            isOpen={avatarPopup}
            onClose={handleOverlayAndCrossClick}
            inputs={[{type:'url',placeholder:'Image link',name:'profile-image'}]}
            submitText='Save'
        />
        <PopupWithForm 
            title='Edit profile' 
            name='profile-info' 
            isOpen={profilePopup}
            onClose={handleOverlayAndCrossClick}
            inputs={[{type:'text',placeholder:'Name',name:'name',min:2,max:40},{type:'text',placeholder:'About me',name:'about',min:2,max:200}]}
            submitText='Save'
            submit={submitProfileInfo}
        />
        <PopupWithForm 
            title='New place' 
            name='card' 
            isOpen={cardPopup}
            onClose={handleOverlayAndCrossClick}
            inputs={[{type:'text',placeholder:'Title',name:'title',min:2,max:30},{type:'url',placeholder:'Image link',name:'image'}]}
            submitText='Create'
        />
        <PopupWithForm 
            title='Are you sure?' 
            name='delete' 
            isOpen={deleteCard}
            onClose={handleOverlayAndCrossClick}
            submitText='Yes'
            state='active'
        />
        <ImagePopup 
            card={selectedCard}
            onClose={handleOverlayAndCrossClick}
        />
    </div>
  );
}

export default App;
