import {useState,useContext} from 'react'
import Card from './Card'
import CurrentUserContext from '../contexts/CurrentUserContext'

function Main(props) {
    const {cards,onEditAvatar,onEditProfile,onAddPlace,onCardClick,onCardDelete,onCardLike} = props;

    const user = useContext(CurrentUserContext)
    const [isLoaded,setIsLoaded] = useState(false)
    const isReady =  user && isLoaded && true;

    return (
        <main>
            <section className={`profile ${isReady || 'hidden'}`} >
                <div className="profile__wrapper" onClick={onEditAvatar}>
                    <img 
                        src={user?.avatar} 
                        draggable="false"  
                        alt="profile image" 
                        className="profile__image" 
                        onLoad={handleLoadedAvatar}
                        onError={handleUnloadedAvatar}
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{user?.name}</h1>
                    <p className="profile__text">{user?.about}</p>
                    <button 
                        className="profile__edit-button" 
                        aria-label="edit-button" 
                        type="button" 
                        onClick={handleEditProfile}
                    />
                </div>
                <button 
                    className="profile__add-button" 
                    aria-label="close-button" 
                    type="button" 
                    onClick={handleAddPlace}
                />
            </section>
            <section className='cards'>
                {cards.map(card => ( 
                    <Card 
                        key={card._id} 
                        card={card} 
                        onCardClick={onCardClick} 
                        onCardDelete={onCardDelete} 
                        onCardLike={onCardLike}
                    />
                ))}
            </section>
        </main>
    )
}

export default Main