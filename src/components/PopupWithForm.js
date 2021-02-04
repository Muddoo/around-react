import {useState, useEffect, useRef} from 'react'
import Input from './Input'

function PopupWithForm(props) {
    const {name,title,isOpen,onClose,submitText,inputs,submit} = props;

    const [field,setField] = useState();
    const [error,setError] = useState();

    const activeButton = useRef();
    useEffect(() => isOpen && activeButton.current.focus(),[isOpen]);

    function handleChange(e) {
      setField({...field, [e.target.name]: e.target.value.trim() && e.target.value});
      setError({...error, [e.target.name]: e.target.validationMessage})
    }

    function handleSubmit(e) {
      e.preventDefault();
      e.target.textContent = 'Saving...';
      submit(name, field);
      setField()
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
                  value={field?.[name] || ''}
                  error={error?.[name]}
                  onChange={handleChange}
                />
              ))}
              <button 
                  type="submit" 
                  className="popup__submit active" 
                  aria-label="submit-button"
                  onClick={handleSubmit}
                  ref={activeButton}
              >
                    {isOpen && submitText}
              </button>
          </form>
      </div>
    )
}

export default PopupWithForm