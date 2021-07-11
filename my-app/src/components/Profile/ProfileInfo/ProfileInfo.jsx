import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../../common/Preloader/Preloader';
import ProfileStatus from "./ProfileStatus/ProfileStatusWithHooks";
// import ProfileStatus from './ProfileStatus/ProfileStatus';
import userPhoto from '../../../img/avatar.png';
import InfoEditMode from './InfoEditMode/InfoEditMode';
import ProfileData from './ProfileData/ProfileData';

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }

    return (
        <div>
            <div className={s.profileInfo}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto}/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
				
				<ProfileStatus status={status} updateStatus={updateStatus}/>

                { editMode
                    ? <InfoEditMode initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {setEditMode(true)} } profile={profile} isOwner={isOwner}/> }
            </div>
        </div>
    )
}






export default ProfileInfo;