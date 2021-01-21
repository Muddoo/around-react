import {useState,useEffect} from 'react'
import Cards from './Cards'
import api from '../utils/api'

function Main(props) {
    const [userId,setUserId] = useState('')
    const [userName,setUserName] = useState('')
    const [userDescription,setUserDescription] = useState('')
    const [userAvatar,setUserAvatar] = useState('')
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
               })
               .catch(err => console.log(err))
    },[])

    function isReady() {
        return userName && userDescription && userAvatar && isLoaded && true
    }

    const {onEditAvatar,onEditProfile,onAddPlace,onCardClick,onCardDelete} = props;

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
                onCardClick={onCardClick} 
                onCardDelete={onCardDelete}
            />
        </main>
    )
}

export default Main