import React from "react";
import s from './InfoEditMode.module.css';
import {createField, Input, Textarea, GetStringKeys} from '../../../../common/FormsControls/FormsControls';
import {reduxForm, InjectedFormProps} from "redux-form";
import {requireField, maxLengthCreator} from '../../../../utils/validators/validators';
import {ProfileType} from '../../../../types/types';

let maxLength = maxLengthCreator(10);

type PropsType = {
	profile: ProfileType
}

type ProfileTypeKeys = GetStringKeys<ProfileType>

const InfoEditMode: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
	
	
    return <form onSubmit={handleSubmit}>
	
        <div><button>save</button></div>
		
        {error && <div className={s.error}>
            {error}
        </div>}
		
        <div>
            <b>Full name</b>: {createField<ProfileTypeKeys>(Input, "fullName", [], "fullName")}
        </div>
		
        <div>
            <b>Looking for a job</b>: { createField<ProfileTypeKeys>(Input, "lookingForAJob", [], "lookingForAJob", {type: "checkbox"} )}
        </div>

        <div>
            <b>My professional skills</b>:
            { createField<ProfileTypeKeys>(Textarea, "lookingForAJobDescription", [], "My professional skills")}
        </div>


        <div>
            <b>About me</b>:
            { createField<ProfileTypeKeys>(Textarea, "aboutMe", [], "About me")}
        </div>
		
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
				<b>{key}: </b>{ createField(Input, "contacts." + key, [], key)}
			</div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(InfoEditMode)

export default ProfileDataFormReduxForm;
