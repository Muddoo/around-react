import {useState,useEffect} from 'react'
import logo from '../images/Vectorlogo.svg'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import Api from '../utils/Api'

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
            setSelectedCard('')
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
        submitText='Save'
    >
        <input type="url" className="popup__field" placeholder="Image link" name="profile-image" id="profile-image" autoComplete="off" spellCheck="false" required />
        <span className="popup__error"></span>
    </PopupWithForm>
    <PopupWithForm 
        title='Edit profile' 
        name='profile-info' 
        isOpen={profilePopup}
        onClose={closeAllPopups}
        submitText='Save'
    >
        <input type="text" className="popup__field" placeholder="Name" name="name" id="name" autoComplete="off" spellCheck="false" minLength="2" maxLength="40" required />
        <span className="popup__error"></span>
        <input type="text" className="popup__field" placeholder="About me" name="about" id="about" autoComplete="off" spellCheck="false" minLength="2" maxLength="200" required />
        <span className="popup__error"></span>
    </PopupWithForm>
    <PopupWithForm 
        title='New place' 
        name='card' 
        isOpen={cardPopup}
        onClose={closeAllPopups}
        submitText='Create'
    >
        <input type="text" className="popup__field" placeholder="Title" name="title" id="img-name" autoComplete="off" spellCheck="false" minLength="2" maxLength="30" required />
        <span className="popup__error"></span>
        <input type="url" className="popup__field" placeholder="Image link" name="image" id="image" autoComplete="off" spellCheck="false" required />
        <span className="popup__error"></span>
    </PopupWithForm>
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
    {/* <div className="popup popup_profile-photo" hidden>
        <form action="#" className="popup__form" name="profileform" noValidate>
            <button className="popup__close" aria-label="close-button" type="button"></button>
            <h3 className="popup__header">Change profile picture</h3>
            <input type="url" className="popup__field" placeholder="Image link" name="profile-image" id="profile-image" autoComplete="off" spellCheck="false" required />
            <span className="popup__error"></span>
            <button type="submit" className="popup__submit" id="submit" aria-label="save-button" >Save</button>
        </form>
    </div>
    <div className="popup popup_profile-info" hidden>
        <form action="#" className="popup__form" name="profileform" noValidate>
            <button className="popup__close" aria-label="close-button" type="button"></button>
            <h3 className="popup__header">Edit profile</h3>
            <input type="text" className="popup__field" placeholder="Name" name="name" id="name" autoComplete="off" spellCheck="false" minLength="2" maxLength="40" required />
            <span className="popup__error"></span>
            <input type="text" className="popup__field" placeholder="About me" name="about" id="about" autoComplete="off" spellCheck="false" minLength="2" maxLength="200" required />
            <span className="popup__error"></span>
            <button type="submit" className="popup__submit" id="submit" aria-label="save-button" >Save</button>
        </form>
    </div>
    <div className="popup popup_card" hidden>
        <form action="#" className="popup__form" name="cardform" noValidate>
            <button className="popup__close" aria-label="close-button" type="button"></button>
            <h3 className="popup__header">New place</h3>
            <input type="text" className="popup__field" placeholder="Title" name="title" id="img-name" autoComplete="off" spellCheck="false" minLength="2" maxLength="30" required />
            <span className="popup__error"></span>
            <input type="url" className="popup__field" placeholder="Image link" name="image" id="image" autoComplete="off" spellCheck="false" required />
            <span className="popup__error"></span>
            <button type="submit" className="popup__submit" id="create" aria-label="create-button">Create</button>
        </form>
    </div>
    <div className="popup popup_delete" hidden>
        <form action="#" className="popup__form" name="cardform" noValidate>
            <button className="popup__close" aria-label="close-button" type="button"></button>
            <h3 className="popup__header popup__header_delete">Are you sure?</h3>
            <button type="submit" className="popup__submit active" id="yes" aria-label="create-button">Yes</button>
        </form>
    </div> */}
    {/* <template className="template-card">
        <div className="card">
            <img draggable="false" alt="card image" className="card__image" />
            <div className="card__details">
                <h2 className="card__text"></h2>
                <button className="card__icon-heart" type="button" aria-label="heart-button" title="like"></button>
                <span className="card__likes">0</span>
            </div>
            <button className="card__icon-delete" type="button" aria-label="trash-button" title="delete"></button>
        </div>
    </template> */}
    </div>
  );
}

export default App;
