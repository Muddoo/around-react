import { useState } from 'react';
import Input from './Input'

function PopupWithForm(props) {
    const {name,title,isOpen,onClose,submitText,inputs,submit} = props;
    function handleSubmit(e) {
      e.preventDefault();
      e.target.textContent = 'Saving...'
      submit(onClose);
    }
    return (
      <div 
        className={`popup popup_${name} ${isOpen && 'visible'}`} 
        onClick={onClose}
      >
          <form action="#" className="popup__form" name={name} noValidate>
              <button className="popup__close" aria-label="close-button" type="button"></button>
              <h3 className="popup__header">{title}</h3>
              {inputs && inputs.map(([type,placeholder,name,min,max],i) => (
                <Input 
                  key={i} 
                  type={type} 
                  placeholder={placeholder} 
                  name={name}
                  min={min}
                  max={max}
                />
              ))}
              <button 
                  type="submit" 
                  className="popup__submit active" 
                  aria-label="submit-button"
                  onClick={handleSubmit}
              >
                    {isOpen && submitText}
              </button>
          </form>
      </div>
    )
}

export default PopupWithForm