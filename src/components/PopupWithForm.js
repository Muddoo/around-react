import {useState,useEffect,createRef} from 'react'
import Input from './Input'

function PopupWithForm(props) {
    const {name,title,isOpen,onClose,submitText,inputs,submit} = props;

    const form = createRef();
    const [fields,setFields] = useState({});
    const [errors,setErrors] = useState({});
    const [buttonText,setButtonText] = useState(submitText);

    useEffect(() => {
      if(isOpen) {
        const fieldsObj = {};
        const errorObj = {}
        inputs?.forEach(({name}) => {
          fieldsObj[name] = '';
          errorObj[name] = '';
        })
        setFields(fieldsObj);
        setErrors(errorObj);
        setButtonText(submitText);
        if(!isOpen && inputs) {
          const reset = {}
          inputs.forEach(({name}) => reset[name] = '');
          setFields(reset);
        }
        form.current.focus();
      }
    },[isOpen])

    function handleChange(e,name) {
      setFields({... fields, [name]: e.target.value.trim() ? e.target.value : ''})
      setErrors({...errors, [name]: e.target.validationMessage})
    }

    function handleSubmit(e) {
      e.preventDefault();
      submit(fields);
      setButtonText('Saving...')
    }

    function setButtonState() {
        const isField = Object.values(fields).every(field => field !== '');
        const isError =  Object.values(errors).some(error => error !== '');
        return !isField || isError;
    }
    
    return (
        <div 
          className={`popup popup_${name} ${isOpen && 'visible'}`} 
          onClick={onClose}
        >
            <form 
              action="#" 
              className="popup__form"
              name={name}
              noValidate
              onSubmit={handleSubmit}
            >
                <button className="popup__close" aria-label="close-button" type="button" />
                <h3 className="popup__header">{title}</h3>
                {inputs && inputs.map(({type,placeholder,name,min,max},i) => (
                  <Input 
                    key={i} 
                    type={type} 
                    placeholder={placeholder} 
                    name={name}
                    min={min}
                    max={max}
                    value={fields[name] || ''}
                    error={errors[name] || ''}
                    handleChange={handleChange}
                  />
                ))}
                <button 
                  type="submit" 
                  className={`popup__submit ${setButtonState() && 'inactive'}`}
                  aria-label="submit-button"
                  disabled={setButtonState()}
                  ref={form}
                >
                    {buttonText}
                </button>
            </form>
        </div>
    )
}

export default PopupWithForm