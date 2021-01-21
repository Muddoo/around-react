function PopupWithForm(props) {
    const {name,title,isOpen,onClose,submitText,children} = props;
    return (
      <>  
        <div className={`popup popup_${name} ${isOpen ? 'visible' : null}`} onClick={onClose}>
            <form action="#" className="popup__form" name={name} noValidate>
                <button className="popup__close" aria-label="close-button" type="button"></button>
                <h3 className="popup__header">{title}</h3>
                {children}
                <button type="submit" className="popup__submit active" aria-label="submit-button">{submitText}</button>
            </form>
        </div>
      </>
    )
}

export default PopupWithForm