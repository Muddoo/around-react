import PopupWithForm from './PopupWithForm'

function EditProfilePopup(props) {
    const {isOpen,onClose,submit} = props;
    return (
        <PopupWithForm 
            title='Edit profile' 
            name='profile-info' 
            isOpen={isOpen}
            onClose={onClose}
            inputs={[['text','Name','name',2,40],['text','About me','about',2,200]]}
            submitText='Save'
            submit={submit}
        />
    )
}

export default EditProfilePopup