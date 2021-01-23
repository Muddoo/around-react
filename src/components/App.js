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
    const [deletePopup,setDeletePopup] = useState(false);
    const [deletePlace,setDeletePlace] = useState(false);
    const [selectedCard,setSelectedCard] = useState(null);
    const [avatarInfo,setAvatarInfo] = useState(null)
    const [profileInfo,setProfileInfo] = useState(null)
    const [newPlace,setNewPlace] = useState(null)

    function handleEditAvatarClick() {
        setAvatarPopup(!avatarPopup);
        setAvatarInfo(null)
    }
    function submitAvatar(field) {
        setAvatarInfo(field);
    }
    function handleEditProfileClick() {
        setProfilePopup(!profilePopup)
        setProfileInfo(null)
    }
    function submitProfileInfo(fields) {
        setProfileInfo(fields);
    }
    function handleAddPlaceClick() {
        setCardPopup(!cardPopup)
        setNewPlace(null)
    }
    function submitNewPlace(fields) {
        setNewPlace(fields);
    }
    function handleCardClick(card) {
        setSelectedCard(card)
    }
    function handleCardDelete() {
        setDeletePopup(!deletePopup);
        setDeletePlace(null)
    }
    function submitDelete() {
        setDeletePlace(true)
    }
    function closeAllPopups() {
            setAvatarPopup(false);
            setProfilePopup(false);
            setCardPopup(false);
            setDeletePopup(false);
            setSelectedCard('');
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
            newPlace={newPlace}
            deletePlace={deletePlace}
        />
        <Footer />
        <PopupWithForm 
            title='Change profile picture' 
            name='avatar' 
            isOpen={avatarPopup}
            onClose={handleOverlayAndCrossClick}
            inputs={[{type:'url',placeholder:'Image link',name:'avatar'}]}
            submitText='Save'
            submit={submitAvatar}
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
            inputs={[{type:'text',placeholder:'Title',name:'name',min:2,max:30},{type:'url',placeholder:'Image link',name:'link'}]}
            submitText='Create'
            submit={submitNewPlace}
        />
        <PopupWithForm 
            title='Are you sure?' 
            name='delete' 
            isOpen={deletePopup}
            onClose={handleOverlayAndCrossClick}
            submitText='Yes'
            submit={submitDelete}
        />
        <ImagePopup 
            card={selectedCard}
            onClose={handleOverlayAndCrossClick}
        />
    </div>
  );
}

export default App;
