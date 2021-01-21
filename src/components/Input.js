function Input(props) {
    const {type,placeholder,name,min,max} = props
    return (
      <>
        <input 
            type={type} 
            className="popup__field" 
            placeholder={placeholder} 
            name={name} 
            autoComplete="off" 
            spellCheck="false"
            minLength={min}
            maxLength={max}
        />
        <span className="popup__error"></span>
      </>
    )
}

export default Input