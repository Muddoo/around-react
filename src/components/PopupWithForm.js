import {useState, useEffect, useContext, useRef} from 'react'
import Input from './Input'
import CurrentUserContext from '../contexts/CurrentUserContext'

function PopupWithForm(props) {
    const {name,title,isOpen,onClose,submitText,inputs,submit} = props;

    const user = useContext(CurrentUserContext);

    const [field,setField] = useState();
    const [error,setError] = useState();

    const activeButton = useRef();

    useEffect(() => {
      if(isOpen) {
        activeButton.current.focus()
      }
      if(isOpen && name === 'profile-info') {
        const newField = {};
        const newError = {};
        inputs.forEach(([,,name]) => {
          newField[name] = user[name];
          newError[name] = '';
        });
        setField(newField);
        setError(newError);
      }
      else if(isOpen && inputs) {
        const newField = {};
        const newError = {};
        inputs.forEach(([,,name]) => {
          newField[name] = '';
          newError[name] = '';
        });
        setField(newField);
        setError(newError);
      }
    },[isOpen,user]);

    function handleChange(e) {
      setField({...field, [e.target.name]: e.target.value.trim() && e.target.value});
      setError({...error, [e.target.name]: e.target.validationMessage})
    }

    function setButtonState() {
      if(!field) return false
      const isField = Object.values(field).every(field => field !== '');
      const isError = Object.values(error).some(error => error !== '');
      return isError || !isField
    }

    function handleSubmit(e) {
      e.preventDefault();
      e.target.textContent = 'Saving...';
      submit(name, field);
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
                  className={`popup__submit active ${setButtonState() && 'inactive'}`} 
                  aria-label="submit-button"
                  onClick={handleSubmit}
                  ref={activeButton}
                  disabled={setButtonState()}
              >
                    {isOpen && submitText}
              </button>
          </form>
      </div>
    )
}

export default PopupWithForm