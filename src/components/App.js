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
    const [selectedCard,setSelectedCard] = useState(null);

    function handleEditAvatarClick(isSubmit) {
        setAvatarPopup(() => isSubmit);
    }
    function handleEditProfileClick(isSubmit) {
        setProfilePopup(() => isSubmit)
    }
    function handleAddPlaceClick(isSubmit) {
        setCardPopup(() => isSubmit)
    }
    function handleCardClick(card) {
        setSelectedCard(card)
    }
    function handleCardDelete(isSubmit) {
        setDeletePopup(() => isSubmit);
    }
    function closeAllPopups() {
            setAvatarPopup(false);
            setProfilePopup(false);
            setCardPopup(false);
            setDeletePopup(false);
            setSelectedCard(false);
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
            onCardDelete={handleCardDelete}
            onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm 
            title='Change profile picture' 
            name='avatar' 
            isOpen={avatarPopup}
            onClose={handleOverlayAndCrossClick}
            inputs={[{type:'url',placeholder:'Image link',name:'avatar'}]}
            submitText='Save'
        />
        <PopupWithForm 
            title='Edit profile' 
            name='profile-info' 
            isOpen={profilePopup}
            onClose={handleOverlayAndCrossClick}
            inputs={[{type:'text',placeholder:'Name',name:'name',min:2,max:40},{type:'text',placeholder:'About me',name:'about',min:2,max:200}]}
            submitText='Save'
        />
        <PopupWithForm 
            title='New place' 
            name='card' 
            isOpen={cardPopup}
            onClose={handleOverlayAndCrossClick}
            inputs={[{type:'text',placeholder:'Title',name:'name',min:2,max:30},{type:'url',placeholder:'Image link',name:'link'}]}
            submitText='Create'
        />
        <PopupWithForm 
            title='Are you sure?' 
            name='delete' 
            isOpen={deletePopup}
            onClose={handleOverlayAndCrossClick}
            submitText='Yes'
        />
        <ImagePopup 
            card={selectedCard}
            onClose={handleOverlayAndCrossClick}
        />
    </div>
  );
}

export default App;