function Input(props) {
    const {type,placeholder,name,min,max,value,error,handleChange} = props
    return (
      <>
        <input 
            type={type} 
            className= {`popup__field ${error && 'popup__field_border_red'}`}
            placeholder={placeholder} 
            name={name} 
            autoComplete="off" 
            spellCheck="false"
            minLength={min}
            maxLength={max}
            value={value}
            onChange={e => handleChange(e,name)}
        />
        <span className="popup__error">{error}</span>
      </>
    )
}

export default Input