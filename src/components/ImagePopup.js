import {useState,useEffect} from 'react'
function ImagePopup(props) {
    const [last,setLast] = useState('');
    const {card,onClose,imagePopupClick} = props;
    
    useEffect(() => card ? setLast(card) : null);
    


    return (
        <figure className={`popup popup_figure ${card ? 'visible' : null}`} onClick={onClose}>
            <div className="popup__container">
                <img 
                    src={last && last.link} 
                    draggable="false" 
                    alt="popup image" 
                    className="popup__image" 
                    onClick={() => imagePopupClick(card)}
                />
                <p className="popup__caption">{last.name}</p>
                <button className="popup__close popup__close_fig" aria-label="close-button" type="button" title="close"/>
            </div>
        </figure>
    )
}

export default ImagePopup