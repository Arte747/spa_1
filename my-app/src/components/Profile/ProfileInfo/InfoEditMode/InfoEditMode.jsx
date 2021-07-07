import React from "react";
// import s from './ProfileInfo.module.css';
import s from './InfoEditMode.module.css';
// import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {createField, Input, Textarea} from '../../../../common/FormsControls/FormsControls';
import {reduxForm} from "redux-form";
// import style from "../../common/FormsControls/FormsControls.module.css";
import {requireField, maxLengthCreator} from '../../../../utils/validators/validators';

let maxLength = maxLengthCreator(10);

const InfoEditMode = ({handleSubmit, profile, error}) => {
	
	
    return <form onSubmit={handleSubmit}>
        <div><button>save</button></div>
        {error && <div className={s.error}>
            {error}
        </div>}
        <div>
            <b>Full name</b>: {createField(Input, "fullName", [], "fullName")}
        </div>
        <div>
            <b>Looking for a job</b>: { createField(Input, "lookingForAJob", [], "lookingForAJob", {type: "checkbox"} )}
        </div>

        <div>
            <b>My professional skills</b>:
            { createField(Textarea, "lookingForAJobDescription", [], "My professional skills")}
        </div>


        <div>
            <b>About me</b>:
            { createField(Textarea, "aboutMe", [], "About me")}
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

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(InfoEditMode)

export default ProfileDataFormReduxForm;

// <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>