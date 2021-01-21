import Input from './Input'

function PopupWithForm(props) {
    const {name,title,isOpen,onClose,submitText,inputs} = props
    return (
      <>  
        <div className={`popup popup_${name} ${isOpen ? 'visible' : null}`} onClick={onClose}>
            <form action="#" className="popup__form" name={name} noValidate>
                <button className="popup__close" aria-label="close-button" type="button"/>
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
                <button type="submit" className="popup__submit active" aria-label="submit-button">{submitText}</button>
            </form>
        </div>
      </>
    )
}

export default PopupWithForm