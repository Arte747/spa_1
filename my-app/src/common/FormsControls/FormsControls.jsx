import React from 'react';
import s from './FormsControls.module.css'
import {Field} from 'redux-form';

export const Textarea = ({input, meta: {touched, error} , children}) => {
	
	const hasError = touched && error;
	
	return (
		<div className={s.formsControls + ' ' + (hasError ? s.error : null)}>
			<div>
				{children}
			</div>
			{hasError ? <span>{error}</span> : undefined}
		</div>
	);
};

export const Input = ({input, meta, ...props}) => {
	
	const hasError = meta.touched && meta.error;
	
	return (
		<div className={s.formsControls + ' ' + (hasError ? s.error : null)}>
			<div>
				<input {...input} {...props} />
			</div>
			{hasError ? <span>{meta.error}</span> : undefined}
		</div>
	);
};

export const createField = (component, name, validators, placeholder, props = {}, text = "") => (
	<div>
		<Field component={component}
		   name={name}
		   validate={validators}
		   placeholder={placeholder}
		   {...props}/>{text}
	</div>
);