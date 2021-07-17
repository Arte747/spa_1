import React from 'react';
import s from './MyPosts.module.css';
import Post from '../Post/Post';
import {reduxForm, Field, InjectedFormProps} from 'redux-form';
import {requireField, maxLengthCreator} from '../../../../utils/validators/validators';
import {Textarea, Input, createField, GetStringKeys} from '../../../../common/FormsControls/FormsControls';

let maxLength = maxLengthCreator(10);

type PropsType = {
	
}
// определяем тип данных возвращаемых из формы
export type AddPostFormValuesType = {
	newPost: string
}
// определяем типы ключей для формы
type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const PostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				{createField<AddPostFormValuesTypeKeys>(Input, "newPost", [requireField, maxLength], "New post")}
			</div>
			<div>
				<button>Добавить пост</button>
			</div>
		</form>
	);
};
	


const ReduxPostForm = reduxForm<AddPostFormValuesType, PropsType>({form: 'post-form'})(PostForm);

export default ReduxPostForm;